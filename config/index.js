const config = {
    environment: 'dev',
    port: process.env.PORT || 3000, // 端口号
    database: {
        dbName: 'island',
        host: 'localhost',
        part: 3306,
        user: 'root',
        password: ''
    }
}

module.exports = config
