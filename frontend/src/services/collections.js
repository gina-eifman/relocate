import { API_BASE_URL } from "../utils/config";

class Collections {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkResponseData(res) {
        if (res.status === 204) return {};
        if (!res.ok) return Promise.reject(`error ${res.status}`);
        return res.json();
    }

    getCollections(token) {
        return fetch(`${this._baseUrl}/collections`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponseData);
    }

    createCollection(name, token, countryIds = []) {
        return fetch(`${this._baseUrl}/collections`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, countryIds })
        }).then(this._checkResponseData);
    }

    updateCollection(collectionId, updates, token) {
        return fetch(`${this._baseUrl}/collections/${collectionId}`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        }).then(this._checkResponseData);
    }

    removeCollection(collectionId, token) {
        return fetch(`${this._baseUrl}/collections/${collectionId}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponseData);
    }

    addCountryToCollection(collectionId, countryId, token) {
        return fetch(`${this._baseUrl}/collections/${collectionId}/countries`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ countryId })
        }).then(this._checkResponseData);
    }

    removeCountryFromCollection(collectionId, countryId, token) {
        return fetch(`${this._baseUrl}/collections/${collectionId}/countries/${countryId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(this._checkResponseData);
    }
}

export const collectionsAPI = new Collections({
    baseUrl: API_BASE_URL
});