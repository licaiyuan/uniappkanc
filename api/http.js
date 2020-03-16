let Fly = require("flyio/dist/npm/wx")

let fly = new Fly
fly.config.timeout = 30000;
//设置请求基地址
fly.config.baseURL = 'http://ops.xmrtc.com/api'
export const registe = (params) => {
    return fly.post('/users/register', params)
}
export const jyqq = (params) => {
    return fly.get('/info-surveys/listExperience', params)
}