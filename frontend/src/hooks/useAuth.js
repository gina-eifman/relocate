import React from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/auth";
import { profileAPI } from "../services/profile";
import { EXISTING_EMAIL_ERR, LOGIN_ERR, REGISTER_ERR } from "../utils/constants";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState("");
    const [currentUser, setCurrentUser] = React.useState(null);
    const navigate = useNavigate();

    const loadUser = async (token) => {
        try {
            const userData = await profileAPI.getProfile(token);
            setCurrentUser(userData);
            setIsLoggedIn(true);
        } catch (err) {
            console.error(err);
            setIsLoggedIn(false);
            localStorage.removeItem('jwt');
        }
    };

    React.useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsLoggedIn(true);
            loadUser(token);
        } else {
            setIsLoggedIn(false);
        }
    }, [navigate]);

    const handleLogin = React.useCallback(async (formValue, redirectTo = "/profile") => {
        setIsLoading(true);
        setErrMessage("");
        try {
            const res = await authAPI.authorize(formValue);
            if (res && res.token) {
                localStorage.setItem('jwt', res.token);
                await loadUser(res.token);
                navigate(redirectTo, { replace: true });
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
            const res = await authAPI.register(formValue);
            if (res) {
                await handleLogin({ email: formValue.email, password: formValue.password });
                return res;
            }
        } catch (err) {
            console.log(err);
            setErrMessage(err === "error 409" ? EXISTING_EMAIL_ERR : REGISTER_ERR);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [handleLogin]);

    const handleSignOut = React.useCallback(() => {
        localStorage.removeItem('jwt');
        setCurrentUser(null);
        setIsLoggedIn(false);
        navigate("/", { replace: true });
    }, [navigate]);

    return { isLoggedIn, currentUser, isLoading, errMessage, handleLogin, handleRegister, handleSignOut, setErrMessage };
};