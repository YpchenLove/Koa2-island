const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { loginType, classicType } = require('../lib/enum')

// 正整数校验
class PositiveIntegerValidator extends LinValidator {
    constructor () {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', { min: 1 })
        ]
    }
}

// 登录校验
class RegisterValidator extends LinValidator {
    constructor () {
        super()
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.nickname = [
            new Rule('isLength', '昵称至少4个字符，最多16个字符', { min: 4, max: 16 })
        ]
        this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
    }
    // 密码一致
    validatePassword(vals) {
        const pwd1 = vals.body.password1
        const pwd2 = vals.body.password2
        if (pwd1 !== pwd2) {
            throw new Error('两次输入的密码必须相同！')
        }
    }
    // email唯一
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({ where: { email } })
        if (user) throw new Error('email已经存在！')
    }
}

// token校验
class TokenValidator extends LinValidator {
    constructor () {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', { min: 4, max: 32 })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '不符合账号规则', { min: 6, max: 128 })
        ]
    }
    validateLoginType(vals) {
        const type = vals.body.type
        if (!type) {
            throw new Error('type是必填参数')
        }
        if (!loginType.isThisType(parseInt(type))) {
            throw new Error('type参数不合法')
        }
    }
}

// 校验token不能为空
class NotEmptyValidator extends LinValidator {
    constructor () {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

// 点赞校验
class LikeValidator extends PositiveIntegerValidator {
    constructor () {
        super()
        this.validateType = checkType
    }
}

function checkType(vals) {
    const type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type是必填参数')
    }
    if (!classicType.isThisType(parseInt(type))) {
        throw new Error('type参数不合法')
    }
}

// 搜索校验
class SearchValidator extends LinValidator {
    constructor () {
        super()
        this.q = [
            new Rule('isLength', '搜索关键词不能为空', { min: 1, max: 16 })
        ]
        this.start = [
            new Rule('isInt', '需要为正整数', { min: 0, max: 60000 }),
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', '需要为正整数', { min: 0, max: 20 }),
            new Rule('isOptional', '', 20)
        ]
    }
}

// 短评校验
class ShortCommentValidator extends PositiveIntegerValidator {
    constructor () {
        super()
        this.content = [
            new Rule('isLength', '必须在1~12个字之间', { min: 1, max: 12 })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator,
    SearchValidator,
    ShortCommentValidator
}
