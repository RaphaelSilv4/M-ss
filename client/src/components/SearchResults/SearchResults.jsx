import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/index.js';

import { Container, DivMainContainer, ButtonLR, Span, MovieList, Movie } from './SearchResultsStyles.jsx';
import { CgArrowLeftO } from "react-icons/cg";


const SearchResults = () => {
    const { tipo } = useParams();
    const navigate = useNavigate();
    const image_path = 'https://image.tmdb.org/t/p/w500';
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get(`/tmdb/search?query=${tipo}&page=${currentPage}`);
            console.log('Response:', response.data);

            if (response.data && response.data.search_results) {
                console.log('Search results:', response.data.search_results);

                setSearchResults(response.data.search_results.results || []);
                setTotalPages(response.data.search_results.total_pages || 0);
            } else {
                console.error('Invalid search results structure:', response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, [tipo, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleGoBack = () => {
        navigate(-1); 
      };

    return (
        <DivMainContainer>
            <Container>
                <div>
                    <button onClick={handleGoBack} style={{ marginRight: '10px' }}>
                      <CgArrowLeftO size={20} />
                    </button>
                    <h2>Resultados da Pesquisa</h2>
                </div>
                <MovieList>
                    {searchResults.map(result => (
                        <Movie key={result.id}>
                            <Link to={`/details/${result.media_type
}/${result.id}`}>
                                <img src={`${image_path}${result.poster_path}`} alt={result.title || result.name} />
                            </Link>
                            <span>{result.title || result.name}</span>
                        </Movie>
                    ))}
                </MovieList>
                <div>
                    <ButtonLR onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Anterior
                    </ButtonLR>
                    <Span>Página {currentPage} de {totalPages}</Span>
                    <ButtonLR onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Próximo
                    </ButtonLR>
                </div>
            </Container>
        </DivMainContainer>
    );
};

export default SearchResults;
