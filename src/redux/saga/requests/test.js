import axios from "axios"

export function requestGetTest() {
    return axios.request({
        method: "get",
        headers: {
            //     Authorization: `Bearer ${token}`,
        },
        url: "https://jsonplaceholder.typicode.com/posts",
    })
}
