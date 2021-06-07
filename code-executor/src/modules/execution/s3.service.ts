import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { s3config } from 'src/main';

@Injectable()
export class S3Service {

    public async getObject(key: string) {
        const s3 = new S3();
     
        let params = {
          Bucket: s3config.AWS_PRIVATE_BUCKET_NAME,
          Key: key
        }
        
        console.log('here');
        
        var file = require('fs').createWriteStream('./code/' + key);
        s3.getObject(params).createReadStream().pipe(file);
      }

}
