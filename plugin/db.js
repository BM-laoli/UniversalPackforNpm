module.exports = app => {
//  使用app有一个好处就是这些项我们都是可以配置的，这个app实际上你写成option也没问题
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/Commet-Tools', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}