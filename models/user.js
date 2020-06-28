const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv5 = require('uuid/v5')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  last_name: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  user_info: {
    type: String,
    trim: true,
  },
  // TODO: CoMe BaCk here this is critical
  enc_password: {
    type: String,
    required: true,
  },
  // ! SALT is very important 😁
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
})

// ? Virutuals for schema
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv5()
    this.enc_password = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

// ? schema methods
userSchema.method = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.enc_password
  },
  securePassword: function (plainPassword) {
    if (!password) {
      return ''
    }
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
}

module.exports = mongoose.model('User', userSchema)
