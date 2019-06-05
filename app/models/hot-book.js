const { db } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')

class HotBook extends Model {

}

HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize: db,
    tableName: 'hot_book'
})

module.exports = { HotBook }
