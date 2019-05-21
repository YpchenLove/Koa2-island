const Router = require('koa-router')
const { HttpException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/book'
})

router.get('/:id', new Auth(9).m, (ctx, next) => {
    ctx.body = ctx.auth.uid
})

module.exports = router
