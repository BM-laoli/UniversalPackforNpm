module.exports = app => {
    const resourceMiddelWeare = require('../../middleware/resource')
    const multer = require('multer')
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    //测试接口
    router.get('/test', async(req, res) => {
        res.status(200).send({ message: '测试通过' })
    })



    //=====>CRUD接口

    router.post('/', async(req, res) => {

        const model = await req.Model.create(req.body)
        res.send(model)

    })

    // 单一个get不带参数表示-------> 查 （把资源里的都查出来）
    router.get('/', async(req, res) => {

        const queryOptions = {}
        if (req.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    //get带参数表示-------> 指定条件的查
    router.get('/:id', async(req, res) => {
        //我们的req.orane里面就又东
        console.log(req.params.id);
        const items = await req.Model.findById(req.params.id)
        res.send(items)
    })

    // put带参数表示-------> 更新某个指定的资源数据
    router.put('/:id', async(req, res) => {
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })

    // deldete带参数表示------> 删除指定的资源数据
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            sucees: true
        })
    })

    app.use('/api/rest/:resource', resourceMiddelWeare(), router)

    //=====> CRUD接口实现结束


    //=====> 文件上传功能
    const upload = multer({ dest: __dirname + '/../../uploads' });

    // 注意到了，我们上传文件的时候不需要token验证
    app.post('/api/upload', upload.single('file'), async(req, res) => {
        console.log('开始发送请求');
        const file = req.file;
        file.url = `http://localhost:3001/uploads/${file.filename}`
        res.send(file)
    })


}