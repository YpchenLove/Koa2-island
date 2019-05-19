const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const router = new Router()
router.get('/v1/book/:id', (ctx, next) => {
    const err = new HttpException('哈哈哈', 10002, 401) 
    throw err
    // const v = new PositiveIntegerValidator().validate(ctx)
    // const a = v.get('ctx.params.id')
    ctx.body = { a: 234}
})

module.exports = router
