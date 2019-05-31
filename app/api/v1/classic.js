const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('@models/flow')
const { Favor } = require('@models/favor')
const { Art } = require('@models/art')
const { PositiveIntegerValidator, LikeValidator } = require('@validators')

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
    const art = await Art.getData(latest.art_id, latest.type, false)
    const status = await Favor.isLike(latest.art_id, latest.type, ctx.auth.uid)
    art.setDataValue('index', latest.index)
    art.setDataValue('like_status', status)
    ctx.body = art
})

/**
* @route   GET /next
* @desc    获取下一期的期刊
* @access  private
*/
router.get('/:index/next', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: { index: index + 1 }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type, false)
    const status = await Favor.isLike(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', status)
    ctx.body = art
})

/**
* @route   GET /previous
* @desc    获取上一期的期刊
* @access  private
*/
router.get('/:index/previous', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: { index: index - 1 }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type, false)
    const status = await Favor.isLike(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', status)
    ctx.body = art
})

/**
* @route   GET /:type/:id
* @desc    获取期刊详情
* @access  private
*/
router.get('/:type/:id', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const art = await Art.getData(id, type, false)
    if (!art) {
        throw new global.errs.NotFound()
    }
    const flow = await Flow.findOne({
        where: { art_id: id }
    })
    const status = await Favor.isLike(id, type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', status)
    ctx.body = art
})

/**
* @route   GET /:type/:id/favor
* @desc    获取期刊点赞信息
* @access  private
*/
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const art = await Art.getData(id, type, false)
    if (!art) {
        throw new global.errs.NotFound()
    }
    const status = await Favor.isLike(id, type, ctx.auth.uid)
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: status
    }
})

module.exports = router
