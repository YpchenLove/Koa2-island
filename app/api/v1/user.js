const Router = require('koa-router')

const { HttpException } = require('../../../core/http-exception')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        nickname: v.get('body.nickname'),
        password: v.get('body.password2')
    }
    const r = await User.create(user)
})

module.exports = router
