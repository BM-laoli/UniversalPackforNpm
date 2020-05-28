const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{type:String},
    thumbnails:{type:String},
    body:{type:String},
    hot:{type:Number},

   // 创建时间与更新时间
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    },
    
    // 一篇文章可能同属于多个分类之下
    category:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],

},{
      versionKey: false,//这个是表示是否自动的生成__v默认的ture表示生成
      // 这个就能做到自动管理时间了，非常的方面
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('Article',schema)