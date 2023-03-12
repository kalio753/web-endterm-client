import axios from "axios"

export function requestGetAllPosts(payload) {
    return axios.request({
        method: "post",
        data: payload,
        url: "/api/post/get-all",
    })
}

export function requestGetPostById(payload) {
    return axios.request({
        method: "post",
        data: payload,
        url: "/api/post/get-by-id",
    })
}
