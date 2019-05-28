const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')

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
    const art = await Art.getData(latest.artId, latest.type)
    art.setDataValue('index', latest.index)
    ctx.body = art
})

module.exports = router
