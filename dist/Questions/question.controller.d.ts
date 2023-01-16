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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly service;
    constructor(service: QuestionService);
    getQuestionById(qnId: string): Promise<import("@nestjs/common").HttpException | (import("mongoose").Document<unknown, any, import("./question.model").Question> & import("./question.model").Question & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    getFormQuestions(formId: string, userId: string): any;
    saveQuestion(formId: string, userId: string, qnTitle: string, responses: number, qnType: string, qnId: string, createdOn: string): any;
    saveVideoQuestion(formId: string, userId: string, qnTitle: string, responses: number, qnType: string, qnId: string, video64: string, createdOn: string): any;
    reorderQuestions(newOrder: object): Promise<any[]>;
    patchQuestion(formId: string, qnId: string, newFields: object): any;
    removeQuestionById(formId: string, qnId: string, videoKey: string): any;
}
