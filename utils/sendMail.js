const nodemailer = require('nodemailer');


const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD
        }
    });
    transporter.verify(function (error, success) {

        if (error) throw error;

        console.log('Nodemailer connected');

    });
    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)
}

module.exports = sendEmail;