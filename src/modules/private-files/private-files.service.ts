import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import PrivateFile from './private-file.entity';
import getMime from './utils/mime-type';

 
@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService
  ) {}
 
  async uploadPrivateFile(dataBuffer: Buffer, ownerId: number, filename: string, isResult: boolean) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Body: dataBuffer,
      Key: isResult ? filename : `${uuid()}-${filename}`
    }).promise();

    if(!isResult){
      const newFile = this.privateFilesRepository.create({
        key: uploadResult.Key,
        owner: {
          id: ownerId
        }
      });
      await this.privateFilesRepository.save(newFile);
      return newFile;
    }
  }

  public async generatePresignedUrl(key: string) {
    const s3 = new S3();

    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      ResponseContentType: getMime(key),
      Key: key,
    })
  }
  
  public async deleteFile(key: string) {
    const s3 = new S3();

    console.log(key);
    
    let params = {
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Key: key
    }

    console.log(params);
    
    s3.deleteObject(params, (err, data) => {
      if(err){
        throw new InternalServerErrorException(err)
      }

      console.log(data);
      

      return true

    })
  }
}