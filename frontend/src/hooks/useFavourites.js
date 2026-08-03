import React from "react";
import { favouritesAPI } from "../services/favourites";

export const useFavourites = () => {
    const [liked, setLiked] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState("");

    const getToken = () => localStorage.getItem('jwt');

    const loadFavourites = async () => {
        const token = getToken();
        if (!token) return;
        setIsLoading(true);
        try {
            const data = await favouritesAPI.getFavourites(token);
            setLiked(data);
        } catch (err) {
            console.error(err);
            setErrMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadFavourites();
    }, []);

    const isLiked = (countryId) => {
        return liked.some(fav => fav.countryId === countryId);
    };

    const toggleFavourite = async (countryId, favouriteId) => {
        const token = getToken();
        if (!token) return;
        const isCurrentlyLiked = isLiked(countryId)
        if (isCurrentlyLiked) {
            // Удаление: если favouriteId не передан, ищем сами
            let actualFavouriteId = favouriteId;
            if (!actualFavouriteId) {
                const fav = liked.find(fav => fav.countryId === countryId);
                actualFavouriteId = fav?._id;
            }
            if (!actualFavouriteId) {
                console.error('Не удалось найти favouriteId для удаления', err);
                setErrMessage(err.message);
                return;
            }
            // Оптимистичное обновление
            setLiked(prev => prev.filter(fav => fav.countryId !== countryId));
            try {
                await favouritesAPI.removeFavourite(actualFavouriteId, token);
            } catch (err) {
                await loadFavourites(); // откат при ошибке
                setErrMessage(err.message);
            }
        } else {
            // Добавление
            const newLiked = { countryId, id: 'newLiked' };
            setLiked(prev => [...prev, newLiked]);
            try {
                const newFavourite = await favouritesAPI.addFavourite(countryId, token);
                setLiked(prev => prev.map(fav => fav.id === 'newLiked' ? newFavourite : fav));
            } catch (err) {
                await loadFavourites(); // откат при ошибке
                console.error(err)
                setErrMessage(err.message);
            }
        }
    };

    const getFavouriteId = (countryId) => {
        const fav = liked.find(fav => fav.countryId === countryId);
        return fav?._id;
    };

    return { liked, isLoadingFavourites: isLoading, toggleFavourite, isLiked, getFavouriteId, errMessageFavourites: errMessage };
};