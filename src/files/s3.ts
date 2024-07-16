import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import { createReadStream } from "fs";

import { uploadKeyPrefix } from "../config/env.js";

const client = new S3Client();

export async function confirmS3Works(): Promise<boolean> {
  try {
    const data = await client.send(
      new PutObjectCommand({
        Bucket: "drawref",
        Key: `${uploadKeyPrefix}test`,
        Body: "test",
        // ContentMD5: '',
        ContentType: "text/plain",
      }),
    );

    return true;
  } catch (error) {
    console.error("Couldn't upload test file:", error);

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
