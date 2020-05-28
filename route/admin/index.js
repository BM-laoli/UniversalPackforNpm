module.exports = app => {
    const resourceMiddelWeare = require('../../middleware/resource')
    const authMiddelWear = require('../../middleware/auth')
    const { assert } = require('../../utils/assert')

    const AdminUser = require('../../model/AdminUser')
    const jwt = require('jsonwebtoken')
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
        res.send({ changeData: items })
    })

    // deldete带参数表示------> 删除指定的资源数据
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            sucees: true
        })
    })

    app.use('/api/rest/:resource', resourceMiddelWeare(), authMiddelWear(), router)

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


    // =====> 注册登录加邮箱验证，Token下发以及验证

    // 邮箱验证模块
    let email_code = ''
    app.get('/api/getcode/:email', async(req, res) => {
        const { send } = require('../../middleware/mail')
        const { getRandom } = require('../../utils/getRandomNumber')
        email_code = getRandom(1000, 9999)
        await send(req.params.email, email_code)

        res.status(200).send({ message: "验证码已经下发，请注意查收" })
    })

    // 进行邮箱验证
    let isEmailVali = false
    app.get('/api/autucode/:code', async(req, res) => {
        if (req.params.code == email_code) {
            isEmailVali = !isEmailVali

            res.status(200).send({ message: "邮箱验证通过" })
        } else {
            isEmailVali = false

            res.status(422).send({ message: "邮箱验证码错误" })
        }
    })



    app.post('/api/registered', async(req, res) => {
        if (isEmailVali) {
            isEmailVali = false
            email_code = ''
            const model = await AdminUser.create(req.body)
            res.send(model)
        } else {
            res.status(422).send({ message: "请填写正确的邮箱验证码" })
        }
    })



    app.use('/api/login', async(req, res, next) => {
        const { username, password } = req.body
        const user = await AdminUser.findOne({ username: username }).select('+password')


        console.log('用户是：' + user);
        assert(user, 422, '用户不存在', next)
            // if (!user) {
            //     return res.status(422).send({ message: '用户不存在' })
            // }

        const isValid = require('bcrypt').compareSync(password, user.password)

        assert(isValid, 422, '密码错误', next)


        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))

        res.send({ token })

    })


    // 错误处理中间件,统一的处理我们http-assart抛出的错误
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}