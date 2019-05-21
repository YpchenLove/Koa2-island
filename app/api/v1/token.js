const Router = require('koa-router')

const { Success } = require('../../../core/http-exception')
const { TokenValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

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
    console.log(v.get('body.type'), 111)
})

module.exports = router
