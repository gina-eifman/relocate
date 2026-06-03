import { API_BASE_URL } from "../utils/config";

class Auth {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkResponseData(res) {
        if (!res.ok) return Promise.reject(`error ${res.status}`);
        return res.json();
    }

    register(data) {
        return fetch(`${this._baseUrl}/sign-up`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                name: data.name
            })
        }).then(this._checkResponseData);
    }

    authorize(data) {
        return fetch(`${this._baseUrl}/sign-in`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).then(this._checkResponseData);
    }
}

export const authAPI = new Auth({
    baseUrl: API_BASE_URL
});