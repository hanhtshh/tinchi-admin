import axios from "axios"
import config from "../config"

const getListSessionService = async (pageSize, current, date) => {
    const results = await axios.get(`${config.service_host}/session/get-all-session`, {
        params: {
            pageSize,
            current,
            date
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}

const addSessionService = async (sessionInfo) => {
    const results = await axios.post(`${config.service_host}/sessions/create`, sessionInfo, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    return results?.data?.data
}


const getDetailSessionService = async (id) => {
    const results = await axios.get(`${config.service_host}/session/get-session-info`, {
        params: {
            id
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results?.data?.data
}

export {
    getListSessionService,
    addSessionService,
    getDetailSessionService
}