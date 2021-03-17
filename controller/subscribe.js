// const xss = require('xss')
const Subscribe = require('../db/models/Subscribe')

const getList = async (params) => { 
    // 动态拼接查询条件
    const whereOpt = params
    // if (author) whereOpt.author = author
    // if (keyword) whereOpt.keyword = new RegExp(keyword)
    // ...

    const list = await Subscribe.find(whereOpt).sort({ _id: -1 })
    return list
}

const newSubscribe = async (blogData = {}) => {
    const walking = await Subscribe.create(blogData)
    return {
        id: walking._id
    }
}


module.exports = {
    getList,
    newSubscribe
}