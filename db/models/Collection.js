// 对应 walking-blog 集合

const mongoose = require('../db')

const CollectionSchema = mongoose.Schema({
    "name": String,
    "sort": Number,
    "count": Number
}, { timestamps: true })

const Collection = mongoose.model('collection', CollectionSchema)

module.exports = Collection