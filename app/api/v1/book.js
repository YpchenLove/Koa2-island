import Router from 'koa-router'
import { HttpException, ParameterException } from '../../../core/http-exception'
import { PositiveIntegerValidator } from '../../validators/validator'
const router = new Router()

router.get('/v1/book/:id', (ctx, next) => {

    const v = new PositiveIntegerValidator().validate(ctx)
    // const a = v.get('ctx.params.id')
    console.log(ctx.params.id)
    ctx.body = { a: 234}
})

module.exports = router
