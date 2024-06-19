import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/index.js';
import { CgArrowLeftO } from "react-icons/cg";
import { Container, DivMainContainer, List, Midia } from './MediaListStyles.jsx';

const MediaList = () => {
    const { tipo } = useParams();
    const navigate = useNavigate();
    const image_path = 'https://image.tmdb.org/t/p/w500';
    const [mediaItems, setMediaItems] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState({
        query: '',
        genre: '',
        sort: 'popular'
    });

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`/tmdb/genre`, {
                    params: {
                        tipo: tipo
                    }
                });
                if (response.data.genres) {
                    setGenres(response.data.genres);
                    console.log('Gêneros recebidos:', response.data.genres);
                } else {
                    console.error('Formato inesperado da resposta da API:', response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar gêneros:', error);
            }
        };

        fetchGenres();
    }, [tipo]);

    const fetchMedia = async () => {
        try {
            let url;
            if (tipo === 'movie') {
                url = `/tmdb/movies?genre=${filters.genre}&sort=${filters.sort}&query=${filters.query}`;
            } else if (tipo === 'tv') {
                url = `/tmdb/series?genre=${filters.genre}&sort=${filters.sort}&query=${filters.query}`;
            }

            const response = await axios.get(url);
            setMediaItems(response.data.results);
            console.log('Mídias recebidas:', response.data.results);
        } catch (error) {
            console.error('Erro ao buscar mídias:', error);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [tipo, filters]); // Adicione 'filters' como dependência

    const handleGenreChange = (e) => {
        setFilters({ ...filters, genre: e.target.value });
    };

    const handleSortChange = (e) => {
        setFilters({ ...filters, sort: e.target.value });
    };

    return (
        <DivMainContainer>
            <Container>
                <div>
                    <button onClick={() => navigate(-1)} style={{ marginRight: '10px' }}>
                        <CgArrowLeftO size={20} />
                    </button>
                    <select value={filters.sort} onChange={handleSortChange}>
                        <option value="popular">Popular</option>
                        <option value="top_rated">Mais bem avaliados</option>
                        <option value="upcoming">Próximos lançamentos</option>
                    </select>
                    <select value={filters.genre} onChange={handleGenreChange}>
                        <option value="">Gêneros</option>
                        {Array.isArray(genres) && genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <List>
                    {mediaItems.map((item) => (
                        <Midia key={item.id}>
                            <Link to={`/details/${tipo}/${item.id}`}>
                                <img src={`${image_path}${item.poster_path}`} alt={item.title || item.name} />
                            </Link>
                            <span>{item.title || item.name}</span>
                        </Midia>
                    ))}
                </List>
            </Container>
        </DivMainContainer>
    );
};

export default MediaList;
