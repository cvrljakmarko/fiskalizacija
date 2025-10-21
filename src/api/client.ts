import axios, { AxiosError, AxiosResponse } from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' }
})

// Attach Authorization if token exists
client.interceptors.request.use((config) => {
    try {
        const token = window.localStorage.getItem('auth_token')
        if (token) {
            config.headers = config.headers ?? {}
            config.headers.Authorization = `Bearer ${token}`
        }
    } catch {}
    return config
})

client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error('Error:', error.message)
        return Promise.reject(new Error('Something went wrong. Please try again.'))
    }
)

export default client
