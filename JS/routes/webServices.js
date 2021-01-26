const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const express = require('express');
const router = express.Router();

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
    const mailOptions = {
        from: email, // sender address
        to: to, // list of receivers
        subject: 'Subject : ' + subject + ' - Name :' + name, // Subject line
        text: message, // plain text body
        html: '<b>' + message + '</b>', // html body
        generateTextFromHTML: true,
    };


    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
});
/*
 * 
 * 
 * 
 * 
 {
  "access_token": "ya29.a0AfH6SMCqOmDfXOuiARf1imYTFJsTcVs6CJhMy39tGQhOJRWDpcz5PF6y_NGICK3FXxfB-PwiJXERyBdsvkoTcblPAQMY1_WGL6ezTx1CLKfZXJ9L-gx-iFHy7KQbJi96azFls5Xrd5puT7TlzwWEFivjrXv-Ux3ol76eW8-MeFo",
  "scope": "https://mail.google.com/",
  "token_type": "Bearer",
  "expires_in": 3599,
  "refresh_token": "1//04BVx3b8EhV_0CgYIARAAGAQSNwF-L9IrdQYCORmA2spkKVUjd2h2_22s4ARxsulmXx84YHOyU_r4tcHw0WOLhwxEQtFC-KPR_4s"
}
clientid: 643240895475-3n8sh6flr32fdvie3uuk88ei6qd3eifh.apps.googleusercontent.com
secrete: ZMtf-MuhhiUaccUqBSndRLb7
*/

router.post('/sendEmail2', function (req, res, next) {

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    var email = req.body.email;
    var to = 'smithdavedesign@gmail.com'
    var subject = req.body.subject;
    var name = req.body.name;
    var message = req.body.message;
    console.log(req.body)
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter =
        nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'smithdavedesign@gmail.com', // generated ethereal user
            pass: 'Ginger123!', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: email, // sender address
        to: to, // list of receivers
        subject: 'Subject : ' + subject + ' - Name :' + name, // Subject line
        text: message, // plain text body
        html: '<b>'+message + '</b>', // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

    main().catch(console.error).then(() => {
        if (err) {
            return err;
        }
        else
            return 'sent'
    })

})
module.exports = router;
