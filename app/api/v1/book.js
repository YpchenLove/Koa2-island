import Router from 'koa-router'
const router = new Router()

router.get('/v1/book', (ctx, next) => {
    ctx.body = {
        key: 'hehe',
        bal: 12324
    }
})

module.exports = router
