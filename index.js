const express = require('express')
const app = express()

const cors = require('cors')
    // 跨域解决方案
app.use(cors())

// POST解决方案
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// 文件上传的文件夹模块配置（或者说，静态文件的解决方案）
app.use('/uploads', express.static(__dirname + '/uploads')) //静态路由



require('./route/admin/index')(app)


app.listen(3001, () => {
    console.log('http://localhost:3001');
})