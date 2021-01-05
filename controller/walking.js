// const xss = require('xss')
const Walking = require('../db/models/Walking')

const getList = async (params) => { 
    // 动态拼接查询条件
    const whereOpt = params
    // if (author) whereOpt.author = author
    // if (keyword) whereOpt.keyword = new RegExp(keyword)
    // ...

    const list = await Walking.find(whereOpt).sort({ _id: -1 })
    return list
}

const getDetail = async (id) => {
    const walking = await Walking.findById(id)
    return walking
}

const newWalking = async (blogData = {}) => {
    const walking = await Walking.create(blogData)
    return {
        id: walking._id
    }
}

const updateWalking = async (id, blogData = {}) => {
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)

    const walking = await Walking.findOneAndUpdate(
        { _id: id },
        blogData,
        { new: true }  // 返回修改后的数据
    )

    if (walking == null) return false
    return true
}

const delWalking = async (id, author) => {
    const walking = await Walking.findOneAndDelete({
        _id: id,
    })
    if (walking == null) return false
    return true
}

const addLike = async (id, blogData = {}) => {
    let {likeCount} = await Walking.findById(id, 'likeCount')
    likeCount++
    const walking = await Walking.findOneAndUpdate(
        { _id: id },
        {likeCount},
        { new: true , fields: 'likeCount'}  // 返回修改后的数据
    )
    return walking
}
const cancelLike = async (id, walkingData = {}) => {
    let {likeCount} = await Walking.findById(id, 'likeCount')
    if(likeCount>0 ) {
        likeCount--
    }
    const walking = await Walking.findOneAndUpdate(
        { _id: id },
        {likeCount},
        { new: true , fields: 'likeCount'}  // 返回修改后的数据
    )
    return walking
}

module.exports = {
    getList,
    getDetail,
    newWalking,
    updateWalking,
    delWalking,
    addLike,
    cancelLike
}