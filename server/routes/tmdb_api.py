from flask import Blueprint, jsonify, request
import requests
from config.database import db

api_key = 'TMDB KEY'
tmdb_bp = Blueprint("tmdb_bp", __name__)


@tmdb_bp.route("/tmdb/logo", methods=["GET"])
def get_content_logo():
    tipo = request.args.get('tipo')
    id_logo = request.args.get('id')
    height = request.args.get('height')

    if not (api_key and tipo and id_logo and height):
        return jsonify({"error": "Parâmetros ausentes"}), 400

    url = f"https://api.themoviedb.org/3/{tipo}/{id_logo}/images"
    parametros = {'api_key': api_key}
    response = requests.get(url, params=parametros)

    if response.status_code == 200:
        data = response.json()
        pt_item = next((item for item in data.get('logos', []) if item.get('iso_639_1') == 'pt'), None)
        selected_item = pt_item or next((item for item in data.get('logos', []) if item.get('iso_639_1') == 'en'), None)
        if selected_item:
            url = f"https://image.tmdb.org/t/p/{height}{selected_item.get('file_path')}"
            return jsonify({"logo": url})
        else:
            return jsonify({"error": "Não foi possível obter o logo do TMDB"}), 404
    else:
        return jsonify({"error": "Não foi possível obter o logo do TMDB"}), response.status_code


def get_content_details():
    tipo = request.args.get('tipo')
    media_id = request.args.get('id')
    url = f"https://api.themoviedb.org/3/{tipo}/{media_id}?api_key={api_key}&append_to_response=images%2Caggregate_credits%2Cwatch_providers%2Csimilar%2Cexternal_ids%2Ccontent_ratings%2Creleases%2Ccredits&language=pt-BR"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        media_logo = None
        url_logo = f"https://api.themoviedb.org/3/{tipo}/{media_id}/images"
        parametros = {'api_key': api_key}
        response_logo = requests.get(url_logo, params=parametros)

        if response_logo.status_code == 200:
            data_logo = response_logo.json()
            pt_item = next((item for item in data_logo.get('logos', []) if item.get('iso_639_1') == 'pt'), None)
            selected_item = pt_item or next(
                (item for item in data_logo.get('logos', []) if item.get('iso_639_1') == 'en'), None)
            if selected_item:
                media_logo = f"https://image.tmdb.org/t/p/w300{selected_item.get('file_path')}"

        return jsonify({"trend": data, "trend_logo": media_logo})
    else:
        return None


@tmdb_bp.route("/tmdb/popular", methods=["GET"])
def get_popular_content():
    tipo = request.args.get('tipo')
    if not tipo:
        return jsonify({"error": "Parâmetros ausentes"}), 400
    
    url = f"https://api.themoviedb.org/3/trending/{tipo}/week?api_key={api_key}&append_to_response=images%2Caggregate_credits%2Cwatch_providers%2Csimilar%2Cexternal_ids%2Ccontent_ratings%2Creleases&language=pt-BR"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if data.get('results'):
            return jsonify(data)
        else:
            return jsonify({"error": "Não foi possível obter o filme ou série mais assistido(a)"}), 404
    else:
        return jsonify({"error": "Não foi possível obter o filme ou série mais assistido(a)"}), response.status_code


def get_genre_content():
    tipo = request.args.get('tipo')
    if not tipo:
        return jsonify({"error": "Parâmetros ausentes"}), 400
    url = f"https://api.themoviedb.org/3/genre/{tipo}/list?api_key={api_key}&language=pt-BR"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({"genres": data})
    else:
        return jsonify({"error": "Não foi possível obter o conteúdo do gênero"}), response.status_code


@tmdb_bp.route("/tmdb/trending", methods=["GET"])
def fetch_genre_content():
    tipo = request.args.get('tipo')
    if not tipo:
        return jsonify({"error": "Parâmetros ausentes"}), 400
    url = f"https://api.themoviedb.org/3/trending/{tipo}/week?api_key={api_key}&language=pt-BR"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({"trending": data})
    else:
        return jsonify({"error": "Não foi possível obter o conteúdo do gênero"}), response.status_code


@tmdb_bp.route("/tmdb/discover", methods=["GET"])
def fetch_content_bygenre():
    tipo = request.args.get('tipo')
    genre_id = request.args.get('genreId')
    if not (tipo and genre_id):
        return jsonify({"error": "Parâmetros ausentes"}), 400
    url = f"https://api.themoviedb.org/3/discover/{tipo}?api_key={api_key}&language=pt-BR&with_genres={genre_id}&certification_country=BR&certification.lte=14&page=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({"genre_content": data})
    else:
        return jsonify({"error": "Não foi possível obter o conteúdo do gênero"}), response.status_code


def search_tmdb():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Parâmetros ausentes"}), 400
    url = f"https://api.themoviedb.org/3/search/multi?api_key={api_key}&language=pt-BR&query={query}&page=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({"search_results": data})
    else:
        return jsonify({"error": "Não foi possível realizar a pesquisa"}), response.status_code
