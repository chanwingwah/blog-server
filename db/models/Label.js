// 对应 walking-blog 集合

const mongoose = require('../db')

const LabelSchema = mongoose.Schema({
    "name": String,
    "sort": Number,
    "count": Number
}, { timestamps: true })

const Label = mongoose.model('label', LabelSchema)


module.exports = Label
