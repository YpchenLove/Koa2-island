import Router from 'koa-router'
import { HttpException } from '../../../core/http-exception'
const router = new Router()

router.get('/v1/book', (ctx, next) => {

    if (true) {
        const error = new HttpException('服务器异常', 10001, 400)
        throw error
    }

    ctx.body = {
        key: 12312
    }
})

module.exports = router
