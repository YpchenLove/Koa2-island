const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class user extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
},{
    sequelize: db, 
    tableName: 'user'
})