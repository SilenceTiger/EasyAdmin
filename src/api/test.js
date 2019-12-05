import http from '@/utils/http'
let proxyURL = '';
export function fetchList() {
    return http({
        url: proxyURL + '/api/get',
        method: 'get'
    })
}