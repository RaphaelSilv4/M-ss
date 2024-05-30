import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import axios from '../../services';

import { BiSearchAlt2 } from 'react-icons/bi';
import { FaCaretRight, FaCaretDown, FaFolderOpen } from "react-icons/fa";
import Menu from '../Menu';
import styles from './Header.module.css';


const Header = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const context = useContext(AuthContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            console.log(`Query: ${search}`);
            const response = await axios.get(`/tmdb/search?query=${search}`);
            console.log('Response:', response);

            console.log('Search results:', response.data.search_results);
            if (response.data.search_results.results.length > 0) {
                navigate(`/search/${search}`);
            } else {
                console.log('No search results found');
                window.location.href = `/search/notfound`;
            }

        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <header className={styles.header}>
            <Link to="/home" className={styles.logo}>
                <h1>M&S</h1>
            </Link>
            <form className={styles.search_bar_container} onSubmit={onSubmitHandler}>
                <input
                    className={styles.search_bar}
                    type="text"
                    placeholder="Pesquisar..."
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" aria-label='Search icon' className={styles.searchButton}>
                    <BiSearchAlt2 className={styles.search_icon} size={20} />
                </button>
            </form>

            <div className={styles.navBar}>
                <Link className={styles.MainNavGenres}>
                    <FaFolderOpen className={styles.icon} />Gênero<FaCaretDown />
                    <ul className={styles.subMenu}>
                        <Link to="/movie?genreId=12" className={styles.navGenres}><FaCaretRight />Aventura</Link>
                        <Link to="/movie?genreId=80" className={styles.navGenres}><FaCaretRight />Crime</Link>
                        <Link to="/movie?genreId=10751" className={styles.navGenres}><FaCaretRight />Família</Link>
                        <Link to="/movie?genreId=878" className={styles.navGenres}><FaCaretRight />Ficção Científica</Link>
                        <Link to="/movie?genreId=10762" className={styles.navGenres}><FaCaretRight />Kids</Link>
                        <Link to="/movie?genreId=27" className={styles.navGenres}><FaCaretRight />Terror</Link>
                        <Link to="/movie?genreId=10770" className={styles.navGenres}><FaCaretRight />Cinema TV</Link>
                        <Link to="/movie?genreId=99" className={styles.navGenres}><FaCaretRight />Documentário</Link>
                        <Link to="/movie?genreId=18" className={styles.navGenres}><FaCaretRight />Drama</Link>
                        <Link to="/movie?genreId=14" className={styles.navGenres}><FaCaretRight />Fantasia</Link>
                        <Link to="/movie?genreId=37" className={styles.navGenres}><FaCaretRight />Faroeste</Link>
                        <Link to="/movie?genreId=10752" className={styles.navGenres}><FaCaretRight />Guerra</Link>
                        <Link to="/movie?genreId=9648" className={styles.navGenres}><FaCaretRight />Mistério</Link>
                        <Link to="/movie?genreId=36" className={styles.navGenres}><FaCaretRight />História</Link>
                        <Link to="/movie?genreId=10749" className={styles.navGenres}><FaCaretRight />Romance</Link>
                        <Link to="/movie?genreId=16" className={styles.navGenres}><FaCaretRight />Animação</Link>
                        <Link to="/movie?genreId=10764" className={styles.navGenres}><FaCaretRight />Reality</Link>
                    </ul>
                </Link>
                <Link to={`/media/movie`} className={styles.navItem}>Filmes</Link>
                <Link to={`/media/tv`} className={styles.navItem}>Series</Link>
            </div>

            <Menu />
        </header>
    );
};

export default Header;
