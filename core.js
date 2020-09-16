const serve = require('koa-static')
const compose = require('koa-compose')
const Router = require('koa-router')
const koa = require('koa')
const path = require('path')
const app = new koa()

const router = Router({
    prefix: '/api'
})

const DATA = [{id: 0, text:'world'}]

router.get('/hello', async(ctx, next)=>{
    console.log(ctx.path)
    ctx.response.body = 
    await next()
})
router.get('/', async(ctx, next)=>{
    console.log(ctx.path)
    await next()
})

async function custom(ctx, next){
    console.log('hello')
    await next()
}

app.use(compose([router.routes(), custom, serve(path.resolve(__dirname, 'client', 'build'))]))
app.listen(5000)