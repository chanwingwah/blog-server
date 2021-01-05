// 对应 blog 集合

const mongoose = require('../db')

const CommentSchema = mongoose.Schema({
    "nickname":String,
    "email": String,
    "comment":String,
    "articleId":String,
    "articleTitle":String,
    "website": String,
    "quoteId": String,
    "quote":Object,
    "status": Number,
    "likeCount":Number
}, { timestamps: true })

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment