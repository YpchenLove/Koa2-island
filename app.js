// 核心库
const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/exception')

// 辅助库
const chalk = require('chalk')
const config = require('./config')

const app = new Koa()
const port = config.port

// require('./app/models/user')
// 中间件
app.use(catchError)
app.use(parser())

//  初始化
InitManager.initCore(app)

// 启动服务
app.listen(port, () =>
    console.log(
        chalk.blue(`Server Started on ${port}...`)
    )
)
