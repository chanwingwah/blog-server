const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')
const { awaitWrap } = require('../utils/awaitWrap');

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body
    const [err, data] = await awaitWrap(login(username, password))
    if (data && data.username) {
        // 设置 session
        // console.log("session:",ctx.ession)
        ctx.session.username = data.username
        ctx.body = new SuccessModel({
            username:ctx.session.username
        })
        return 
    }
    ctx.body = new ErrorModel('登录失败')
})
router.get('/logout', async function (ctx, next) {
    ctx.session.username = undefined
    ctx.body = new SuccessModel()
    return 
})

// 统计文章数
// router.get('/session-test', async function (ctx, next) {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0
//   }
//   ctx.session.viewCount++

//   ctx.body ={
//     errno: 0,
//     viewCount: ctx.session.viewCount
//   }
// })


router.get('/session-test', async function (ctx, next) {
    if (ctx.session.viewCount == null) {
      ctx.session.viewCount = 0
    }
    ctx.session.viewCount++
  
    ctx.body ={
      errno: 0,
      viewCount: ctx.session.viewCount
    }
  })

module.exports = router