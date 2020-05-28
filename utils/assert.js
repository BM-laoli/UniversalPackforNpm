module.exports = {
    assert(value, status, msg, next) {
        const asserts = require('http-assert')
        try {
            asserts(value, status, msg)
        } catch (error) {
            next(error)
        }
    }
}