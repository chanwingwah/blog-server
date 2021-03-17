// const xss = require('xss')
const Blog = require('../db/models/Blog')
const Walking = require('../db/models/Walking')
const Subscribe = require('../db/models/Subscribe')
// const Subscribe = require('../db/models/Subscribe')

const getCounts = async () => { 
    let blogNum = await Blog.countDocuments({"status":1})
    let walkingNum = await Walking.countDocuments({"status":1})
    let subscribeNum  = await Subscribe.countDocuments({"status":1})
    return {
        blogNum,
        walkingNum,
        subscribeNum        
    }
}

module.exports = {
    getCounts
}