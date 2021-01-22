const express = require('express');
const router = express.Router();


router.get('/landingPage', function (req, res, next) {//landing page
    res.render('srcpages/landingPage');
});


router.get('/portfolio', function (req, res, next) {//landing page
    res.render('srcpages/work');
});

router.get('/mountain', function (req, res, next) {//landing page
    res.render('srcpages/mountain');
});

router.get('/', function (req, res) {
    res.render('srcpages/landingPage');
});

router.get('/bio', function (req, res) {
    res.render('srcpages/bio');
});

module.exports = router;
