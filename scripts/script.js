const { S3, ListObjectsV2Command, HeadObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();

const region = 'us-east-1';
const s3 = new S3({ region });

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:592b675f-95c1-4596-beb8-25192a83d938',
})

function selectObject() {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    // Add an event listener to the file input for when a file is selected
    fileInput.addEventListener('change', uploadObject);

    // Trigger the file selection dialog
    fileInput.click();
}

async function uploadObject(event) {
    const file = event.target.files[0];
  
    if (file) {
        const bucket = "staticwebsite-lpf-12321";
        const fileName = file.name;
        const fileSize = file.size;
        const uploadDate = new Date().toISOString();
        const uploaderUsername = "Jowi"; // TODO: Change to user's username

        try {
            await s3.putObject({
                Body: file,
                Bucket: bucket,
                Key: fileName,
                Metadata: {
                    "file-size": fileSize,
                    "upload-date": uploadDate,
                    "uploader-username": uploaderUsername
                }
            });
            console.log("Object uploaded successfully.");
        } catch (error) {
            console.error("Error uploading object:", error);
        }
    }
}
  

async function getAllFilesMetadata() {
    try {
        const listObjectsCommand = new ListObjectsV2Command({
            Bucket: "staticwebsite-lpf-12321"
        });

        const { Contents } = await s3Client.send(listObjectsCommand);

        for (const object of Contents) {
            const headObjectCommand = new HeadObjectCommand({
                Bucket: "staticwebsite-lpf-12321",
                Key: object.Key
            });

            const { Metadata } = await s3Client.send(headObjectCommand);

            console.log("Object Key:", object.Key);
            console.log("Entity Tag:", object.ETag);
            console.log("Metadata:", Metadata);
            console.log("----------------------");
        }
    } catch (error) {
        console.error("Error retrieving file metadata:", error);
    }
}

function userLogout() {
    ;
}

//addObject();
//getAllFilesMetadata();