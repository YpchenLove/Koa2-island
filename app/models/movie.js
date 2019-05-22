const bcrypt = require('bcryptjs')

const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model {

    // 验证账号
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: { email }
        })
        if (!user) {
            throw new global.errs.AuthFailed('账号不存在！')
        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确！')
        }
        return user
    }

    // 查询openid
    static async getUserByOpenid (openid) {
        const user = await User.findOne({
            where: { openid }
        })
        return user
    }

    // 注册openid
    static async registerByOpenid (openid) {
        const user = await User.create({
            where: { openid }
        })
        return user
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,        // 标题
    content: Sequelize.STRING,      // 内容
    fav_nums: Sequelize.INTEGER,    // 喜欢的人数
    like_status: Sequelize.INTEGER, // 是否喜欢
    type: Sequelize.INTEGER,        // 100 类型电影
}, {
    sequelize: db,
    tableName: 'movie'
})

module.exports = { User }
