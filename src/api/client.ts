import axios, { AxiosError, AxiosResponse } from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' }
})

client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error('Error:', error.message)
        return Promise.reject(new Error('Something went wrong. Please try again.'))
    }
)

export default client
