// 我们希望中间件可以配置，这样我们就可以高阶函数
module.exports = Option=>{
    return async(req, res, next) => {
        const inflection = require('inflection')

        //转化成单数大写的字符串形式
        let moldeName = inflection.classify(req.params.resource)
        console.log(moldeName); //categorys ===> Category
        //注意这里的关联查询populate方法，里面放的就是一个要被关联的字段
        req.Model = require(`../model/${moldeName}`)
        req.modelNmae = moldeName
        next()
    }
} 

