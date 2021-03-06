export const request = async (
    url,
    method = 'GET',
    body = null,
    headers = null
) => {
    if (method === 'GET') {
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (err) {
            throw err
        }
    } else if (method === 'POST' && headers === null) {
        try {
            body = JSON.stringify(body)
            headers = { 'Content-Type': 'application/json' }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            return data
        } catch (err) {
            throw err
        }
    } else if (method === 'POST' && headers !== null) {
        try {
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            return data
        } catch (err) {
            throw err
        }
    } else if (method === 'PATCH' && headers === null) {
        try {
            body = JSON.stringify(body)
            headers = { 'Content-Type': 'application/json' }
            const response = await fetch(url, { method, body, headers })
            return response
        } catch (err) {
            throw err
        }
    }
}
