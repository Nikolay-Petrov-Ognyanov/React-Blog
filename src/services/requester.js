const request = async (method, url, data) => {
    try {
        let requester

        if (method === "GET") {
            requester = fetch(url)
        } else {
            requester = fetch(url, {
                method,
                headers: {
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