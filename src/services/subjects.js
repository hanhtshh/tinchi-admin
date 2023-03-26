import axios from "axios"
import config from "../config"

const getListSubjectService = async (pageSize, current) => {
    const results = await axios.get(`${config.service_host}/subject/get-all-subject`, {
        params: {
            pageSize,
            current
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results?.data?.data
}

const addSubjectService = async (subjectInfo) => {
    const results = await axios.post(`${config.service_host}/subject/create`, subjectInfo, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    return results?.data?.data
}

const getDetailSubjectService = async (id) => {
    const results = await axios.get(`${config.service_host}/subject/get-subject-info`, {
        params: {
            id
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return results?.data?.data
}

const updateSubjectService = async (id, subjectInfo) => {
    const results = await axios.put(`${config.service_host}/subject/update/${id}`, subjectInfo, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
    return results?.data?.data
}

export {
    getDetailSubjectService,
    getListSubjectService,
    addSubjectService,
    updateSubjectService
}