// const xss = require('xss')
const Info = require('../db/models/Label')

const getList = async (params) => { 
    // 动态拼接查询条件
    const whereOpt = params
    // if (author) whereOpt.author = author
    // if (keyword) whereOpt.keyword = new RegExp(keyword)
    // ...

    const list = await Info.find(whereOpt).sort({ _id: -1 })
    return list
}

const getDetail = async (id) => {
    const info = await Info.findById(id)
    return info
}

const add = async (blogData = {}) => {
    const info = await Info.create(blogData)
    return {
        id: info._id
    }
}

const update = async (id, blogData = {}) => {
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)

    const info = await Info.findOneAndUpdate(
        { _id: id },
        blogData,
        { new: true }  // 返回修改后的数据
    )

    if (info == null) return false
    return true
}

const del = async (id, author) => {
    const info = await Info.findOneAndDelete({
        _id: id,
    })
    if (info == null) return false
    return true
}
const bulkAdd = async (labelArray) => {
    if(labelArray.length === 0) {
        return true
    }
    list = await Info.find()
    var  newArray = []
    var updateArray = []
    labelArray.forEach(label => {
        let updateItem
        var hadExist =  list.some((item)=> {
           if(item.name === label) {
                item.count++
                updateItem = item
               return true
           }
             
        })
        if(!hadExist) {
            newArray.push({
                name: label,
                count:1,
                sort:0
            })
        } else {
            updateArray.push(updateItem)
        }
    });
    try {
        await Info.insertMany(newArray)
        for(let i=0;i<updateArray.length;i++) {
            await Info.findOneAndUpdate(
                { _id: updateArray[i].id },
                updateArray[i],
            )
        }
        // 这样写不行
        // updateArray.forEach((updateItem)=> {
        //     Info.findOneAndUpdate(
        //         { _id: updateItem.id },
        //         updateItem,
        //         // { new: true }  // 返回修改后的数据
        //     )
        // })
    } catch(e) {
        console.log(e)
        return e
    }
    return true



    
    // if(updateArray.length) {
    //     const info = await Info.findOneAndUpdate(
    //         { _id: id },
    //         blogData,
    //         { new: true }  // 返回修改后的数据
    //     )
    // }

    // const info = await Info.findOneAndDelete({
    //     _id: id,
    // })
    // if (info == null) return false
    // return true
}


module.exports = {
    getList,
    getDetail,
    add,
    update,
    del,
    bulkAdd
}