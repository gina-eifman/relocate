import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './CountryAccordion.module.css';

function CountryAccordion(props) {
    const nodeRef = React.useRef(null);
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
            <div className={`${styles.accordion__flexbox} ${props.isOpen && styles.accordion__flexbox_opened}`}>
                <h2 className={styles.accordion__header}>{props.title}</h2>
                <button className={`${styles.accordion__button} ${props.isOpen && styles.accordion__button_opened}`} 
                onClick={props.onToggle}></button>
            </div>
            <CSSTransition in={props.isOpen} timeout={300} classNames="accordion" nodeRef={nodeRef}
                onEnter={onEnter} onEntering={onEntering} onEntered={onEntered}
                onExit={onExit} onExiting={onExiting} onExited={onExited} unmountOnExit>
                <ul ref={nodeRef} className={styles.accordion__list}>
                    {props.items.map((item, index) => (
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