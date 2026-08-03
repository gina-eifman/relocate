import styles from "./Auth.module.css"
import { Link } from "react-router-dom";
import React from "react";
import { EMAIL_REGEX } from "../../utils/constants.js";
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth.js";
import Loader from "../../components/common/Loader/Loader.jsx";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage.jsx";

function Login({ errMessage, isLoading}) {
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const [formValue, setFormValue] = React.useState({
        email: "",
        password: ""
    });
    const location = useLocation();
    const from = location.state?.from || '/profile';
    const { handleLogin } = useAuth();
    
    const onSubmit = (formValue) => {
        handleLogin(formValue, from);
    };

    function handleChange(evt) {
        const {name, value} = evt.target;
        const form = evt.target.closest("form");
        setErrors(prev => ({ ...prev, [name]: '' }));
        setFormValue(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: evt.target.validationMessage }));        
        const formValid = form.checkValidity();
        setIsValid(formValid);
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setErrors({});
        try {
            await onSubmit(formValue);
        } catch (err) {
            setErrors({ general: errMessage });
        }
    }

    if (isLoading ) return <Loader />;

    return(
        <section className={styles.auth}>
            <h1 className={styles.auth__header}>Login</h1>
            <form className={styles.auth__form}>
                <label className={styles.auth__field}>
                    email
                    <input className={styles.auth__input} type="email" onChange={handleChange}
                    name="email" value={formValue.email} required pattern={EMAIL_REGEX} />
                    <span className={styles.auth__error}>{errors.email}</span>
                </label>
                <label className={styles.auth__field}>
                    password
                    <input className={styles.auth__input} type="password" onChange={handleChange}
                    name="password" minLength="8" maxLength="30" value={formValue.password} required />
                    <span className={styles.auth__error}>{errors.password}</span>
                </label>
                <div className={styles.auth__container}>
                    <button type="submit" className={`${styles.auth__submit} ${isLoading ? styles.auth__submit_loading : ""}`}
                    onClick={handleSubmit} disabled={!isValid || isLoading}>{isLoading ? "Signing in" : "Sign in"}</button>
                    <ErrorMessage message={errors.general} />
                </div>
            </form>
            <p className={styles.auth__text}>Don't have an account?
            <Link to="/sign-up" className={styles.auth__link}>Create one.</Link></p>
        </section>
    )
}

export default Login;