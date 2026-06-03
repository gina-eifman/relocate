import { API_BASE_URL } from "../utils/config";

class Categories {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkResponseData(res) {
        if (!res.ok) return Promise.reject(`error ${res.status}`);
        return res.json();
    }

    getCategories() {
        return fetch(`${this._baseUrl}/categories`, {
            headers: { "Content-type": "application/json" }
        }).then(this._checkResponseData);
    }
}

export const categoriesAPI = new Categories({
    baseUrl: API_BASE_URL
});