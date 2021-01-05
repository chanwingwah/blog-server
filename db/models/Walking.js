// 对应 walking-blog 集合

const mongoose = require('../db')

const WalkingSchema = mongoose.Schema({
    contents: {
        type: String,
        required: true // 必需
    },
    images: Array,
    likeCount: Number,
    status: Number,
}, { timestamps: true })

const Walking = mongoose.model('walking', WalkingSchema)

module.exports = Walking
