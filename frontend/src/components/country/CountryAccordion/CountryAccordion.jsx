import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './CountryAccordion.module.css';

function CountryAccordion({key, title, items, isOpen, onToggle}) {
    const nodeRef = React.useRef(null);
    const headerRef = React.useRef(null); // реф на заголовок
    
    const onEnter = () => {
        const node = nodeRef.current;
        node.style.height = '0';
    };
    
    const onEntering = () => {
        const node = nodeRef.current;
        node.style.height = `${node.scrollHeight}px`;
    };
    
    const onEntered = () => {
        const node = nodeRef.current;
        node.style.height = 'auto';
        
        // Прокрутка к заголовку аккордеона после его полного открытия
        if (headerRef.current) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const elementPosition = headerRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    const onExit = () => {
        const node = nodeRef.current;
        node.style.height = `${node.scrollHeight}px`;
    };
    
    const onExiting = () => {
        const node = nodeRef.current;
        node.style.height = '0';
    };
    
    const onExited = () => {
        const node = nodeRef.current;
        node.style.height = '0';
    };

    return(
        <div className={styles.accordion}>
            <div ref={headerRef} className={`${styles.accordion__flexbox} ${isOpen && styles.accordion__flexbox_opened}`}>
                <h2 className={styles.accordion__header}>{title}</h2>
                <button className={`${styles.accordion__button} ${isOpen && styles.accordion__button_opened}`} 
                onClick={onToggle}></button>
            </div>
            <CSSTransition in={isOpen} timeout={300} classNames="accordion" nodeRef={nodeRef}
                onEnter={onEnter} onEntering={onEntering} onEntered={onEntered}
                onExit={onExit} onExiting={onExiting} onExited={onExited} unmountOnExit>
                <ul ref={nodeRef} className={styles.accordion__list}>
                    {items.map((item, index) => (
                        <li key={index} className={styles.accordion__item}>
                            <h3 className={styles.accordion__subheader}>{item.header}</h3>
                            <p className={styles.accordion__text}>{item.text}</p>
                        </li>
                    ))}
                </ul>
            </CSSTransition>
        </div>
    )
}

export default CountryAccordion;