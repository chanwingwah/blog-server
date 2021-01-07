const router = require('koa-router')()
const { awaitWrap } = require('../utils/awaitWrap');

const {
    getList,
    add,
    update,
    del
} = require('../controller/comment')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/comment')

router.get('/list', async function (ctx, next) {
    const listData = await getList({status: 1, articleId: ctx.query.articleId})
    ctx.body = new SuccessModel(listData)
})

router.post('/add', async function (ctx, next) {
    const body = ctx.request.body
    const [err, data] = await awaitWrap(add(body))
    if(data) {
        ctx.body = new SuccessModel(data)
    } else {
        ctx.body = new ErrorModel(err)
    }
})

router.post('/update', loginCheck, async function (ctx, next) {
    const val = await update(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新失败')
    }
})

router.post('/del', loginCheck, async function (ctx, next) {
  const body = ctx.request.body
  const val = await del(body)
  if (val) {
      ctx.body = new SuccessModel()
  } else {
      ctx.body = new ErrorModel('删除失败')
  }
})

module.exports = router
