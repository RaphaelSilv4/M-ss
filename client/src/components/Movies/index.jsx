import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../services/index.js';
import Header from '../../components/Header';
import { Container, DivMainContainer, MovieList, Movie } from './styles.jsx';

const Movies = () => {
    const { tipo } = useParams(); // UseParams hook para obter o tipo da URL
    const image_path = 'https://image.tmdb.org/t/p/w500';
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);

    const fetchMovies = async () => {
        try {
            if (tipo === 'movie') {
                const response = await axios.get(`/tmdb/movies`);
                setMovies(response.data.results);
                console.log(response.data.results);
            } else if (tipo === 'tv') {
                const response = await axios.get(`/tmdb/tv`);
                setSeries(response.data.results);
                console.log(response.data.results);
            } else {
                console.error('Tipo inválido');
            }
        } catch (error) {
            console.error('Erro ao buscar filmes/séries:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [tipo]); // Adicione `tipo` como dependência para refetch quando ele mudar

    return (
        <DivMainContainer>         
            <Container>
                <MovieList>
                    <Movie>
                    <span>{tipo === 'movie' ? 'Filmes' : 'Séries'}</span>
                    {tipo === 'movie' && movies.map((movie) => (
                        <Link to={`/details/${movie.id}`} key={movie.id}>
                            <img src={`${image_path}${movie.poster_path}`} alt={movie.title} />
                        </Link>
                    ))}
                    {tipo === 'tv' && series.map((serie) => (
                        <Link to={`/details/${serie.id}`} key={serie.id}>
                            <img src={`${image_path}${serie.poster_path}`} alt={serie.name} />
                        </Link>
                    ))}
                    </Movie>
                </MovieList>
            </Container>
        </DivMainContainer>
    );
};

export default Movies;
