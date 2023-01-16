import * as mongoose from 'mongoose';
export declare const TestimonialSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: string;
    userEmail: string;
    formTitle: string;
    responses: number;
    formType: string;
    formId: string;
    createdOn: string;
}>;
export interface Testimonial {
    userId: string;
    userEmail: string;
    formTitle: string;
    responses: number;
    formType: string;
    formId: string;
    createdOn: string;
}
