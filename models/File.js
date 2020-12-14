const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
  travelID: {type: String},
  fileName: {type: String, required: true},
  imageUrl: {type: String, required: true},
  category: {type: String, default: 'Other'},
  comment: {type: String},
  date: {type: String, required: true},
  fixedDate: {type: String, required: true}
})

const File = mongoose.model('File', fileSchema)

module.exports = File