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
            break
        default:
            break
        }
        return art
    }
}

module.exports = { Art }
