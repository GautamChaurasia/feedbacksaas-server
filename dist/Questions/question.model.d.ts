import * as mongoose from 'mongoose';
export declare const QuestionsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: string;
    responses: number;
    formId: string;
    createdOn: string;
    index: number;
    qnTitle: string;
    qnType: string;
    qnId: string;
    qnState: boolean;
    videoURL?: string;
    videoKey?: string;
}>;
export interface Question {
    formId: string;
    userId: string;
    index: Number;
    qnTitle: string;
    responses: number;
    qnType: string;
    qnId: string;
    qnState: boolean;
    videoURL: string;
    videoKey: string;
    createdOn: string;
}
