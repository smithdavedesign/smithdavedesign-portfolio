const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('srcpages/portfolio', { title: 'Portfolio', layout: 'layout-portfolio' });
});

router.get('/david-smith', function (req, res, next) {
    res.render('srcpages/portfolio', { title: 'Portfolio', layout: 'layout-portfolio' });
});


router.get('/v2/', function (req, res, next) {
    res.render('srcpages/landingPage', { title: 'PortfolioV2', layout: 'layout' });
});

router.get('/v2/landingPage', function (req, res, next) {
    res.render('srcpages/landingPage', { title: 'PortfolioV2', layout: 'layout' });
});


router.get('/v2/portfolio', function (req, res, next) {
    res.render('srcpages/work', { title: 'PortfolioV2', layout: 'layout' });
});

router.get('/v2/bio', function (req, res) {
    res.render('srcpages/bio', { title: 'PortfolioV2', layout: 'layout' });
});

// V1 – The Creative Origin (oldest portfolio, formerly at /v3/)
router.get('/v1/', function (req, res) {
    res.render('srcpages/landingPageV3', { title: 'PortfolioV1', layout: 'layoutV3' });
});

router.get('/v1/landingPage', function (req, res, next) {
    res.render('srcpages/landingPageV3', { title: 'PortfolioV1', layout: 'layoutV3' });
});

router.get('/v1/portfolio', function (req, res, next) {
    res.render('srcpages/portfolioV3', { title: 'PortfolioV1', layout: 'layoutV3' });
});

// V3 – Full-Stack Integration (main portfolio)
router.get('/v3/', function (req, res) {
    res.render('srcpages/portfolio', { title: 'Portfolio', layout: 'layout-portfolio' });
});

router.get('/v3/landingPage', function (req, res, next) {
    res.render('srcpages/portfolio', { title: 'Portfolio', layout: 'layout-portfolio' });
});


// V4 – The AI Orchestrator
router.get('/v4/', function (req, res) {
    res.render('srcpages/landingPageV4', { title: 'PortfolioV4', layout: 'layoutV4' });
});

router.get('/v4/landingPage', function (req, res, next) {
    res.render('srcpages/landingPageV4', { title: 'PortfolioV4', layout: 'layoutV4' });
});

// Resume
router.get('/resume', function (req, res) {
    res.render('srcpages/resume', { title: 'Resume — David George Smith', layout: 'layout-resume' });
});
router.get('/v3/resume', function (req, res) {
    res.render('srcpages/resume', { title: 'Resume — David George Smith', layout: 'layout-resume' });
});
router.get('/v4/resume', function (req, res) {
    res.render('srcpages/resume', { title: 'Resume — David George Smith', layout: 'layout-resume' });
});

module.exports = router;
