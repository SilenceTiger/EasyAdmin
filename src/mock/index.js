import Mock from 'mockjs'
import tableAPI from './table'

Mock.mock(/\/api\/table\/getTree/, 'get', tableAPI.getTree)