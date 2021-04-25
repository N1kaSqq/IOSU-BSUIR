import axios from "axios";

const $fetch = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $fethAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$fethAuth.interceptors.request.use(authInterceptor)

export {
    $fetch,
    $fethAuth
}