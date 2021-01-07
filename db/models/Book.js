// 对应 blog 集合

const mongoose = require('../db')

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true // 必需
    },
    author: String,
    evaluation: String, //评估
    description: String,
    photo: String,
    status: {
        type: Number,
        default:1
    },
    difficulty: Number,
    progress: Number,
    recommendation: {
        type: Number,
        default:5
    }
}, { timestamps: true })

const Book = mongoose.model('book', BookSchema)

module.exports = Book