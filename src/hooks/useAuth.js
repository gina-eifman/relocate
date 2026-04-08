import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from './../services/auth.js';
import { EXISTING_EMAIL_ERR, LOGIN_ERR, REGISTER_ERR } from "./../utils/constants.js";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState("");
    const [currentUser, setCurrentUser] = React.useState({});
    const navigate = useNavigate();

    React.useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            // TODO: добавить mainApi.getUserInfo когда появится бэкенд
            setIsLoggedIn(true);
            // setCurrentUser({ email: "temp@test.com", name: "Temp" });
        } else {
            setIsLoggedIn(false);
            localStorage.clear();
        }
    }, []);

    const handleLogin = React.useCallback(async (formValue) => {
        setIsLoading(true);
        setErrMessage("");
        
        try {
            const res = await auth.authorize(formValue);
            if (res && res.token) {
                localStorage.setItem('jwt', res.token);
                setIsLoggedIn(true);
                // TODO: получить данные пользователя через mainApi
                setCurrentUser({ email: formValue.email, name: "" });
                navigate("/profile", { replace: true });
                return res;
            }
        } catch (err) {
            console.log(err);
            setErrMessage(LOGIN_ERR);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleRegister = React.useCallback(async (formValue) => {
        setIsLoading(true);
        setErrMessage("");
        
        try {
            const res = await auth.register(formValue);
            if (res) {
                await handleLogin({ email: formValue.email, password: formValue.password });
                return res;
            }
        } catch (err) {
            console.log(err);
            if (err === "error 409") {
                setErrMessage(EXISTING_EMAIL_ERR);
            } else {
                setErrMessage(REGISTER_ERR);
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [handleLogin]);

    const handleSignOut = React.useCallback(() => {
        setIsLoading(true);
        localStorage.clear();
        setCurrentUser({ email: "", name: "" });
        setIsLoggedIn(false);
        setIsLoading(false);
        navigate("/", { replace: true });
    }, [navigate]);

    return {
        isLoggedIn,
        currentUser,
        isLoading,
        errMessage,
        handleLogin,
        handleRegister,
        handleSignOut,
        setErrMessage
    };
};