const router = require('koa-router')()
const { login } = require('../controller/user')
const {   
  getList,
  newInfo,
  updateInofo  
} = require('../controller/info')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')
const { awaitWrap } = require('../utils/awaitWrap');
const loginCheck = require('../middleware/loginCheck')

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


// 关于我

router.get('/list', async function (ctx, next) {
  const listData = await getList()
  ctx.body = new SuccessModel(listData)
})


router.post('/new', loginCheck, async function (ctx, next) {
const body = ctx.request.body
const [err, data] = await awaitWrap(newInfo(body))
if(data) {
    ctx.body = new SuccessModel(data)
} else {
    ctx.body = new ErrorModel(err)
}
})

router.post('/update', loginCheck, async function (ctx, next) {
  const val = await updateInofo(ctx.query.id, ctx.request.body)
  if (val) {
      ctx.body = new SuccessModel()
  } else {
      ctx.body = new ErrorModel('更新失败')
  }
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