import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from './response.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResponseService {
  constructor(
    @InjectModel('Response')
    private readonly response: Model<Response>,
    private readonly config: ConfigService,
  ) {}

  async responses(formId: string, count: string){
    try{
      let res;
      if(count==="true"){
        res = await this.response.countDocuments({formId}).exec()
      }else{
        res = await this.response.find({formId}, {_id:0, __v:0})
      }
      return res
    }catch(error){
      console.log(error)
    }
  }

  async addResponse(
    reviewId: string,
    formId: string,
    textAnswers: object,
    videoAnswers: object,
    rating: number,
    reviewer: object,
    createdOn: string,
  ) {
    const answers = { ...textAnswers };
    const resDir = 'responses'
    const s3 = this.config.get('s3');

    const mapping = {}
    const promises = [];
    try {
      Object.keys(videoAnswers).forEach((key) => {
        const uniqueId = `${reviewId}%${key}`;
        const video64 = videoAnswers[key];
        const [mdata, data] = video64.split(';base64,');
        const ext = mdata.split('/')[1];
        const buffer = Buffer.from(data, 'base64');
        const filename = `${resDir}/${formId}/${uniqueId}.${ext}`;
        promises.push(
          s3.upload({
              Body: buffer,
              Bucket: `${this.config.get('bucket')}`,
              Key: filename,
            })
            .promise(),
        );
        mapping[filename] = key
      });

      const awsres = await Promise.all(promises)

      awsres.forEach(retObj => {
        const filename = retObj.Key
        const qnId = mapping[filename]
        answers[qnId] = retObj.Location
      })

      const newResponse = new this.response({
        reviewId,
        formId,
        answers,
        rating,
        reviewer,
        createdOn,
      });
      const res = await newResponse.save();
      return res
    } catch (error) {
      console.log(error);
    }
  }
}
