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
        expiresIn: 60 * 60
    }
}

module.exports = config
