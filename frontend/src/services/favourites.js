import { API_URL } from "../utils/constants";

class FavouritesAPI {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkResponseData(res) {
        if (!res.ok) return Promise.reject(`error ${res.status}`);
        return res.json();
    }

    getFavourites(token) {
        return fetch(`${this._baseUrl}/favourites`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponseData);
    }

    addFavourite(countryId, token) {
        return fetch(`${this._baseUrl}/favourites`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: countryId })
        }).then(this._checkResponseData);
    }

    removeFavourite(favouriteId, token) {
        return fetch(`${this._baseUrl}/favourites/${favouriteId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponseData);
    }
}

export const favouritesAPI = new FavouritesAPI({
    baseUrl: API_URL
});