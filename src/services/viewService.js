export const getViewInfo = async () => {
    const response = await fetch(`http://localhost:3030/jsonstore/view`)
    const result = !response.message && await response.json() || []
       
    return Object.values(result) || []
}

export const createViewEntry = (view, userId) => {
    return fetch(`http://localhost:3030/jsonstore/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ view, userId })
    })
}