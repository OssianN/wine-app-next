const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wineList: {
    type: Array,
  },
  columns: {
    type: Number,
  },
  shelves: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const UserDataBase = mongoose.model('users', UserSchema)

module.exports = UserDataBase
