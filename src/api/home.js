import http from '@/utils/http'

export function fetchTree() {
    return http({
        url: '/api/table/getTree',
        method: 'get'
    })
}