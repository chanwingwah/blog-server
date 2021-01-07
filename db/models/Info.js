// 对应 零散的信息 集合

const mongoose = require('../db')

const InfoSchema = mongoose.Schema({
    aboutme: String, // 关于我
    // email: String,   // 邮箱
    // location: String, // 位置
    experience: { // 经历
        type: Array,
        default:[]
    },

    // bookInfo:String, // 书单页面描述

}, { timestamps: true })

const Info = mongoose.model('info', InfoSchema)

module.exports = Info
