// const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const User = require('../db/models/User')

const login = async (username, password) => {
    // 生成加密密码
    password = genPassword(password)
    const userList = await User.find({
        username,
        password
    })
    if (userList.length === 0) return {}
    return userList[0]
}

module.exports = {
    login
}