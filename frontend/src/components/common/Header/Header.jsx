import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../../../hooks/useAuth';
import styles from './Header.module.css';

const Header = () => {
    const { isLoggedIn, handleSignOut } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        handleSignOut();
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__box}>
                    <Link to="/" className={styles.header__logo}>
                        Relocate
                    </Link>
                    <button 
                        className={`${styles.burger} ${menuOpen ? styles.burger_opened : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span><span></span><span></span>
                    </button>
                </div>
                <nav className={`${styles.nav} ${menuOpen ? styles.nav_opened : ''}`}>
                    <Link to="/" className={styles.nav__link} onClick={() => setMenuOpen(false)}>Home</Link>
                    {isLoggedIn && (
                        <Link to="/profile" className={styles.nav__link} onClick={() => setMenuOpen(false)}>Profile</Link>
                    )}
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className={styles.nav__logout}>Logout</button>
                    ) : (
                        <Link to="/sign-in" className={styles.nav__link} onClick={() => setMenuOpen(false)}>Sign in</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;