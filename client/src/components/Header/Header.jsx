import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import axios from '../../services';

import { BiSearchAlt2 } from 'react-icons/bi';
import Menu from '../Menu/Menu';
import styles from './Header.module.css';


const Header = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { isAuthenticated, user } = useContext(AuthContext);

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
                <Link to={`/media/movie`} className={styles.navItem}>Filmes</Link>
                <Link to={`/media/tv`} className={styles.navItem}>Series</Link>
            </div>
            <div className={styles.user}>
                <p>{isAuthenticated ? user : 'Usuário'}</p>
                <Menu />
            </div>
            
        </header>
    );
};

export default Header;
