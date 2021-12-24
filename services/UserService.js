import {parseCookies, setCookie, destroyCookie} from 'nookies'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import HttpService from "./HttpService";

const GRID_KEY = 'grid'

export function getToken() {
  const parsedCookies = parseCookies()
  return parsedCookies?.[GRID_KEY]
}

export function decodeToken() {
    const token = getToken()
    //if (!token) return null
    //console.log("TOKEN", token, jwt.decode(token))
    return token
}

export async function signup(values) {
    const formData = new FormData
    formData.append("email", values.email)
    formData.append("full_name", values.full_name)
    formData.append("institution", values.institution)
    formData.append("password", values.password)
    formData.append("website", values.website)
    formData.append("daa_pdf", values.daa_pdf[0])
    let config = {
        method: 'post',
        url: 'http://localhost/api/v1/users/open-daa',
        data: formData
    }
    try {
        console.log("config data: ", values)
        const response = await axios(config)
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}

export async function login(values) {
    console.log("values from auth", values)
    const formData = new FormData
    formData.append("username", values.username)
    formData.append("password", values.password)
    try {
        console.log("config data: ", values)
        const token = await axios.post('http://localhost/api/v1/login/access-token', formData)
        setCookie(null, GRID_KEY, token.data.access_token, {maxAge: 30 * 24 * 60 * 60 * 5, path: '/'})
        console.log("token", token)
        return 'ok'
    } catch (err) {
      throw err
    }
  }

export function logout() {
    destroyCookie(null, GRID_KEY, {path: '/'})
    // TODO: Add private routes
    if (typeof window !== 'undefined') window.location = '/login'
}

export function getUser() {
    return new Promise(async (resolve, reject) => {
        await HttpService.get(
            'http://localhost/api/v1/users/user-profile',
            function (data) {
                if (data !== undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                } else {
                    reject("Error while retrieving user");
                }
            },
            function (textStatus) {
                reject(textStatus);
            }
        );
    });
}
