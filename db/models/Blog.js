// 对应 blog 集合

const mongoose = require('../db')

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true // 必需
    },
    markdown: String,
    releaseTime: Date,
    HTML: String,
    tagNames: {
        type:Array,
        default: []
    },
    category: String,
    summary: String,
    status: {
        type: Number,
        default:1
    },
    viewCount: {
        type: Number,
        default:0
    },
    commentCount: {
        type: Number,
        default:0
    },
    likeCount:{
        type: Number,
        default:0
    }
}, { timestamps: true })

const Blog = mongoose.model('blog', BlogSchema)

module.exports = Blog
