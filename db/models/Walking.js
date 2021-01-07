// 对应 walking-blog 集合

const mongoose = require('../db')

const WalkingSchema = mongoose.Schema({
    contents: {
        type: String,
        required: true // 必需
    },
    images: {
        type: Array,
        default:[]
    },
    likeCount: {
        type: Number,
        default:0
    },
    status: {
        type: Number,
        default:1
    },
}, { timestamps: true })

const Walking = mongoose.model('walking', WalkingSchema)

module.exports = Walking
