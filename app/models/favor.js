const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')

class Favor extends Model {
    // 点赞
    static async like(artId, type, uid) {
        const favor = await Favor.findOne({
            where: { art_id: artId, type, uid }
        })
        if (favor) {
            throw new global.errs.LikeError()
        }
        // 事务
        return db.transaction(async t => {
            await Favor.create({ art_id: artId, type, uid }, { transaction: t })
            const art = await Art.getData(artId, type)
            await art.increment('fav_nums', { by: 1, transaction: t })
        })
    }

    // 取消点赞
    static async dislike(artId, type, uid) {
        const favor = await Favor.findOne({
            where: { art_id: artId, type, uid }
        })
        if (!favor) {
            throw new global.errs.DisLikeError()
        }
        // 事务
        return db.transaction(async t => {
            await favor.destroy({ force: true }, { transaction: t })
            const art = await Art.getData(artId, type)
            await art.increment('fav_nums', { by: -1, transaction: t })
        })
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize: db,
    tableName: 'favor'
})

module.exports = { Favor }
