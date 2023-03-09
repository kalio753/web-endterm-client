import axios from "axios"

export function requestGetProfileById(payload) {
    return axios.request({
        method: "post",
        data: payload,
        url: "/api/profile/get-by-id",
    })
}

export function requestGetProfileMe(payload) {
    return axios.request({
        method: "post",
        data: payload,
        url: "/api/profile/get-me",
    })
}
