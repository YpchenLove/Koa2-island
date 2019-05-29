const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Favor extends Model {

}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
}, {
    sequelize: db,
    tableName: 'favor'
})


module.exports = { Favor }
