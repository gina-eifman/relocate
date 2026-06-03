import { API_BASE_URL } from "../utils/config";

class Countries {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`error ${res.status}`);
        }
        return res.json();
    }

    getAllCountries() {
        return fetch(`${this._baseUrl}/countries`, {
            headers: this._headers
        })
        .then(this._checkResponseData);
    }
}

export const countriesAPI = new Countries({
    baseUrl: API_BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
});