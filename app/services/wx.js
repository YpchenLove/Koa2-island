const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { wx } = require('../../config')
const { Auth } = require('../../middlewares/auth')

class WXManager {
    // code 换取 token
    static async codeToToken (code) {
        const url = util.format(wx.loginUrl, wx.AppID, wx.AppSecret)
        const result = await axios.get(url)

        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败！')
        }
        const errcode = result.data.errcode
        if (errcode !== 0) {
            throw new global.errs.AuthFailed(`${errcode}：${result.data.errmsg}`)
        }

        let user = await User.getUserByOpenid(result.data.openid)

        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }

        return generateToken(user.id, Auth.USER)
    }

    
}

module.exports = { WXManager }