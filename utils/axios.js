import axios from "axios"
/* request pre-processing */

// EXPRESS URL
axios.defaults.baseURL = "http://127.0.0.1"
axios.interceptors.request.use(
    (config) => {
        // add header token

        // config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        //     "access_token"
        // )}`

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data
        } else return response
    },
    (error) => {
        throw error
    }
)

export const AxiosExpress = axios.create()
