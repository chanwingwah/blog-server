// 对应 blog 集合

const mongoose = require('../db')

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true // 必需
    },
    markdown: String,
    tagNames: Array,
    category: String,
    summary: String,
    status: Number,
    viewCount: Number,
    commentCount: Number,
    likeCount:Number,
    comments: Array

}, { timestamps: true })

const Blog = mongoose.model('blog', BlogSchema)

module.exports = Blog
