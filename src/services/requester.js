export const request = async (url) => {
    try {
        // const response = await fetch(url)

        return await (await fetch(url)).json()
    } catch (error) {
        console.log(error)
    }
}