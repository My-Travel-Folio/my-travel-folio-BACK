const mongoose = require('mongoose')
const Schema = mongoose.Schema

const travelSchema = new Schema({
  userID: {type: Schema.Types.ObjectId},
  travelName: {type: String, required: true},
  startDate: {type: String, required: true},
  finishDate: {type: String, required: true},
})

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel