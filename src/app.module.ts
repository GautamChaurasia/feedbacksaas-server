import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

import { TestimonialModule } from './Testimonial/testimonial.module';
import { QuestionModule } from './Questions/question.module';
import { ResponseModule } from './Response/reponse.module';

import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TestimonialModule,
    QuestionModule,
    ResponseModule,
    MongooseModule.forRoot(
      'mongodb+srv://workcare:^yh5jFBWdk5{Phyn@cluster0.smhec.mongodb.net/feedbacksaas?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
