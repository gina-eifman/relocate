import React from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/auth";
import { profileAPI } from "../services/profile";

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
            setErrMessage(err.message);
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

    const handleSignOut = React.useCallback(() => {
        localStorage.removeItem('jwt');
        setCurrentUser(null);
        setIsLoggedIn(false);
        navigate("/sign-in", { replace: true });
    }, [navigate]);

    const handleLogin = React.useCallback(async (formValue, redirectTo = "/profile") => {
        setIsLoading(true);
        setErrMessage("");
        try {
            const res = await authAPI.authorize(formValue);
            if (res && res.token) {
                localStorage.setItem('jwt', res.token);
                await loadUser(res.token);
                setIsLoggedIn(true);
                navigate(redirectTo, { replace: true });
                return res;
            }
        } catch (err) {
            console.log(err);
            setErrMessage(err.message);
            handleSignOut();
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
            setErrMessage(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [handleLogin]);

    return { isLoggedIn, currentUser, isLoadingAuth: isLoading, errMessageAuth: errMessage, handleLogin, handleRegister, handleSignOut, setErrMessage };
};