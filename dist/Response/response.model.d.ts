import * as mongoose from 'mongoose';
export declare const ResponseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    formId: string;
    createdOn: string;
    reviewId: string;
    answers: any;
    reviewer: any;
    rating?: number;
}>;
export interface Response {
    reviewId: string;
    formId: string;
    answers: Object;
    rating: Number;
    reviewer: Object;
    createdOn: string;
}
