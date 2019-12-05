import http from '@/utils/http'

export function fetchAdsKeyword() {
    return http({
        url: '/adsKeyword/list',
        method: 'get'
    })
}