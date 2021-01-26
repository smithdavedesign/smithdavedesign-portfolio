const nodemailer = require("nodemailer");
const express = require('express');

const router = express.Router();

router.post('/sendEmail', function (req, res, next) {

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
