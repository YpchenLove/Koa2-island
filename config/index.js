const config = {
    environment: 'dev',
    port: process.env.PORT || 3000, // 端口号
    database: {
        dbName: 'island',
        host: 'localhost',
        part: 3306,
        user: 'root',
        password: ''
    },
    security: {
        secretKey: 'yangpengcheng19950215',
        expiresIn: 60 * 60 * 24 * 30
    },
    wx: {
        AppID: 'wx83fc633e9309479f',
        AppSecret: '3d3bd227abc6ec51f58905e335c8f295',
        loginUrl: `https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code`
    },
    yushu: {
        detailUrl: `http://t.yushu.im/v2/book/id/%s`,
        keywordUrl: `http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s`
    }
}

module.exports = config
