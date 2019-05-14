import Router from 'koa-router'
const router = new Router()

router.get('/v1/classic', (ctx, next) => {
    ctx.body = {
        key: 'class',
        bal: 12324
    }
})

module.exports = router
