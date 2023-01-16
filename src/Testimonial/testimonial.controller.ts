import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { TestmonialService } from './testimonial.service';

@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly service: TestmonialService) {}

  @Get()
  getTestimonials(): any {
    return this.service.allTestimonials();
  }

  @Get(':formId')
  getTetimonialByID(@Param('formId') formId: string) {
    return this.service.testimonialById(formId)
  }

  @Post()
  saveTesimonial(
    @Body('userId') userId: string,
    @Body('userEmail') userEmail: string,
    @Body('formTitle') formTitle: string,
    @Body('responses') responses: number,
    @Body('formType') formType: string,
    @Body('formId') formId: string,
    @Body('createdOn') createdOn: string,
  ): any {
    return this.service.addTestimonial(
      userId,
      userEmail,
      formTitle,
      responses,
      formType,
      formId,
      createdOn,
    );
  }

  @Patch()
  patchTitle(
    @Body('formId') formId: string,
    @Body('newTitle') newTitle: string,
  ): any {
    return this.service.updateForm(formId, newTitle);
  }

  @Delete(':formId')
  removeTestimonial(@Param('formId') formId: string): any {
    return this.service.removeTestimonial(formId);
  }
}
