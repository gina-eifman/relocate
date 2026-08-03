import React from "react";
import { collectionsAPI } from "../services/collections";

export const useCollections = () => {
    const [collections, setCollections] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState("");

    const getToken = () => localStorage.getItem('jwt');

    const loadCollections = async () => {
        const token = getToken();
        if (!token) return;
        setIsLoading(true);
        try {
            const data = await collectionsAPI.getCollections(token);
            setCollections(data);
        } catch (err) {
            console.error(err);
            setErrMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadCollections();
    }, []);

    const addCollection = async (name, countryIds = []) => {
        const token = getToken();
        if (!token) return;
        try {
            const newColl = await collectionsAPI.createCollection(name, token, countryIds);
            setCollections(prev => [...prev, newColl]);
            return newColl;
        } catch (err) {
            console.error(err);
            setErrMessage(err.message);
        }
    };

    const updateCollection = async (collectionId, updates) => {
        const token = getToken();
        if (!token) return;
        try {
            const updated = await collectionsAPI.updateCollection(collectionId, updates, token);
            setCollections(prev => prev.map(c => String(c._id) === String(collectionId) ? updated : c));
            return updated;
        } catch (err) {
            console.error(err);
            setErrMessage(err.message);
        }
    };

    const removeCollection = async (collectionId) => {
        const token = getToken();
        if (!token) return;
        try {
            await collectionsAPI.removeCollection(collectionId, token);
            setCollections(prev => prev.filter(c => c._id !== collectionId));
        } catch (err) {
            console.error(err);
            setErrMessage(err.message);
            if (err.message && err.message.includes('404')) {
                setCollections(prev => prev.filter(c => c._id !== collectionId));
            }
        }
    };

    const addCountryToCollection = async (collectionId, countryId) => {        
        const token = getToken();
        if (!token) return;
        try {
            const updated = await collectionsAPI.addCountryToCollection(collectionId, countryId, token);
            setCollections(prev => prev.map(c => String(c._id) === String(collectionId) ? updated : c));
        } catch (err) {
            console.error('Ошибка при добавлении страны в коллекцию:', err);
            setErrMessage(err.message);
        }
    };

    const removeCountryFromCollection = async (collectionId, countryId) => {        
        const token = getToken();
        if (!token) return;
        try {
            const updated = await collectionsAPI.removeCountryFromCollection(collectionId, countryId, token);
            setCollections(prev => prev.map(c => String(c._id) === String(collectionId) ? updated : c));
        } catch (err) {
            console.error('Ошибка при удалении страны из коллекции:', err);
            setErrMessage(err.message);
        }
    };

    return { collections, isLoadingCollections: isLoading, addCollection, updateCollection, removeCollection, addCountryToCollection, removeCountryFromCollection, refetch: loadCollections, errMessageCollections: errMessage };
};