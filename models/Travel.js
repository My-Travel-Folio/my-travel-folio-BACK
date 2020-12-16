const mongoose = require('mongoose')
const Schema = mongoose.Schema

const travelSchema = new Schema({
  userID: {type: String},
  travelName: {type: String, required: true},
  startDate: {type: String, required: true},
  endDate: {type: String, required: true},
  startDateFixed: {type: String},
  endDateFixed: {type: String}
})

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel