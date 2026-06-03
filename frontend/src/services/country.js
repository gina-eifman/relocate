import { API_URL } from "../utils/constants";

class Country {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkResponseData(res) {
        if (!res.ok) return Promise.reject(`error ${res.status}`);
        return res.json();
    }

    getCountry(id) {
        return fetch(`${this._baseUrl}/countries/${id}`, {
            headers: { "Content-type": "application/json" }
        }).then(this._checkResponseData);
    }
}

export const countryAPI = new Country({
    baseUrl: API_URL
});