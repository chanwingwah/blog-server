const xss = require('xss')
const Comment = require('../db/models/Comment')
const Blog = require('../db/models/Blog')


const getList = async (whereOpt) => { 
    console.log('whereOpt:',Object.assign({status:1},whereOpt))
    const list = await Comment.find(whereOpt).sort({ createdAt: -1 })
    return list
}

const add = async (commentData = {}) => {
    let { commentCount } = await Blog.findById(commentData.articleId, 'commentCount')
    const comment = await Comment.create(commentData)
    if(!commentCount) {
        commentCount = 0
    }
    commentCount++
    await Blog.findOneAndUpdate(
        { _id: commentData.articleId },
        {commentCount},
        { new: true , fields: 'commentCount'}  // 返回修改后的数据
    )
    return {
        id: comment._id
    }
}

const update = async (id, commentData = {}) => {
    // const title = xss(commentData.title)
    // const content = xss(commentData.content)
    const comment = await Comment.findOneAndUpdate(
        { _id: id },
        commentData,
        { new: true }  // 返回修改后的数据
    )

    if (comment == null) return false
    return true
}

const del = async ({id, articleId}, author) => {
    const comment = await Comment.findOneAndUpdate(
        { _id: id },
        { status:-1 },
        { new: true }  // 返回修改后的数据
    )
    if (comment == null) return false
    let { commentCount } = await Blog.findById(articleId, 'commentCount')
    if(commentCount>0) {
        commentCount--
    }
    await Blog.findOneAndUpdate(
        { _id: articleId },
        {commentCount},
        { new: true , fields: 'commentCount'}  // 返回修改后的数据
    )
    return {
        id: comment._id
    }
}

module.exports = {
    getList,
    add,
    update,
    del
}