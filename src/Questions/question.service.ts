import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.model';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel('Question')
    private readonly question: Model<Question>,
    private readonly config: ConfigService,
  ) {}

  async questionData(qnId: string) {
    try {
      const res = await this.question.findOne({ qnId }, { _id: 0, __v: 0 });
      return res;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async allFormQuestions(formId: string, userId: string) {
    try {
      const query = { formId };
      if (userId !== 'None') query['userId'] = userId;
      else {
        query['qnState'] = true;
      }
      // console.log(query);
      const res = await this.question
        .find(query, { _id: 0, __v: 0 })
        .sort({ index: 1 });
      return res;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeQuestion(formId: string, qnId: string, videoKey: string) {
    try {
      let res: any;
      if (qnId !== 'None') {
        res = await this.question.deleteOne({ formId, qnId });
        if (!res.deletedCount) {
          throw new Error('Cannot delete question');
        }
        if (videoKey) {
          const s3 = this.config.get('s3');
          const delres = await s3
            .deleteObject({
              Bucket: this.config.get('bucket'),
              Key: videoKey,
            })
            .promise();
        }
      } else {
        res = await this.question.deleteMany({ formId });
        if (!res.matchedCount) {
          return 'No corresponding questions found';
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  async addQuestion(
    formId: string,
    userId: string,
    qnTitle: string,
    responses: number,
    qnType: string,
    qnId: string,
    createdOn: string,
  ) {
    try {
      const count = await this.question.countDocuments({ formId });
      const newQuestion = new this.question({
        formId,
        userId,
        index: count,
        qnTitle,
        responses,
        qnType,
        qnId,
        qnState: true,
        createdOn,
      });
      const res = await newQuestion.save();
      return { formId: res.formId, qnId: res.qnId };
    } catch (error) {
      //   console.log(error)
      throw new HttpException('Incorrect details !', HttpStatus.BAD_REQUEST);
    }
  }

  async addVideoQuestion(
    formId: string,
    userId: string,
    qnTitle: string,
    responses: number,
    qnType: string,
    qnId: string,
    video64: string,
    createdOn: string,
  ) {
    let [mdata, data] = video64.split(';base64,');
    const ext = mdata.split('/')[1];
    const vbuffer = Buffer.from(data, 'base64');
    const filename = `${userId + formId + qnId}.${ext}`;

    const s3 = this.config.get('s3');

    const awsres = await s3
      .upload(
        {
          Body: vbuffer,
          Bucket: `${this.config.get('bucket')}/questions/${formId}`,
          Key: filename,
        },
        (err, data) => {
          if (err) return err;
          return data;
        },
      )
      .promise();

    const count = await this.question.countDocuments({ formId });
    const newQuestion = new this.question({
      formId,
      userId,
      index: count,
      qnTitle,
      responses,
      qnType,
      qnId,
      videoURL: awsres.Location,
      videoKey: awsres.Key,
      qnState: true,
      createdOn,
    });

    const res = await newQuestion.save();
    if (!res) {
      const awsdel = await s3
        .deleteObject({
          Bucket: this.config.get('bucket'),
          Key: filename,
        })
        .promise();
      return { awsdel, res };
    }
    return awsres.Location;
  }

  async updateQuestion(formId: string, qnId: string, newFields: object) {
    try {
      const res = await this.question.updateOne(
        { formId, qnId },
        { $set: newFields },
      );
      if (!res.matchedCount) {
        throw new Error('Update Failed, try again!');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  async reOrder(newOrder: object) {
    try {
      const promises = [];
      Object.keys(newOrder).forEach((qnId) => {
        promises.push(
          this.question.updateOne(
            { qnId },
            { $set: { index: newOrder[qnId] } },
          ),
        );
      });
      const res = await Promise.all(promises)
      return res
    } catch (error) {
      console.log(error);
    }
  }
}
