import { useState, useCallback } from 'react'

export const useRequest = ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async(url, method='GET', body=null, headers={})=>{
        setLoading(true)
        if(method ==='GET'){
            try {
                const response = await fetch(url)
                const data = await response.json()
                setLoading(false)
                return data
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }else{
            try{
                body = JSON.stringify(body)
                headers['Content-Type']='application/json'
                const response = await fetch(url, {method, body, headers})
                const data = await response.json()
                setLoading(false)
                return data
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
    },[])
    return([request, loading, error])
}