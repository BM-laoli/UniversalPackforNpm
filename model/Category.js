const mongoose = require('mongoose')

const schema = new  mongoose.Schema({
    title:{type:String},
    thumbanils:{type:String},
    
    //父分类,一篇文章，我们假设一个文章能有一个父分类,一个栏目（书籍）
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
    book:{type:mongoose.SchemaTypes.ObjectId,ref:'Book'}



});

module.exports =  mongoose.model('Category', schema);
