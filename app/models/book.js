const util = require('util')
const axios = require('axios')
const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Book extends Model {
    constructor(id) {
        super()
        this.id = id
    }
    async detail() {
        const url = util.format(global.config.yushu.detailUrl, this.id)
        const detail = await axios.get(url)

        return detail.data
    }

    // 搜索书籍
    static async searchFromYushu(q, start, count, summary = 1) {
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), start, count, summary)
        console.log(url)
        const list = await axios.get(url)
        return list.data
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        default: 0
    }
}, {
    sequelize: db,
    tableName: 'book'
})

module.exports = { Book }
