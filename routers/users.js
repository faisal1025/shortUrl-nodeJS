const express = require('express')
const { handleGetRegister, handlePostRegister, handleGetLogin, handlePostLogin } = require('../controllers/users')
const {restrictLoggedIn} = require('../middlewares/auth')
const router = express.Router()

router.route('/register').get(handleGetRegister).post(handlePostRegister)
router.route('/login').get(handleGetLogin).post(handlePostLogin)
router.get('/logout', restrictLoggedIn, (req, res) => {
    res.clearCookie("token")
    req.user = undefined
    return res.redirect('/user/login')
})

module.exports = router