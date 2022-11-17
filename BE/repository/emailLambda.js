const AWS = require('aws-sdk');
const SES = new AWS.SES();

const senderEmail = '96raghavsharma@gmail.com';

const emailBody = (userName, link) => {
    return `<html><head><title>Your Token</title><style>h1{color:#f00;}</style></head><body><h1>Hello ${userName},</h1><div>Your Email Validation Link is ${link}<br/>Simply copy this token and paste it into the device validation input field.</div></body></html>`
}

async function SendVerificationEmail(recipientEmail, recipientName, verificationLink) {
    let emailSubject = 'Email Verification for VacayPooling Account'
    const params = {
        Source: senderEmail,
        Destination: {
            ToAddresses: [recipientEmail]
        },
        Message: {
            Subject: { Data: emailSubject },
            Body: { Html: { Data: emailBody(recipientName, verificationLink) } }
        }
    };
    try {
        await SES.sendEmail(params).promise();
    } catch (e) {
        console.error(e);
        throw e;
    }

}

exports.handler = async event => {
    console.log("Email Event" + event);

    const email = event.email;
    const userName = event.userName;
    const verificationLink = event.verificationLink;
    console.log("email: ", email, ", userName: ", userName);

    let response = { success: '', error: '' };
    try {
        await SendVerificationEmail(email, userName, verificationLink);
    } catch (e) {
        console.log(e);
    }

    return { statusCode: 200, body: {} };
};