import styles from "./Auth.module.css"
import { Link } from "react-router-dom";
import React from "react";
import { EMAIL_REGEX } from "../../utils/constants.js";

function Register(props) {
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const [formValue, setFormValue] = React.useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    
    function handleChange(evt) {
        const {name, value} = evt.target
        const form = evt.target.closest("form")
        const newFormValue = { ...formValue, [name]: value };
        let error = evt.target.validationMessage;

        setFormValue(newFormValue)
        if ((name === "password" || name === "repeatPassword") && newFormValue.password !== newFormValue.repeatPassword) {
            error = "passwords don't match";
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        const formValid = form.checkValidity();
        const passwordsMatch = newFormValue.password === newFormValue.repeatPassword;
        setIsValid(formValid && passwordsMatch);
    }
    
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit(formValue);
    }

    return(
        <section className={styles.auth}>
            <h1 className={styles.auth__header}>Register</h1>
            <form className={styles.auth__form}>
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
                    <button type="submit" className={`${styles.auth__submit} ${props.isLoading ? styles.auth__submit_loading : ""}`}
                    onClick={handleSubmit} disabled={!isValid}>{props.isLoading ? "Signing up" : "Sign up"}</button>
                    <span className={styles.auth__error}>{props.errMessage}</span> 
                </div>
            </form>
            <p className={styles.auth__text}>Already have an account?
            <Link to="/sign-in" className={styles.auth__link}>Log in.</Link></p>
        </section>
    )
}

export default Register;