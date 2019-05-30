const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('@models/flow')
const { Favor } = require('@models/favor')
const { Art } = require('@models/art')

const router = new Router({
    prefix: '/v1/classic'
})

/**
* @route   GET /latest
* @desc    获取最新一期的期刊
* @access  private
*/
router.get('/latest', new Auth().m, async (ctx, next) => {
    const latest = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(latest.art_id, latest.type)
    const status = await Favor.isLike(latest.art_id, latest.type, ctx.auth.uid)
    art.setDataValue('index', latest.index)
    art.setDataValue('like_status', status)
    ctx.body = art
})

module.exports = router
