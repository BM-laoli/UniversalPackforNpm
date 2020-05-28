module.exports = options => {
    const { assert } = require('../utils/assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../model/AdminUser')

    return async(req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录', next)
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录', next)
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录', next)
        await next()
    }
}