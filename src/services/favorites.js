class Favorites {
    constructor(props) {
        this._baseUrl = props.baseUrl;
        this._headers = props.headers;
    }

    _checkResponeData(res) {
        if (!res.ok) {
            return Promise.reject(`error ${res.status}`);
        }
        return res.json();
    }

    addFavorite({id}) {
        return fetch(`${this._baseUrl}/favorites`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({id})
        })
        .then(this._checkResponeData)
    }

    deleteFavorite({id}) {
        return fetch(`${this._baseUrl}/favorites/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._checkResponeData)
    }

    getFavorites(token) {
        return fetch(`${this._baseUrl}/favorites`,{
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(this._checkResponeData);
    }
}

export const favorites = new Favorites({
    baseUrl: "http://localhost:5000",
    headers: {
        "Content-type": "application/json"
    }
});