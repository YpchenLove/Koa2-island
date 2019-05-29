const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Favor extends Model {

    // 点赞
    static async like(art_id, type) {
        
    }

    // 取消点赞
    static async dislike(art_id, type) {
        
    }
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
