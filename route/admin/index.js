module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    //测试接口
    router.get('/test', async(req, res) => {
        res.status(200).send({ message: '测试通过' })
    })

    app.use('/api', router)

}