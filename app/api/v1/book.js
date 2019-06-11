const Router = require('koa-router')
const { HttpException } = require('../../../core/http-exception')
const { PositiveIntegerValidator, SearchValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { HotBook } = require('@models/hot-book')
const { Book } = require('@models/book')
const { Favor } = require('@models/favor')

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
    const books = await Book.searchFromYushu(v.get('query.q'), v.get('query.start'), v.get('query.count'))

    ctx.body = books
})

/**
* @route   GET /favor/count
* @desc    获取我喜欢的书籍的数量
* @access  private
*/
router.get('/favor/count', new Auth().m, async (ctx, next) => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)

    ctx.body = {
        count
    }
})

/**
* @route   GET /:book_id/favor
* @desc    书籍点赞情况
* @access  private
*/
router.get('/:book_id/favor', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { id: 'book_id' })
    const favor = await Favor.getMyFavorBook(v.get('path.book_id'), ctx.auth.uid)
    ctx.body = favor
})

module.exports = router
