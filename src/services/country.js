import { ALL_COUNTRIES } from "../utils/constants";

class Country {
    constructor(props) {
        this._baseUrl = props.baseUrl;
        this._headers = props.headers;
    }

    _checkResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`error ${res.status}`);
        }
        return res.json();
    }

    getCountry(id) {
        return Promise.resolve(ALL_COUNTRIES.find(country => country.id === id));
        /*return fetch(`${this._baseUrl}/countries/${id}`, {
            headers: this._headers
        })
        .then(this._checkResponseData);*/
    }
}

export const country = new Country({
    baseUrl: "http://localhost:5000",
    headers: {
        "Content-type": "application/json"
    }
});