import requireDirectory from 'require-directory'
import Router from 'koa-router'

class InitManager {
    // 入口方法
    static initCore(app) {
        InitManager.app = app
        InitManager.initLoadRouters()
    }

    // 配置路由
    static initLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`
        const whenLoadModule = (obj) => {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
        requireDirectory(module, apiDirectory, { visit: whenLoadModule })
    }
}

export default InitManager
