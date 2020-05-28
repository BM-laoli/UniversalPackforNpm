const express = require('express')
const app = express()





require('./route/admin/index')(app)


app.listen(3001, () => {
    console.log('http://localhost:3001');
})