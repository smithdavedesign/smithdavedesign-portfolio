var settings = require("./JS/config/settings");// get all things from settings we need
const express = require('express');//web framework for node
const expressLayouts = require('express-ejs-layouts');// ejs view engine
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const util = require('util');
const https = require('https');
const http = require('http');
const ejs = require('ejs');
var PORT = process.env.PORT || 5000;
/////////////////////////////////////////////////////////////
const fs = require('fs');
/////////////////////////////////////////////////////////////

const app = express();//create instance of express

//Express middle ware
app.set('view engine', 'ejs');//view engine
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use(express.static('views/public'));
app.use(express.static('views/CSS'));
app.use(express.static('JS'));
app.use(express.static('JS/scripts'));
app.use('/static', express.static('JS/scripts'));//example href = /static/filename
app.use('/static', express.static('public'));
app.use(express.static("."));

//routes
app.use('/', require('./JS/routes/renderRoutes'));
//app.use('/', require('./JS/routes/webServices'));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var httpPort = settings.webPort;//not using, for dev
app.listen(PORT, function () {
    console.log('Started http listener on port: ', PORT);
})
