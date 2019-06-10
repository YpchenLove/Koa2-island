const Router = require('koa-router')
const { HttpException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { HotBook } = require('@models/hot-book')

const router = new Router({
    prefix: '/v1/book'
})

router.get('/hot', new Auth().m, async (ctx, next) => {
    const books = await HotBook.getAll()
    ctx.body = {
        books
    }
})

module.exports = router
