import AWS from 'aws-sdk';


const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: 'us-west-2'
})

let lambda = new AWS.Lambda();

export const sendEmail = async (user, link) => {
    var params = {
        FunctionName: 'Lambda_B', // the lambda function we are going to invoke
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify({
            "email": user.email,
            "userName": user.firstName,
            "verificationLink": link
        })
    };

    lambda.invoke(params, function (err, data) {
        if (err) {
            // context.fail(err);
            console.log(err);
        } else {
            // context.succeed('Lambda_B said ' + data.Payload);
            console.log('Lambda_B said ' + data.Payload);
        }
    })
};

