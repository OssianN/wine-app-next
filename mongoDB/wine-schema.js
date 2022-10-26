const mongoose = require('mongoose')
const { Schema } = mongoose

const wineSchema = new Schema({
  title: { type: String },
  country: { type: String },
  year: { type: Number },
  comment: { type: String },
  shelf: { type: Number },
  column: { type: Number },
  archived: { type: Boolean },
  img: { type: String },
  rating: { type: String },
  price: { type: String },
  vivinoUrl: { type: String },
})

const WineDataBase = mongoose.model('wines', wineSchema)

module.exports = WineDataBase
