// 对应 blog 集合

const mongoose = require('../db')

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true // 必需
    },
    author: String,
    evaluation: String,
    name: String,
    description: String,
    photo: String,
    status: Number,
    difficulty: Number,
    progress: Number,
    recommendation: Number
}, { timestamps: true })

const Book = mongoose.model('book', BookSchema)

module.exports = Book