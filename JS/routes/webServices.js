const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const express = require('express');
const router = express.Router();

//this route uses google api tokens that i have setup
router.post('/sendEmail', function (req, res, next) {
    var email = req.body.email;
    var to = 'smithdavedesign@gmail.com'
    var subject = req.body.subject;
    var name = req.body.name;
    var message = req.body.message;

    const oauth2Client = new OAuth2(
        "643240895475-3n8sh6flr32fdvie3uuk88ei6qd3eifh.apps.googleusercontent.com", // ClientID
        "ZMtf-MuhhiUaccUqBSndRLb7", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );
    oauth2Client.setCredentials({
        refresh_token: "1//04BVx3b8EhV_0CgYIARAAGAQSNwF-L9IrdQYCORmA2spkKVUjd2h2_22s4ARxsulmXx84YHOyU_r4tcHw0WOLhwxEQtFC-KPR_4s"
    });
    const accessToken = oauth2Client.getAccessToken()

    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "smithdavedesign@gmail.com",
            clientId: "643240895475-3n8sh6flr32fdvie3uuk88ei6qd3eifh.apps.googleusercontent.com",
            clientSecret: "ZMtf-MuhhiUaccUqBSndRLb7",
            refreshToken: "1//04BVx3b8EhV_0CgYIARAAGAQSNwF-L9IrdQYCORmA2spkKVUjd2h2_22s4ARxsulmXx84YHOyU_r4tcHw0WOLhwxEQtFC-KPR_4s",
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    message = 'From : ' + email + '  Message : ' + message;
    const mailOptions = {
        from: email, // sender address
        to: to, // list of receivers
        subject: 'Subject : ' + subject + ' - Name :' + name, // Subject line
        text: message, // plain text body
        html: '<b>' + message + '</b>', // html body
        generateTextFromHTML: true,
    };

   return smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    })

});


module.exports = router;
