import axios from "axios"

export function requestGetAllPosts(payload) {
    return axios.request({
        method: "post",
        data: payload,
        url: "/api/post/get-all",
    })
}
