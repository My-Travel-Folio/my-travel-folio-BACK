const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
  travelID: {type: Schema.Types.ObjectId},
  fileName: {type: String, required: true},
  imageUrl: {type: String, required: true},
  category: {type: String, required: true},
  comment: {type: String},
  date: {type: String, required: true},
})

const File = mongoose.model('File', fileSchema)

module.exports = File