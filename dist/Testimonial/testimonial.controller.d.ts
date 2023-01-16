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
import { TestmonialService } from './testimonial.service';
export declare class TestimonialController {
    private readonly service;
    constructor(service: TestmonialService);
    getTestimonials(): any;
    getTetimonialByID(formId: string): Promise<import("mongoose").Document<unknown, any, import("./testimonial.model").Testimonial> & import("./testimonial.model").Testimonial & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    saveTesimonial(userId: string, userEmail: string, formTitle: string, responses: number, formType: string, formId: string, createdOn: string): any;
    patchTitle(formId: string, newTitle: string): any;
    removeTestimonial(formId: string): any;
}
