import axios from 'axios';
import { SERVER } from "./server";
import {refreshAccessToken} from "./security/authentication";

const api = axios.create({
    baseURL: SERVER.resource_uri,
    timeout: 1 * 60 * 1000
});

// Request interceptor for API calls
api.interceptors.request.use(
    async (config) => {
        const value = localStorage.getItem("TOKEN")
        const token = JSON.parse(value)//add headers to each request
        config.headers = {
            'Authorization': `Bearer ${token.access_token}`,
            'Accept': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });


// Response interceptor for API calls
api.interceptors.response.use((response) => {
    console.log(response)
    return response
}, async (error) => {
    if (error) {
        console.log("fail", error)
        let originalRequest = error.config;
        let status = error.status || error.response.status
        if ((status === 401 || status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = await refreshAccessToken();//gui refresh token de luu access token moi vao localstorage

            //api.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;

            return api(originalRequest);//thuc hien lai request
        }
    }
    return Promise.reject(error);
})

export default api;