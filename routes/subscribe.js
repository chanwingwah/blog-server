const router = require('koa-router')()
const { awaitWrap } = require('../utils/awaitWrap');

const {
  getList,
  newSubscribe
} = require('../controller/subscribe')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/subscribe')

router.get('/list', async function (ctx, next) {
    const listData = await getList({status: 1})
    ctx.body = new SuccessModel(listData)
})

router.post('/new', async function (ctx, next) {
  const body = ctx.request.body
  const data = await newSubscribe(body)
  ctx.body = new SuccessModel(data)
})

module.exports = router
