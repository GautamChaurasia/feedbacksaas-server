import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Delete,
  Patch,
  Request,
  Header,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Query, Req, UploadedFile } from '@nestjs/common/decorators';

@Controller('response')
export class ResponseController {
  constructor(private readonly service: ResponseService) {}

  @Get(':formId')
  getResponses(
    @Param('formId') formId: string,
    @Query('count') count: string,
  ){
    return this.service.responses(formId, count)
  }

  @Post()
  saveResponse(
    @Body('reviewId') reviewId: string,
    @Body('formId') formId: string,
    @Body('textAnswers') textAnswers: object,
    @Body('videoAnswers') videoAnswers: object,
    @Body('rating') rating: number,
    @Body('reviewer') reviewer: object,
    @Body('createdOn') createdOn: string,
  ): any {
    return this.service.addResponse(
      reviewId,
      formId,
      textAnswers,
      videoAnswers,
      rating,
      reviewer,
      createdOn,
    );
  }

  // @Post('video')
  // saveVideoQuestion(
  //   @Body('formId') formId: string,
  //   @Body('userId') userId: string,
  //   @Body('qnTitle') qnTitle: string,
  //   @Body('responses') responses: number,
  //   @Body('qnType') qnType: string,
  //   @Body('qnId') qnId: string,
  //   @Body('video64') video64: string,
  //   @Body('createdOn') createdOn: string,
  // ): any {
  //   return this.service.addVideoQuestion(
  //     formId,
  //     userId,
  //     qnTitle,
  //     responses,
  //     qnType,
  //     qnId,
  //     video64,
  //     createdOn,
  //   );
  // }

  // @Patch()
  // patchQuestion(
  //   @Body('formId') formId: string,
  //   @Body('qnId') qnId: string,
  //   @Body('qnState') qnState: boolean,
  // ): any {
  //   return this.service.updateQuestion(formId, qnId, qnState);
  // }

  // @Delete(':formId/:qnId')
  // removeQuestionById(
  //   @Param('formId') formId: string,
  //   @Param('qnId') qnId: string,
  // ): any {
  //   return this.service.removeQuestion(formId, qnId);
  // }
}
