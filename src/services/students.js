import axios from "axios"
import config from "../config"

const getListStudentService = async (pageSize, current, name) => {
    const results = await axios.get(`${config.service_host}/users/get-all-student`, {
        params: {
            pageSize,
            current,
            name
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}
const getUserDetailService = async (user_id) => {
    const results = await axios.get(`${config.service_host}/users/get-user-detail/${user_id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}

const updateUserInfoService = async (userInfo) => {
    const results = await axios.put(`${config.service_host}/users/update`, {
        ...userInfo
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}

const createUserInfoService = async (userInfo, listClassId) => {
    const results = await axios.post(`${config.service_host}/users/create`, {
        ...userInfo,
        listClassId
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}

export {
    getListStudentService,
    getUserDetailService,
    updateUserInfoService,
    createUserInfoService
}