const express = require('express');
const router = express.Router();


router.get('/landingPage', function (req, res, next) {//landing page
    res.render('srcpages/landingPage');
});


router.get('/work', function (req, res, next) {//landing page
    res.render('srcpages/work');
});


router.get('/', function (req, res) {
    res.render('srcpages/landingPage');
});

module.exports = router;
