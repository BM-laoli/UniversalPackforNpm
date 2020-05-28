const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    body:{type:String},
    isPublic:{type:Boolean}

})

module.exports = mongoose.model('Conment',schema)