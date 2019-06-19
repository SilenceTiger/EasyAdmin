import http from '@/utils/http'

export function fetchList() {
    return http({
        url: '/api/get',
        method: 'get'
    })
}