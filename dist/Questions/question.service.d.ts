/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Question } from './question.model';
import { ConfigService } from '@nestjs/config';
export declare class QuestionService {
    private readonly question;
    private readonly config;
    constructor(question: Model<Question>, config: ConfigService);
    questionData(qnId: string): Promise<HttpException | (import("mongoose").Document<unknown, any, Question> & Question & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    allFormQuestions(formId: string, userId: string): Promise<HttpException | (import("mongoose").Document<unknown, any, Question> & Question & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    removeQuestion(formId: string, qnId: string, videoKey: string): Promise<string>;
    addQuestion(formId: string, userId: string, qnTitle: string, responses: number, qnType: string, qnId: string, createdOn: string): Promise<{
        formId: string;
        qnId: string;
    }>;
    addVideoQuestion(formId: string, userId: string, qnTitle: string, responses: number, qnType: string, qnId: string, video64: string, createdOn: string): Promise<any>;
    updateQuestion(formId: string, qnId: string, newFields: object): Promise<void>;
    reOrder(newOrder: object): Promise<any[]>;
}
