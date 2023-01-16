import { ResponseService } from './response.service';
export declare class ResponseController {
    private readonly service;
    constructor(service: ResponseService);
    getResponses(formId: string, count: string): Promise<any>;
    saveResponse(reviewId: string, formId: string, textAnswers: object, videoAnswers: object, rating: number, reviewer: object, createdOn: string): any;
}
