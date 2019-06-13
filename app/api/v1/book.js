const Router = require('koa-router')
const { Success } = require('../../../core/http-exception')
const { PositiveIntegerValidator, SearchValidator, ShortCommentValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { HotBook } = require('@models/hot-book')
const { Book } = require('@models/book')
const { Comment } = require('@models/book-comment')
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

/**
* @route   POST /add/short_comment
* @desc    增加书籍短评
* @access  private
*/
router.post('/add/short_comment', new Auth().m, async (ctx, next) => {
    const v = await new ShortCommentValidator().validate(ctx, { id: 'book_id' })
    const result = await Comment.addComment(v.get('body.book_id'), v.get('body.content'))
    const msg = result ? '有相同评论，评论数+1' : '新增成功！'
    throw new Success(msg)
})

/**
* @route   GET /short_comment/:book_id
* @desc    获取书籍短评
* @access  public
*/
router.get('/:book_id/short_comment', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { id: 'book_id' })
    const comment = await Comment.getComment(v.get('path.book_id'))
    if (!comment) {
        throw new global.errs.NotFound()
    }
    ctx.body = {
        comment
    }
})

/**
* @route   GET /short_comment/hot
* @desc    获取书籍短评
* @access  public
*/
router.get('/hot_keyword', async (ctx, next) => {
    ctx.body = [
        'PDD',
        '卢姥爷',
        '芜湖大司马',
        '正方形打野'
    ]
})

module.exports = router
