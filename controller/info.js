// const xss = require('xss')
const Info = require('../db/models/Info')

const getList = async (params) => { 
    const whereOpt = params
    const list = await Info.find(whereOpt).sort({ _id: -1 })
    return list
}


const newInfo = async (blogData = {}) => {
    const walking = await Info.create(blogData)
    return {
        id: walking._id
    }
}

const updateInofo = async (id, infoData = {}) => {
    const info = await Info.findOneAndUpdate(
        { _id: id },
        infoData,
        { new: true }  // 返回修改后的数据
    )
    if (info == null) return false
    return true
}


module.exports = {
    getList,
    newInfo,
    updateInofo 
}