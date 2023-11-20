const Minio = require("minio");
const dotenv = require("dotenv");

dotenv.config();

// Minio server and credentials
const minioEndpoint = process.env.AWS_S3_ENDPOINT;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_STORAGE_BUCKET_NAME;

console.log("******", minioEndpoint, accessKey, secretKey);
const [endPoint, port] = minioEndpoint.split(":");

// Create a Minio client
const minioClient = new Minio.Client({
  port: +port,
  endPoint,
  useSSL: false,
  accessKey: accessKey,
  secretKey: secretKey,
});

// Create the bucket if it doesn't exist
minioClient.bucketExists(bucketName, function (err, found) {
  if (err) {
    return console.log(err);
  }

  if (!found) {
    minioClient.makeBucket(bucketName, "", function (err) {
      if (err) {
        return console.log(`Error creating bucket ${bucketName}: ${err}`);
      }
      console.log(`Bucket ${bucketName} created.`);
    });
  } else {
    console.log(`Bucket ${bucketName} already exists.`);
  }
});

// Set the bucket policy to public
const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: { AWS: "*" },
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${bucketName}/*`,
    },
  ],
};

minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), function (err) {
  if (err) {
    return console.log(`Error setting bucket policy: ${err}`);
  }
  console.log(`Bucket policy for "${bucketName}" set to public`);
});
