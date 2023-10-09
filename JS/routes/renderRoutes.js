const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('srcpages/portfolio', { title: 'Portfolio', layout: 'layout-portfolio' }); 
});

// new portfolio render routes
// use new layout 
router.get('/david-smith', function (req, res, next) {
    res.render('srcpages/portfolio', { title: 'Portfolio', layout: 'layout-portfolio' }); 
});

/*
router.get('/landingPage', function (req, res, next) {
    res.render('srcpages/landingPage');
});


router.get('/portfolio', function (req, res, next) {
    res.render('srcpages/work');
});

router.get('/bio', function (req, res) {
    res.render('srcpages/bio');
});
*/


module.exports = router;
