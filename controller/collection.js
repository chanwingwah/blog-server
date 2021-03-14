// const xss = require('xss')
const Info = require('../db/models/Collection')

const getList = async (params) => { 
    // 动态拼接查询条件
    const whereOpt = params
    // if (author) whereOpt.author = author
    // if (keyword) whereOpt.keyword = new RegExp(keyword)
    // ...

    const list = await Info.find(whereOpt).sort({ _id: -1 })
    return list
}

const getDetail = async (id) => {
    const info = await Info.findById(id)
    return info
}

const add = async (blogData = {}) => {
    const info = await Info.create(blogData)
    return {
        id: info._id
    }
}

const update = async (id, blogData = {}) => {
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)

    const info = await Info.findOneAndUpdate(
        { _id: id },
        blogData,
        { new: true }  // 返回修改后的数据
    )

    if (info == null) return false
    return true
}

const del = async (id, author) => {
    const info = await Info.findOneAndDelete({
        _id: id,
    })
    if (info == null) return false
    return true
}

module.exports = {
    getList,
    getDetail,
    add,
    update,
    del
}