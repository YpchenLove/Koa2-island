const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

// base
const classicFields = {
    image: Sequelize.STRING,        // 图片路径
    content: Sequelize.STRING,      // 内容
    title: Sequelize.STRING,        // 标题
    fav_nums: {
        type: Sequelize.INTEGER,
        default: 0
    },                              // 喜欢的人数
    pubdate: Sequelize.DATEONLY,    // 发布日期
    type: Sequelize.TINYINT         // 类型
}

// 电影
class Movie extends Model {

}

Movie.init(classicFields, {
    sequelize: db,
    tableName: 'movie'
})

// 句子
class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize: db,
    tableName: 'sentence'
})

// 音乐
class Music extends Model {

}

const musicFields = Object.assign(classicFields, {
    url: Sequelize.STRING
})

Music.init(musicFields, {
    sequelize: db,
    tableName: 'music'
})

module.exports = { Movie, Sentence, Music }
