import { LinValidator, Rule } from '../../core/Lin-validator'

class PositiveIntegerValidator extends LinValidator {
    constructor () {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', { min: 3 })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator
}