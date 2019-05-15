import Router from 'koa-router'
import { HttpException, ParameterException } from '../../../core/http-exception'
import { PositiveIntegerValidator } from '../../validators/validator'
const router = new Router()

router.get('/v1/book/:id', (ctx, next) => {
    const v = new PositiveIntegerValidator().validate(ctx)
})

module.exports = router
