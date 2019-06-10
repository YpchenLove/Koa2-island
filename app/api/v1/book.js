const Router = require('koa-router')
const { HttpException } = require('../../../core/http-exception')
const { PositiveIntegerValidator, SearchValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { HotBook } = require('@models/hot-book')
const { Book } = require('@models/book')

const router = new Router({
    prefix: '/v1/book'
})

/**
* @route   GET /hot
* @desc    获取热门图书列表
* @access  public
*/
router.get('/hot', async (ctx, next) => {
    const books = await HotBook.getAll()
    ctx.body = {
        books
    }
})

/**
* @route   GET /:id/detail
* @desc    获取图书详情
* @access  public
*/
router.get('/:id/detail', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = new Book(v.get('path.id'))
    ctx.body = await book.detail()
})

/**
* @route   GET /search
* @desc    搜索图书
* @access  public
*/
router.get('/search', async (ctx, next) => {
    const v = await new SearchValidator().validate(ctx)
    const books = await Book.searchFromYushu(v.get('path.q'), v.get('path.start'), v.get('path.count'), v.get('path.summary'))
    ctx.body = books
})
module.exports = router
