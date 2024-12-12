import axios from 'axios'

const service =  axios.create({
    baseURL: '/api',
    timeout: 12000,
})

export default service

