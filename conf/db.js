const env = process.env.NODE_ENV  // 环境参数

// 配置
let MONGODB_CONF
let REDIS_CONF

if (env === 'dev') {
    // mongodb
    MONGODB_CONF = {
        url: 'mongodb://localhost:27017',
        dbName: 'myblog'
    }
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // mongodb
    MONGODB_CONF = {
        url: 'mongodb://localhost:27017/myblog',
    }
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MONGODB_CONF,
    REDIS_CONF
}