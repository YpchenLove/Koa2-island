const { LinValidator, Rule } = require('../../core/Lin-validator')

// 正整数校验
class PositiveIntegerValidator extends LinValidator {
    constructor () {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', { min: 3 })
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
        this.password1 = [
            new Rule('isLength', '密码至少4个字符，最多16个字符', { min: 6, max: 16 }),
            new Rule('matches', '密码不符合规范', { min: 6, max: 16 })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator
}
