const { Op } = require('sequelize')
const { flatten } = require('lodash')
const { Movie, Music, Sentence } = require('../models/classic')

class Art {
    // 获取数据
    static async getData(artId, type, useScope) {
        const finder = {
            where: { id: artId }
        }
        let art = null
        const scope = useScope ? 'bh' : null
        switch (type) {
        case 100:
            art = await Movie.scope(scope).findOne(finder)
            break
        case 200:
            art = await Music.scope(scope).findOne(finder)
            break
        case 300:
            art = await Sentence.scope(scope).findOne(finder)
            break
        case 400:
            const { Book } = require('./book')
            art = await Book.scope(scope).findOne(finder)
            if (!art) {
                art = await Book.create({
                    id: artId
                })
            }
            break
        default:
            break
        }
        // if (art && art.image) {
        //     let imgUrl = art.dataValues.image
        //     art.dataValues.image = global.config.host + imgUrl
        // }
        return art
    }

    // 获取数组
    static async getList(list) {
        const obj = {
            100: [],
            200: [],
            300: []
        }
        let arts = []
        for (const artInfo of list) {
            obj[artInfo.type].push(artInfo.art_id)
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const ids = obj[key]
                if (!ids.length) {
                    continue
                }
                arts.push(await Art._getListByType(ids, parseInt(key)))
            }
        }
        return flatten(arts)
    }

    // 根据type获取list
    static async _getListByType(ids, type) {
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        let arts = null
        const scope = 'bh'
        switch (type) {
        case 100:
            arts = await Movie.scope(scope).findAll(finder)
            break
        case 200:
            arts = await Music.scope(scope).findAll(finder)
            break
        case 300:
            arts = await Sentence.scope(scope).findAll(finder)
            break
        case 400:
            break
        default:
            break
        }
        return arts
    }
}

module.exports = { Art }
