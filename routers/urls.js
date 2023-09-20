const express = require('express');
const { handleGenerateShortUrl, handelShortUrl, handleRedirectUrl, handleGetAnalyticstUrl, handleDeleteAnalyticstUrl } = require('../controllers/urls');
const URL = require('../models/urls');

const routes = express.Router()

routes.route('/').post(handleGenerateShortUrl)
routes.get('/:shortid', handleRedirectUrl)
routes.get('/analytics/:shortid', handleGetAnalyticstUrl)
routes.get('/delete/:shortid', handleDeleteAnalyticstUrl)

module.exports = routes