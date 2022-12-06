import {
  ListObjectsV2Command,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config();

const BUCKET = 'collections-project'
const KEY = process.env.BUCKET_KEY;
const secretAccessKey = process.env.SECRET_KEY;
const region = 'eu-west-2';

const s3 = new S3Client({
  region,
  credential: {
    KEY,
    secretAccessKey,
  },
});

export const uploadToS3 = async ({ file }) => {
  const key = `collections/${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  try {
    await s3.send(command);
    return { key };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const getUserUrls = async (collectionId, key) => {
  try {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return getSignedUrl(s3, command, { expiresIn: 900 });
  } catch (error) {
    console.log(error);
    return { error };
  }
};
