import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestimonialController } from './testimonial.controller';
import { TestimonialSchema } from './testimonial.model';
import { TestmonialService } from './testimonial.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Testimonial', schema: TestimonialSchema },
    ]),
  ],
  controllers: [TestimonialController],
  providers: [TestmonialService],
})
export class TestimonialModule {}
