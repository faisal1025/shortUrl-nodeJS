const URL = require('../models/urls')
const short = require('shortid')

async function handleGenerateShortUrl(req, res) {
    const body = req.body
    if(!body.url) return res.status(400).json({err : "url is required"})
    const generatedId = short()

    await URL.create({
        shortenId: generatedId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user.id
    })

    const result = await URL.find({createdBy: req.user.id})

    return res.status(201).render("home", {id: generatedId, url: result, user: req.user})
}

async function handelShortUrl(req, res){
    return res.json({msg: "This is shorten url route"})
}

async function handleRedirectUrl(req, res){
    const shortid = req.params.shortid

    const result = await URL.findOneAndUpdate(
        {
            shortenId: shortid
        },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now()
                }
            }
        }
    )

    return res.redirect(result.redirectUrl)
}

async function handleGetAnalyticstUrl(req, res){
    const shortid = req.params.shortid

    const result = await URL.findOne({shortenId: shortid})
    return res.render('analytics', {
        timeVisited: result.visitHistory.length,
        visitAnalytics: result.visitHistory,
        user: req.user
    })
}

async function handleDeleteAnalyticstUrl(req, res){
    const shortid = req.params.shortid

    const result = await URL.findOneAndDelete({shortenId: shortid})
    return res.redirect('/')
}

module.exports = {
    handleGenerateShortUrl,
    handelShortUrl,
    handleRedirectUrl,
    handleGetAnalyticstUrl,
    handleDeleteAnalyticstUrl
}