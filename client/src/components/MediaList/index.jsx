import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../../services/index.js';

import { CgArrowLeftO } from "react-icons/cg";
import { Container, DivMainContainer, List, Midia } from './styles.jsx';

const MediaList = () => {
    const { tipo } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const genreId = searchParams.get('genreId') || '';
    const image_path = 'https://image.tmdb.org/t/p/w500';
    const [mediaItems, setMediaItems] = useState([]);
    const [filters, setFilters] = useState({
        query: '',
        genre: '',
        sort: 'popular'
    });

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
        } catch (error) {
            console.error('Erro ao buscar mídias:', error);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [tipo, filters]);

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
