const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')()
const router = require('koa-router')()
const Koa = require('koa')
const moment = require('moment')
const db = require('./db')
const friday = require('./friday')

const SERVER_PORT = 8080
const app = new Koa()

app.use(serve('public'))
app.use(bodyParser)

app.use(async (ctx, next) => {
  if (ctx.request.method === 'POST'){
    ctx.request.body.createdAt = moment().utc()
  }
  next()
})

router.get('/list', ctx => {
  ctx.body = (
    db.get('posts')
      .filter(post => (
        moment(post.createdAt) <= friday
      ))
  )
})

router.post('/new', ctx => {
  const { name, text, createdAt } = ctx.request.body
  db.get('posts')
    .push({ name, text, createdAt })
    .write()
  ctx.body = 'Successfully submitted'
})


app.use(router.routes())


app.listen(SERVER_PORT, () => {
  console.log('JSON Server is running port: ', SERVER_PORT) // eslint-disable-line
})
