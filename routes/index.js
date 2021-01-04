const router = require('koa-router')()
const {
  getCounts
} = require('../controller/index')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { awaitWrap } = require('../utils/awaitWrap');

router.get('/getCounts', async function (ctx, next) {
  const [err, data] = await awaitWrap(getCounts())
  if(data) {
      ctx.body = new SuccessModel(data)
  } else {
      ctx.body = new ErrorModel(err)
  }
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
