import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: '',
    timeout: 5000 // request timeout
})


// request interceptor
// service.interceptors.request.use(config => {
//     // Do something before request is sent
//     if (store.getters.token) {
//       // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   }, error => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
//   })

service.interceptors.response.use(response => {
    let res = response.data;
    if(res.status) {
        return res.data;
    }
    else {
        console.log('system error')
    }
})

export default service