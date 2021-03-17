// 对应 walking-blog 集合

const mongoose = require('../db')

const SubscribeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true // 必需
    },
    nickname: {
        type: Array,
        default:[]
    },
    status: {
        type: Number,
        default:1
    },
}, { timestamps: true })

const Subscribe = mongoose.model('subscribe', SubscribeSchema)

module.exports = Subscribe
