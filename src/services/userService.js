import * as request from "./requester"

const users = "http://localhost:3030/users"

export const register = (email, password) => request.post(`${users}/register`, { email, password })

export const login = (email, password) => request.post(`${users}/login`, { email, password })

export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${users}/logout`, {
            headers: {
                "X-Authorization": accessToken
            }
        })

        return response
    } catch (error) {
        console.log(error)
    }
}