import React, { useEffect, useState, useRef } from 'react';
import { Container, Movie, DivMainContainer } from './styles.jsx';
import { Link } from 'react-router-dom';
import axios from '../../services/index.js';
import api_key from '../../api_key/index.js';
import Loader from '../../components/Loader/Loader.jsx';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const CustomPrevButton = ({ onClick }) => (
    <StyledButton className="slick-prev" onClick={onClick}>
        &lt;
    </StyledButton>
);

const CustomNextButton = ({ onClick }) => (
    <StyledButton className="slick-next" onClick={onClick}>
        &gt;
    </StyledButton>
);

const StyledButton = styled.button`
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    color: transparent;
    background-color: transparent;
    border: none;
    cursor: pointer;
    z-index: 1000;
    font-size: 2em;
    &:focus {
        outline: none;
    }
`;

function HomePage() {
    const image_path = 'https://image.tmdb.org/t/p/original';
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        async function fetchPopularContent() {
            try {
                const movieResponse = await axios.get(`/tmdb/popular?tipo=movie`, {
                    params: {
                        api_key: api_key
                    }
                });
                const seriesResponse = await axios.get(`/tmdb/popular?tipo=tv`, {
                    params: {
                        api_key: api_key
                    }
                });
                setMovies(movieResponse.data.results);
                setSeries(seriesResponse.data.results);
                console.log(seriesResponse.data.results);
            } catch (error) {
                setError('Erro ao obter conteúdo');
                console.error('Erro ao obter conteúdo:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPopularContent();
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <CustomNextButton />,
        prevArrow: <CustomPrevButton />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            }
        ]
    };

    return (
        <DivMainContainer>
            <Container>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <h1>{error}</h1>
                ) : (
                    <>
                        <h1>Filmes Populares</h1>
                        <Slider ref={sliderRef} {...settings}>
                            {movies.map(movie => (
                                <Movie key={movie.id}>
                                    <Link to={`/details/movie/${movie.id}`}>
                                        <img src={`${image_path}${movie.poster_path}`} alt={movie.title} />
                                    </Link>
                                    <span>{movie.title}</span>
                                </Movie>
                            ))}
                        </Slider>
                        <h1>Séries Populares</h1>
                        <Slider ref={sliderRef} {...settings}>
                            {series.map(serie => (
                                <Movie key={serie.id}>
                                    <Link to={`/details/tv/${serie.id}`}>
                                        <img src={`${image_path}${serie.poster_path}`} alt={serie.name} />
                                    </Link>
                                    <span>{serie.name}</span>
                                </Movie>
                            ))}
                        </Slider>
                    </>
                )}
            </Container>
        </DivMainContainer>
    );
}

export default HomePage;
