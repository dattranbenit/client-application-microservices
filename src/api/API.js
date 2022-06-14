import axios from 'axios';

export const SERVER = {
    resource_uri: "http://localhost:8005",
    clientId: "jmaster",
    clientSecret: "123",
    scopes: "read write log notification",
    callback_uri: "http://localhost:3000/login",
    auth_uri: 'http://localhost:8007'
}

const axiosAuthInstance = axios.create({
    baseURL: SERVER.resource_uri,
    timeout: 2500
});

// Request interceptor for API calls
axiosAuthInstance.interceptors.request.use(
    async (config) => {
        const value = localStorage.getItem("TOKEN")
        const token = JSON.parse(value)
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
axiosAuthInstance.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 401) && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = await refreshAccessToken();
        //axiosAuthInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
        return axiosAuthInstance(originalRequest);
    }

    return Promise.reject(error);
})

export const refreshAccessToken = async () => {
    let value = localStorage.getItem("TOKEN")
    let refresh_token = JSON.parse(value).refresh_token

    const params = {
        grant_type: 'refresh_token',
        refresh_token
    }

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(SERVER.clientId + ":" + SERVER.clientSecret).toString('base64'),
        'Content-Type': 'application/json'
    }

    var config = {
        baseURL: SERVER.auth_uri,
        method: 'post',
        url: '/oauth/token',
        headers,
        params
    };

    let response = await axios(config)
    let data = response.data
    //set new token
    localStorage.setItem("TOKEN", JSON.stringify(data))

    return data

}

export default axiosAuthInstance;