const mongoose = require('mongoose')

const requiredString = {
  type: String,
  required: true
}

const userSchema = mongoose.Schema({
  firstName: requiredString,
  lastName: requiredString,
  email: {
    ...requiredString,
    trim: true,
    unique: 1
  },
  password: {
    ...requiredString,
    minlength: 6
  },
  role: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)