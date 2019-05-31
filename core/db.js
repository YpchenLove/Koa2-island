const Sequelize = require('sequelize')
const chalk = require('chalk')
const { database } = require('../config')
const { dbName, host, port, user, password } = database

const db = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false, // true/false (process.env.NODE_ENV !== 'production' ? console.log : false)
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        createAt: 'create_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['create_at', 'updated_at', 'deleted_at', 'createAt']
                }
            }
        }
    }
})

db.sync({ force: false })

/*
* 验证是否连接数据库成功
*/
db.authenticate()
    .then((res) => {
        console.log(
            chalk.bgCyan('连接数据库成功!'),
            chalk.bgBlueBright('O(∩_∩)O~~')
        )
    })
    .catch(err => {
        console.error(
            chalk.bgRed(`Error in MySQL connection:${err}`),
            chalk.bgMagentaBright('QAQ')
        )
    })

module.exports = { db }
