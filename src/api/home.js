import http from '@/utils/http'

export function fetchTree() {
    return http({
        url: '/api/getTree',
        method: 'get'
    })
}