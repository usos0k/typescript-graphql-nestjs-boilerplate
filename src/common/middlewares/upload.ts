import path from 'path';

import {
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} from '@/environments';
import { Logger } from '@nestjs/common';
import aws from 'aws-sdk';
import moment from 'moment';

export const uploadFile = async (file: any, userId: any) => {
  const logger = new Logger('uploadFile', true);

  const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  logger.log('extract file info');
  const { createReadStream, filename, mimetype, encoding } = await file;
  const extension = path.extname(filename).toLowerCase();

  logger.log('upload AWS S3');

  const { Location } = await s3
    .upload({
      Bucket: AWS_BUCKET,
      Body: createReadStream(),
      Key:
        moment().format('YYYYMMDDHHmmss') +
        '_' +
        (userId ? userId : 'noUser') +
        extension,
      ACL: 'public-read',
      ContentType: mimetype,
    })
    .promise();

  return {
    path: Location,
    filename: filename,
  };
};
