from __future__ import annotations

import json
import os

from minio import Minio
from minio.error import S3Error

from dotenv import load_dotenv
load_dotenv()

# Minio server and credentials
minio_endpoint = os.getenv("AWS_S3_ENDPOINT")
access_key = os.getenv("AWS_ACCESS_KEY_ID")
secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
bucket_name = os.getenv("AWS_STORAGE_BUCKET_NAME")

print(
    "******",
    minio_endpoint,
    access_key,
    secret_key,
)

# Create a Minio client
minio_client = Minio(
    minio_endpoint,
    access_key=access_key,
    secret_key=secret_key,
    secure=False,
)


# Create the bucket if it doesn't exist
found = minio_client.bucket_exists(bucket_name)
if not found:
    minio_client.make_bucket(bucket_name)
    print(f"Bucket ${bucket_name} created.")
else:
    print(f"Bucket ${bucket_name} already exists.")

# Set the bucket policy to public

policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {"AWS": "*"},
            "Action": "s3:GetObject",
            "Resource": f"arn:aws:s3:::{bucket_name}/*",
        },
    ],
}

try:
    minio_client.set_bucket_policy(bucket_name, json.dumps(policy))
    print(f'Bucket policy for "{bucket_name}" set to public')
except S3Error as e:
    print(f"Error setting bucket policy: {str(e)}")
