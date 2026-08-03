import styles from "./Auth.module.css"
import { Link } from "react-router-dom";
import React from "react";
import { EMAIL_REGEX } from "../../utils/constants.js";
import Loader from "../../components/common/Loader/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage.jsx";

function Register({ errMessage, isLoading}) {
    const formRef = React.useRef(null);
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const [formValue, setFormValue] = React.useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const { handleRegister } = useAuth();

    const onSubmit = (formValue) => {
        handleRegister(formValue);
    };
    
    function handleChange(evt) {
        const {name, value} = evt.target
        const form = evt.target.closest("form")
        const newFormValue = { ...formValue, [name]: value };
        const passwordsMatch = newFormValue.password === newFormValue.repeatPassword;
        setErrors(prev => ({ ...prev, [name]: '' }));
        let error = evt.target.validationMessage;

        setFormValue(newFormValue)
        if (!passwordsMatch && (name === "password" || name === "repeatPassword")) {
            setErrors(prev => ({ ...prev, repeatPassword: "Passwords don't match." }));
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        const formValid = form.checkValidity();
        setIsValid(formValid && passwordsMatch);
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
            <h1 className={styles.auth__header}>Register</h1>
            <form ref={formRef} className={styles.auth__form}>
                <label className={styles.auth__field}>
                    name
                    <input className={styles.auth__input} onChange={handleChange}
                    name="name" value={formValue.name} required maxLength="20" />
                    <span className={styles.auth__error}>{errors.name}</span>
                </label>
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
                <label className={styles.auth__field}>
                    repeat password
                    <input className={styles.auth__input} type="password" onChange={handleChange}
                    name="repeatPassword" minLength="8" maxLength="30" value={formValue.repeatPassword} required />
                    <span className={styles.auth__error}>{errors.repeatPassword}</span>
                </label>
                <div className={styles.auth__container}>
                    <button type="submit" className={`${styles.auth__submit} ${isLoading ? styles.auth__submit_loading : ""}`}
                    onClick={handleSubmit} disabled={!isValid}>{isLoading ? "Signing up" : "Sign up"}</button>
                    <ErrorMessage message={errors.general} />
                </div>
            </form>
            <p className={styles.auth__text}>Already have an account?
            <Link to="/sign-in" className={styles.auth__link}>Log in.</Link></p>
        </section>
    )
}

export default Register;
