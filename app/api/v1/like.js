const Router = require('koa-router')
const { Success } = require('../../../core/http-exception')
const { LikeValidator } = require('@validators')
const { Auth } = require('../../../middlewares/auth')
const { Favor } = require('@models/favor')

const router = new Router({
    prefix: '/v1/like'
})

/**
* @route   POST /
* @desc    点赞
* @access  private
*/
router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, { id: 'art_id' })
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    throw new Success()
})

/**
* @route   POST /
* @desc    取消点赞
* @access  private
*/
router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, { id: 'art_id' })
    await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    throw new Success()
})

module.exports = router
