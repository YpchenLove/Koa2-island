const Router = require('koa-router')

const { Success } = require('../../../core/http-exception')
const { TokenValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const { loginType } = require('../../lib/enum')
const { generateToken } = require('../../../core/util')
const router = new Router({
    prefix: '/v1/token'
})

/**
* @route   GET /
* @desc    获取token
* @access  public
*/
router.post('/', async (ctx, next) => {
    const v = await new TokenValidator().validate(ctx)
    let token
    switch (v.get('body.type')) {
    case loginType.USER_EMAIL:
        token = await eamilLogin(v.get('body.account'), v.get('body.secret'))
        break
    // case loginType.USER_MOBILE:
    //     break
    // case loginType.USER_EMAIL:
    //     break
    default:
        throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        msg: '获取token成功！',
        error_code: 10000,
        token
    }
})

async function eamilLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    const token = generateToken(user.id, 2)
    return token
}

module.exports = router
