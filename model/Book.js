const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    iamge:{type:String},
    name:{type:String},
    body:{type:String},
})

module.exports = mongoose.model('Book',schema)