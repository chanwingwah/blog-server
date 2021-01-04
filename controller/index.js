// const xss = require('xss')
const Blog = require('../db/models/Blog')
const Walking = require('../db/models/Walking')
// const Subscribe = require('../db/models/Subscribe')

const getCounts = async () => { 
    let blogNum = await Blog.estimatedDocumentCount({status:1})
    let walkingNum = await Walking.estimatedDocumentCount({status:1})
    let subscribeNum  = 0
    return {
        blogNum,
        walkingNum,
        subscribeNum        
    }
}

module.exports = {
    getCounts
}