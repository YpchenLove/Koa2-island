const Sequelize = require('sequelize')
const { database } = require('../config')
const { dbName, host, user, password } = database

const db = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid: true,
        createAt: 'create_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true
    }
})

db.sync()

module.exports = { db }