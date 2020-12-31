// 对应 blog 集合

const mongoose = require('../db')

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true // 必需
    },
    contents: String,
    tagNames: String,
    summary: String,
    status: Number
}, { timestamps: true })

const Blog = mongoose.model('blog', BlogSchema)

module.exports = Blog
