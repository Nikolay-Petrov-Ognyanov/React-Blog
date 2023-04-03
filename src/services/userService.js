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

        return response.ok && response
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async () => {
    const response = await fetch(`http://localhost:3030/jsonstore/users`)

    return response.ok && response.json()
}


export const createUser = (userData) => {
    userData.userId = userData._id

    return fetch(`http://localhost:3030/jsonstore/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
}