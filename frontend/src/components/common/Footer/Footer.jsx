import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h3 className={styles.logo}>Relocate</h3>
                    <p className={styles.tagline}>Your comfort move starts here</p>
                </div>
                <div className={styles.links}>
                    <a href="https://github.com/gina-eifman" className={styles.link}>Check GitHub</a>
                    <a href="https://www.behance.net/gina_eifman" className={styles.link}>Check Behance</a>
                </div>
                <div className={styles.copyright}>
                    © 2026 Relocate in comfort. All rights reserved. Author: Gina Eifman.
                </div>
            </div>
        </footer>
    );
};

export default Footer;