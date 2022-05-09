import axios from "axios"

const BASE_URL ="http://localhost:8000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzkxNzZiOGY4YmExMmMxNGU0M2M1NCIsImlhdCI6MTY1MjExNzUyNiwiZXhwIjoxNjUyMzc2NzI2fQ.c7WykgzHL_HfJllYNDxNA3yL5rtvNbkaGSbvA7ibsf0"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})