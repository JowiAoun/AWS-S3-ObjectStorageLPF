const AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.region = process.env.REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.IDENTITY_POOL_ID,
});

// Declare the s3 variable
let s3;

AWS.config.credentials.get(function () {
    // Retrieve the AWS credentials
    const accessKeyId = AWS.config.credentials.accessKeyId;
    const secretAccessKey = AWS.config.credentials.secretAccessKey;
    const sessionToken = AWS.config.credentials.sessionToken;

    // Instantiate an S3 client using the retrieved credentials
    s3 = new AWS.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        sessionToken: sessionToken,
        region: process.env.REGION
    });

    // Now we can use the S3 client to interact with the S3 bucket
    // Perform upload, download, or any other S3 operations
});

// Export the s3 object outside the callback
module.exports = s3;

const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;
const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId,
});