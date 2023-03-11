import axios from "axios"
/* request pre-processing */

// EXPRESS URL
// axios.defaults.baseURL = "http://127.0.0.1:5000"
axios.defaults.baseURL =
    "http://ec2-18-181-190-3.ap-northeast-1.compute.amazonaws.com"
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
