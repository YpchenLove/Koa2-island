import { HttpException } from '../core/http-exception'

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(error, HttpException)
        if (error instanceof new HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }
    }
}

module.exports = catchError