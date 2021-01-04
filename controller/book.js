// const xss = require('xss')
const Book = require('../db/models/Book')

const getList = async (params) => { 
    // 动态拼接查询条件
    const whereOpt = params
    // if (author) whereOpt.author = author
    // if (keyword) whereOpt.keyword = new RegExp(keyword)
    // ...

    const list = await Book.find(whereOpt).sort({ _id: -1 })
    return list
}

const getDetail = async (id) => {
    const book = await Book.findById(id)
    return book
}

const newBook= async (blogData = {}) => {
    const book = await Book.create(blogData)
    return {
        id: book._id
    }
}

const updateBook = async (id, blogData = {}) => {
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)

    const book = await Book.findOneAndUpdate(
        { _id: id },
        blogData,
        { new: true }  // 返回修改后的数据
    )

    if (book == null) return false
    return true
}

const delBook = async (id, author) => {
    const book = await Book.findOneAndDelete({
        _id: id,
    })
    if (book == null) return false
    return true
}

module.exports = {
    getList,
    getDetail,
    newBook,
    updateBook,
    delBook
}