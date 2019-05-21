const bcrypt = require('bcryptjs')

const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model {
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
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val, salt)
            this.setDataValue('password', pwd)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize: db,
    tableName: 'user'
})

module.exports = { User }
