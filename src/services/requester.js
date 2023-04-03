const request = async (method, url, data) => {
    try {
        const userData = localStorage.getItem("user")
        const user = JSON.parse(userData || "{}")

        let requester
        let headers = {}

        if (user?.accessToken) {
            headers["X-Authorization"] = user.accessToken
        }

        if (method === "GET") {
            requester = fetch(url, { headers })
        } else {
            requester = fetch(url, {
                method,
                headers: {
                    ...headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }

        const response = await requester

        const result = await response.json()

        return result
    } catch (error) {
        console.log(error)
    }
}

export const get = request.bind({}, "GET")
export const post = request.bind({}, "POST")
export const patch = request.bind({}, "PATCH")
export const put = request.bind({}, "PUT")
export const del = request.bind({}, "DELETE")