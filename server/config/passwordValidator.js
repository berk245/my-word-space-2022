const validator = require('password-validator')

const passwordSchema = new validator()

passwordSchema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().not().spaces()

module.exports = passwordSchema