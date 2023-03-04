import axios from "axios"
import config from "../config"

const getListSessionService = async (pageSize, current) => {
    const results = await axios.get(`${config.service_host}/session/get-all-session`, {
        params: {
            pageSize,
            current
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}

export {
    getListSessionService
}