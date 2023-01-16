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
import { Testimonial } from './testimonial.model';
import { ConfigService } from '@nestjs/config';
export declare class TestmonialService {
    private readonly testimonial;
    private readonly config;
    constructor(testimonial: Model<Testimonial>, config: ConfigService);
    allTestimonials(): Promise<(import("mongoose").Document<unknown, any, Testimonial> & Testimonial & {
        _id: import("mongoose").Types.ObjectId;
    })[] | HttpException>;
    testimonialById(formId: string): Promise<import("mongoose").Document<unknown, any, Testimonial> & Testimonial & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addTestimonial(userId: string, userEmail: string, formTitle: string, responses: number, formType: string, formId: string, createdOn: string): Promise<{
        formId: string;
    }>;
    updateForm(formId: string, newTitle: string): Promise<void>;
    removeTestimonial(formId: string): Promise<void>;
}
