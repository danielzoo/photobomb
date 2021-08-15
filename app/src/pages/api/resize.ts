import { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";
import sharp from "sharp";
import axios from "axios";
import { DOMAIN } from "../../lib/domain";

export default async function resizeImageHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "post") {
    res.json("err");
    return;
  }

  //protecting api route from some weirdo
  if (!req.headers.cookie) {
    res.json("err");
    return;
  }

  const { data } = await axios.get(`${DOMAIN}/api/v1/user/me`, {
    headers: {
      cookie: req.headers.cookie,
    },
  });
  if (!data.user) {
    res.json("err");
    return;
  }

  const bucket = process.env.BUCKET_NAME;

  const { key } = req.body;

  const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: "us-west-2",
    apiVersion: "latest",
    signatureVersion: "v4",
  });

  try {
    const data = await s3
      .getObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();

    //@ts-ignore oddball error
    const size1 = await sharp(data.Body)
      .resize(450, 380)
      .toFormat("png")
      .toBuffer();

    //@ts-ignore oddball error
    const size2 = await sharp(data.Body)
      .resize(800, 620)
      .toFormat("png")
      .toBuffer();

    await s3
      .putObject({
        Body: size1,
        Bucket: bucket,
        Key: `${key}-450x380`,
        ContentType: "image/png",
        ACL: "public-read",
      })
      .promise();

    await s3
      .putObject({
        Body: size2,
        Bucket: bucket,
        Key: `${key}-800x620`,
        ContentType: "image/png",
        ACL: "public-read",
      })
      .promise();

    res.json("ok");
  } catch (e) {
    res.json("error");
  }
}
