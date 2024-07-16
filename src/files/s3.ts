import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import { join } from "path";
import { createReadStream } from "fs";

import { uploadBucket, uploadKeyPrefix, uploadUrlPrefix, uploadPathTmp } from "../config/env.js";

const client = new S3Client();

export async function confirmS3Works(): Promise<boolean> {
  try {
    const data = await client.send(new ListBucketsCommand());

    // check for current upload bucket name
    if (data.Buckets?.map((b) => b.Name).indexOf(uploadBucket) === -1) {
      console.error(`Couldn't find [${uploadBucket}] in list of available S3 buckets.`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Couldn't list S3 buckets:", error);

    return false;
  }
}

export async function uploadFile(pathOnDisk: string, pathOnS3: string): Promise<boolean> {
  try {
    const data = await client.send(
      new PutObjectCommand({
        Bucket: "drawref",
        Key: `${uploadKeyPrefix}${pathOnS3}`,
        Body: createReadStream(pathOnDisk),
        // ContentMD5: '',
        ContentType: mime.contentType(pathOnS3) || "application/octet-stream",
      }),
    );

    return true;
  } catch (error) {
    console.error("Couldn't upload file:", error);

    return false;
  }
}
