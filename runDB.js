process.env.NODE_ENV = "production"
const {
  getList,
  getDetail,
  updateBlog,
} = require('./controller/blog')
const { extractHeaders } = require('@vuepress/shared-utils')

var md = require('@vuepress/markdown')({
  anchor: { permalink: false },
  html: true,
  linkify: true,
  typographer: true
})

getList().then(res => {
  console.log(res.length)
  res.slice(0, 1).forEach((item) => {
    getDetail(item.id).then(blog => {
      blog.HTML = md.render(blog.markdown).html
      blog.headers = extractHeaders(blog.markdown, ['h2', 'h3'], md)
      updateBlog(blog.id, blog)
    })
  })
})