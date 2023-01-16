import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial } from './testimonial.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TestmonialService {
  constructor(
    @InjectModel('Testimonial')
    private readonly testimonial: Model<Testimonial>,
    private readonly config: ConfigService,
  ) {}

  async allTestimonials() {
    try {
      const res = await this.testimonial.find({}, { _id: 0, __v: 0 });
      return res;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async testimonialById(formId: string) {
    try {
      const res = await this.testimonial.findOne({ formId }, { _id: 0, __v: 0 });
      if(!res){
        throw new Error("Form not found")
      }
      return res
      
    } catch (error) {
      // console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  async addTestimonial(
    userId: string,
    userEmail: string,
    formTitle: string,
    responses: number,
    formType: string,
    formId: string,
    createdOn: string,
  ) {
    try {
      const newTestimonial = new this.testimonial({
        userId,
        userEmail,
        formTitle,
        responses,
        formType,
        formId,
        createdOn,
      });
      const res = await newTestimonial.save();
      return { formId: res.formId };
    } catch (error) {
      // console.log(error)
      throw new HttpException('Incorrect details !', HttpStatus.BAD_REQUEST);
    }
  }

  async updateForm(formId: string, newTitle: string) {
    try {
      const res = await this.testimonial.updateOne(
        { formId },
        { $set: { formTitle: newTitle } },
      );
      // console.log(res)
      if (!res.matchedCount) {
        throw new Error('Update Failed');
      }
    } catch (error) {
      // console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  async removeTestimonial(formId: string) {
    try {
      const res = await this.testimonial.deleteOne({ formId });
      if (!res.deletedCount) {
        throw new Error('Form could not be removed !');
      }
      const s3 = this.config.get('s3')
      // const delres = await s3.deleteObject({
      //   Bucket: this.config.get('bucket'),
      //   Key: `questions/${formId}`
      // })
      // console.log(delres)
    } catch (error) {
      // console.log(error.message)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
