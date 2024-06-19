from flask import Blueprint, jsonify, request
import requests


api_key = '4a1166698525f43cab2617b2c5c2b514'
tmdb_bp = Blueprint("tmdb_bp", __name__)

@tmdb_bp.route("/tmdb/genre", methods=["GET"])
def fetch_genres():
    tipo = request.args.get('tipo')
    if not tipo:
        return jsonify({"error": "Parâmetros ausentes"}), 400

    if tipo not in ['movie', 'tv']:
        return jsonify({"error": "Tipo inválido"}), 400
    
    url = f"https://api.themoviedb.org/3/genre/{tipo}/list?api_key={api_key}&language=pt-BR"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({"error": "Não foi possível obter a lista de gêneros"}), response.status_code


@tmdb_bp.route("/tmdb/details", methods=["GET"])
def get_content_details():
    tipo = request.args.get('tipo')
    media_id = request.args.get('id')
    url = f"https://api.themoviedb.org/3/{tipo}/{media_id}?api_key={api_key}&append_to_response=images%2Caggregate_credits%2Cwatch_providers%2Csimilar%2Cexternal_ids%2Ccontent_ratings%2Creleases%2Ccredits&language=pt-BR"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        if data.get('results'):
            return jsonify(data)
        else:
            return jsonify({"error": "Não foi possível obter os detalhes de filme ou série(a)"}), 404
    else:
        return jsonify({"error": "Não foi possível obter os detalhes filme ou série(a)"}), response.status_code

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

@tmdb_bp.route("/tmdb/search", methods=["GET"])
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
    
@tmdb_bp.route("/tmdb/movies", methods=["GET"])
def fetch_movies():
    genre = request.args.get('genre', '')
    sort = request.args.get('sort', 'popular')

    url = f"https://api.themoviedb.org/3/discover/movie?api_key={api_key}&language=pt-BR&sort_by={sort}&with_genres={genre}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({"results": data['results']})
    else:
        return jsonify({"error": "Não foi possível obter os filmes"}), response.status_code

@tmdb_bp.route("/tmdb/series", methods=["GET"])
def fetch_series():
    genre = request.args.get('genre', '')
    sort = request.args.get('sort', 'popular')

    url = f"https://api.themoviedb.org/3/discover/tv?api_key={api_key}&language=pt-BR&sort_by={sort}&with_genres={genre}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return jsonify({"results": data['results']})
    else:
        return jsonify({"error": "Não foi possível obter as séries"}), response.status_code
