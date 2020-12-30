const env = process.env.NODE_ENV  // 环境参数

// 配置
let REDIS_CONF

if (env === 'dev') {
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    REDIS_CONF
}