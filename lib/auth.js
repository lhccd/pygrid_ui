import {parseCookies, setCookie, destroyCookie} from 'nookies'
import axios from 'axios'
import jwt from 'jsonwebtoken'

const GRID_KEY = 'grid'

export function getToken() {
  const parsedCookies = parseCookies()
  return parsedCookies?.[GRID_KEY]
}

export function logout() {
    destroyCookie(null, GRID_KEY, {path: '/'})
    // TODO: Add private routes
    if (typeof window !== 'undefined') window.location = '/login'
}

export function decodeToken() {
    const token = getToken()
    if (!token) return null
    console.log("TOKEN", token, jwt.decode(token))
    return jwt.decode(token)
}

export async function login(values) {
    console.log("values from auth", values)
    const formData = new FormData
    formData.append("username", values.username)
    formData.append("password", values.password)
    try {
        console.log("config data: ", values)
        const token = await axios.post('http://localhost/api/v1/login/access-token', formData)
        setCookie(null, GRID_KEY, token.access_token, {maxAge: 30 * 24 * 60 * 60 * 5, path: '/'}) 
        console.log("token", token)
        return 'ok'
    } catch (err) {
      throw err
    }
  }
  