const Router = require('koa-router')
const { HttpException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')

const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', (ctx, next) => {
    const err = new HttpException('哈哈哈', 10002, 401)
    throw err
    // const v = new PositiveIntegerValidator().validate(ctx)
    // const a = v.get('ctx.params.id')
})

module.exports = router
