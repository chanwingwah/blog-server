const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
  addLikeBlog,
  cancelLikeBlog,
  addViewCount

} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { awaitWrap } = require('../utils/awaitWrap');
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    const listData = await getList()
    ctx.body = new SuccessModel(listData)
})

router.get('/detail', async function (ctx, next) {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async function (ctx, next) {
  const body = ctx.request.body
  const [err, data] = await awaitWrap(newBlog(body))
  if(data) {
      ctx.body = new SuccessModel(data)
  } else {
      ctx.body = new ErrorModel(err)
  }
})

router.post('/update', loginCheck, async function (ctx, next) {
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新失败')
    }
})

router.post('/del', loginCheck, async function (ctx, next) {
  const author = ctx.session.username
  const val = await delBlog(ctx.query.id)
  if (val) {
      ctx.body = new SuccessModel()
  } else {
      ctx.body = new ErrorModel('删除失败')
  }
})

// 点赞
router.post('/addLike', async function (ctx, next) {
    const body = ctx.request.body
    const [err, data] = await awaitWrap(addLikeBlog(body.id))
        if(data) {
        ctx.body = new SuccessModel(data)
    } else {
        ctx.body = new ErrorModel(err)
    }
  })
router.post('/cancelLike', async function (ctx, next) {
    const body = ctx.request.body
    const [err, data] = await awaitWrap(cancelLikeBlog(body.id))
        if(data) {
        ctx.body = new SuccessModel(data)
    } else {
        ctx.body = new ErrorModel(err)
    }
  })
router.post('/addViewCount', async function (ctx, next) {
    const body = ctx.request.body
    const [err, data] = await awaitWrap(addViewCount(body.id))
        if(data) {
        ctx.body = new SuccessModel(data)
    } else {
        ctx.body = new ErrorModel(err)
    }
  })


module.exports = router
