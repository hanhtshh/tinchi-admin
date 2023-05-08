import axios from "axios"
import config from "../config"

const getListClassService = async (pageSize, current, name) => {
    const results = await axios.get(`${config.service_host}/class/get-all-class`, {
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

const getClassInfoService = async (id) => {
    const results = await axios.get(`${config.service_host}/class/get-class-info`, {
        params: {
            id
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}

const checkScheduleService = async (listClassId) => {
    const results = await axios.post(`${config.service_host}/class/check-schedule`, {
        listClassId
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}

const addClassService = async (listClassId, userId) => {
    const results = await axios.post(`${config.service_host}/class/add-class-admin`, {
        listClassId,
        userId
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}


const createClassService = async (classInfo) => {
    const results = await axios.post(`${config.service_host}/class/create`, {
        ...classInfo
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}

const updateClassService = async (classInfo) => {
    const results = await axios.put(`${config.service_host}/class/update`, {
        ...classInfo
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results.data.data
}


export {
    getListClassService,
    checkScheduleService,
    addClassService,
    createClassService,
    updateClassService,
    getClassInfoService
}