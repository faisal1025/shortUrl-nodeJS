const User = require("../models/users")
const {setToken} = require('../services/auth')

async function handleGetRegister(req, res){
    return res.render('register', {user: req.user})
}

async function handleGetLogin(req, res){
    return res.render('login', {user: req.user})
}

async function handlePostRegister(req, res){
    var {name, email, password} = req.body
 
    const result = await User.create({
       name,
       email,
       password
    })
    return res.redirect("/user/login")
}

async function handlePostLogin(req, res){
    var {email, password} = req.body
 
    const user = await User.findOne({email: email, password: password})

    if(!user){
        return res.status(400).render('login', {
            msg: "User email or password is wrong",
            user: req.user
        })
    }

    const token = await setToken(user);
    res.cookie("token", token)
    return res.redirect('/')
}


module.exports = {
    handleGetRegister,
    handlePostRegister,
    handlePostLogin,
    handleGetLogin
}