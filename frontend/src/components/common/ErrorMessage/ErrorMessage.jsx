import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
    if (!message) return null;
    return <span className={styles.error}>{message}</span>;
};

export default ErrorMessage;