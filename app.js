// 核心库
import Koa from 'koa'
import InitManager from './core/init'

// 辅助库
import chalk from 'chalk'
import config from './config'

const app = new Koa()
const port = config.port

//  初始化
InitManager.initCore(app)

// 启动服务
app.listen(port, () =>
    console.log(
        chalk.blue(`Server Started on ${port}...`)
    )
)
