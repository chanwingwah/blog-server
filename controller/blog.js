// const xss = require('xss')
const Blog = require('../db/models/Blog')

const getList = async () => { 
    // 动态拼接查询条件
    const whereOpt = {}
    // if (author) whereOpt.author = author
    // if (keyword) whereOpt.keyword = new RegExp(keyword)
    // ...

    const list = await Blog.find(whereOpt, {
        markdown:false,
        HTML:false
    }).sort({ _id: -1 })
    return list
}

const getDetail = async (id) => {
    const blog = await Blog.findById(id)
    return blog
}

const newBlog = async (blogData = {}) => {
    const blog = await Blog.create(blogData)
    return {
        id: blog._id
    }
}

const updateBlog = async (id, blogData = {}) => {
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)
    const blog = await Blog.findOneAndUpdate(
        { _id: id },
        blogData,
        { new: true }  // 返回修改后的数据
    )

    if (blog == null) return false
    return true
}

const delBlog = async (id, author) => {
    const blog = await Blog.findOneAndDelete({
        _id: id,
    })
    if (blog == null) return false
    return true
}

const addLikeBlog = async (id, blogData = {}) => {
    let {likeCount} = await Blog.findById(id, 'likeCount')
    likeCount++
    const blog = await Blog.findOneAndUpdate(
        { _id: id },
        {likeCount},
        { new: true , fields: 'likeCount'}  // 返回修改后的数据
    )
    return blog
}
const cancelLikeBlog = async (id, blogData = {}) => {
    let {likeCount} = await Blog.findById(id, 'likeCount')
    if(likeCount>0 ) {
        likeCount--
    }
    const blog = await Blog.findOneAndUpdate(
        { _id: id },
        {likeCount},
        { new: true , fields: 'likeCount'}  // 返回修改后的数据
    )
    return blog
}
const addViewCount = async (id, blogData = {}) => {
    let {viewCount} = await Blog.findById(id, 'viewCount')
    viewCount++
    const blog = await Blog.findOneAndUpdate(
        { _id: id },
        {viewCount},
        { new: true , fields: 'viewCount'}  // 返回修改后的数据
    )
    return blog
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
    addLikeBlog,
    cancelLikeBlog,
    addViewCount
}