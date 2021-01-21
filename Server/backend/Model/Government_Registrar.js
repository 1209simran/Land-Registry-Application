var mongoose = require('mongoose')

var govtSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  city: { type: String, required: true },
})

module.exports = mongoose.model('govtOffices', govtSchema)
