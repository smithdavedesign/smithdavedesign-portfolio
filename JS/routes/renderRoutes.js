const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('srcpages/portfolio', { title: 'Portfolio', layout: 'layout-portfolio' }); 
});

router.get('/david-smith', function (req, res, next) {
    res.render('srcpages/portfolio', { title: 'Portfolio', layout: 'layout-portfolio' }); 
});


router.get('/v2/', function (req, res, next) {
    res.render('srcpages/landingPage',{ title: 'PortfolioV2', layout: 'layout' });
});

router.get('/v2/landingPage', function (req, res, next) {
    res.render('srcpages/landingPage',{ title: 'PortfolioV2', layout: 'layout' });
});


router.get('/v2/portfolio', function (req, res, next) {
    res.render('srcpages/work',{ title: 'PortfolioV2', layout: 'layout' });
});

router.get('/v2/bio', function (req, res) {
    res.render('srcpages/bio',{ title: 'PortfolioV2', layout: 'layout' });
});


module.exports = router;
