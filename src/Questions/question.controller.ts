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
import { QuestionService } from './question.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Req, UploadedFile } from '@nestjs/common/decorators';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';

@Controller('question')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Get(':qnId')
  getQuestionById(
    @Param('qnId') qnId: string,
  ){
    return this.service.questionData(qnId);
  }

  @Get(':formId/:userId')
  getFormQuestions(
    @Param('formId') formId: string,
    @Param('userId') userId: string,
  ): any {
    return this.service.allFormQuestions(formId, userId);
  }

  @Post()
  saveQuestion(
    @Body('formId') formId: string,
    @Body('userId') userId: string,
    @Body('qnTitle') qnTitle: string,
    @Body('responses') responses: number,
    @Body('qnType') qnType: string,
    @Body('qnId') qnId: string,
    @Body('createdOn') createdOn: string,
  ): any {
    return this.service.addQuestion(
      formId,
      userId,
      qnTitle,
      responses,
      qnType,
      qnId,
      createdOn,
    );
  }

  @Post('video')
  saveVideoQuestion(
    @Body('formId') formId: string,
    @Body('userId') userId: string,
    @Body('qnTitle') qnTitle: string,
    @Body('responses') responses: number,
    @Body('qnType') qnType: string,
    @Body('qnId') qnId: string,
    @Body('video64') video64: string,
    @Body('createdOn') createdOn: string,
  ): any {
    return this.service.addVideoQuestion(
      formId,
      userId,
      qnTitle,
      responses,
      qnType,
      qnId,
      video64,
      createdOn,
    );
  }

  @Patch('reorder')
  reorderQuestions(
    @Body('order') newOrder: object,
  ){
    return this.service.reOrder(newOrder)
  }

  @Patch()
  patchQuestion(
    @Body('formId') formId: string,
    @Body('qnId') qnId: string,
    @Body('params') newFields: object,
  ): any {
    return this.service.updateQuestion(formId, qnId, newFields);
  }

  @Delete(':formId/:qnId')
  removeQuestionById(
    @Param('formId') formId: string,
    @Param('qnId') qnId: string,
    @Body('videoKey') videoKey: string,
  ): any {
    return this.service.removeQuestion(formId, qnId, videoKey);
  }
}
