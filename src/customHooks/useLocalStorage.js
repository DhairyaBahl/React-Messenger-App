import { useState, useEffect } from 'react'

export default function useLocalStorage(name, initialValue) {
    const PREFIX = "RMA"
    const key = `${PREFIX}-${name}`
    
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initialValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}