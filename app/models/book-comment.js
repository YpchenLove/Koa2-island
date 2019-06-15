const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Comment extends Model {
    // 新增评论
    static async addComment(bookID, content) {
        const comment = await Comment.findOne({
            where: {
                book_id: bookID,
                content
            }
        })
        if (!comment) {
            await Comment.create({
                book_id: bookID,
                content,
                nums: 1
            })
            return 0
        } else {
            await comment.increment('nums', {
                by: 1
            })
            return 1
        }
    }
    // 获取评论
    static async getComment(bookID) {
        const comment = await Comment.findAll({
            where: {
                book_id: bookID
            }
        })
        return comment
    }

    toJSON() {
        return {
            content: this.getDataValue('content'),
            nums: this.getDataValue('nums')
        }
    }
}

Comment.init({
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    book_id: Sequelize.INTEGER
}, {
    sequelize: db,
    tableName: 'comment'
})

module.exports = { Comment }
