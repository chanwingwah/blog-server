const mongoose = require('mongoose')

const { MONGODB_CONF } = require('../conf/db')

mongoose.set('useCreateIndex', true) //加上这个
mongoose.set('useFindAndModify', false)

mongoose.connect(`${MONGODB_CONF.url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

// 发生错误
db.on('error', err => {
    console.error(err)
})

// 连接成功
db.once('open', () => {
    console.log('mongoose connect success…')
})

module.exports = mongoose
