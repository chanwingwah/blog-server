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
    "status": {
        type: Number,
        default:1
    },
    "likeCount":{
        type: Number,
        default:0
    }
}, { timestamps: true })

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment