import React from "react";
import { profileAPI } from "../services/profile";
import { useFavourites } from "./useFavourites";

export const useProfile = () => {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const getToken = () => localStorage.getItem('jwt');

    const loadProfile = async () => {
        const token = getToken();
        if (!token) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const userData = await profileAPI.getProfile(token);
            setUser(userData);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadProfile();
    }, []);

    const updateUser = async (updates) => {
        const token = getToken();
        if (!token) return;
        try {
            const updated = await profileAPI.updateProfile(updates, token);
            setUser(updated);
        } catch (err) {
            console.error(err);
        }
    };
    
    return { user, updateUser, isLoading, refetch: loadProfile };
};