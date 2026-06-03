import { API_URL } from "../utils/constants";

class Profile {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _checkResponseData(res) {
        if (!res.ok) return Promise.reject(`error ${res.status}`);
        return res.json();
    }

    getProfile(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(this._checkResponseData);
    }

    updateProfile(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(this._checkResponseData);
    }
}

export const profileAPI = new Profile({
    baseUrl: API_URL
});