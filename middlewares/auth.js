const { getToken } = require("../services/auth")


async function restrictLoggedIn(req, res, next){
    const token = req.cookies?.token
   
    if(!token) return res.redirect("/user/login")
    const user = await getToken(token)

    if(!user) return res.redirect("/user/login")
    req.user = user
   
    next()
}

async function isLoggedIn(req, res, next){
    const token = req.cookies?.token
    req.token = token
    next()
}

module.exports = {
    restrictLoggedIn,
    isLoggedIn
}
