import {parseCookies, setCookie, destroyCookie} from 'nookies'
import {getToken} from "../services/UserService";
import axios from "axios";

export default class HttpService {
    static async get(url, onSuccess, onError) {
        const token = getToken();
        let header = new Headers();
        if (token) {
            header.append("Authorization", `Bearer ${token}`);
        }
        console.log("TOKEN", token)
        try {
            let response = await axios.get(url, {
                headers: header,
            });

            this.checkIfUnauthorized(response);
            
        } catch (err) {
            console.log(err.message);
        }
    }

    static async put(url, data, onSuccess, onError) {
        const token = getToken();
        let header = new Headers();
        if (token) {
            header.append("Authorization", `Bearer ${token}`);
        }
        header.append("Content-Type", "application/json");

        try {
            let response = await axios.put(url, JSON.stringify(data), {
                headers: header
            });

            this.checkIfUnauthorized(response);

            if (response.error) {
                onError(response.error);
            } else {
                onSuccess(response);
            }
        } catch (err) {
            onError(err.message);
        }
    }

    static async post(url, data, onSuccess, onError) {
        const token = getToken();
        let header = new Headers();
        if (token) {
            header.append("Authorization", `Bearer ${token}`);
        }
        header.append("Content-Type", "application/json");

        try {
            let response = await axios.post(url, JSON.stringify(data), {
                headers: header,
            });

            this.checkIfUnauthorized(response);

            if (response.error) {
                onError(response.error);
            } else {
                onSuccess(response);
            }
        } catch (err) {
            onError(err.message);
        }
    }

    static async remove(url, onSuccess, onError) {
        const token = getToken();
        let header = new Headers();
        if (token) {
            header.append("Authorization", `Bearer ${token}`);
        }

        try {
            let response = await axios.delete(url, {
                headers: header,
            });

            this.checkIfUnauthorized(response);

            if (response.error) {
                onError(response.error);
            } else {
                onSuccess(response);
            }
        } catch (err) {
            onError(err.message);
        }
    }

    static checkIfUnauthorized(res) {
        if (res.status === 401) {
            window.location = "/login";
            return;
        }
        return console.log(res);
    }
}