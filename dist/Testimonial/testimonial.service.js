"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestmonialService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
let TestmonialService = class TestmonialService {
    constructor(testimonial, config) {
        this.testimonial = testimonial;
        this.config = config;
    }
    async allTestimonials() {
        try {
            const res = await this.testimonial.find({}, { _id: 0, __v: 0 });
            return res;
        }
        catch (error) {
            return new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async testimonialById(formId) {
        try {
            const res = await this.testimonial.findOne({ formId }, { _id: 0, __v: 0 });
            if (!res) {
                throw new Error("Form not found");
            }
            return res;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async addTestimonial(userId, userEmail, formTitle, responses, formType, formId, createdOn) {
        try {
            const newTestimonial = new this.testimonial({
                userId,
                userEmail,
                formTitle,
                responses,
                formType,
                formId,
                createdOn,
            });
            const res = await newTestimonial.save();
            return { formId: res.formId };
        }
        catch (error) {
            throw new common_1.HttpException('Incorrect details !', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateForm(formId, newTitle) {
        try {
            const res = await this.testimonial.updateOne({ formId }, { $set: { formTitle: newTitle } });
            if (!res.matchedCount) {
                throw new Error('Update Failed');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_MODIFIED);
        }
    }
    async removeTestimonial(formId) {
        try {
            const res = await this.testimonial.deleteOne({ formId });
            if (!res.deletedCount) {
                throw new Error('Form could not be removed !');
            }
            const s3 = this.config.get('s3');
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
TestmonialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Testimonial')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], TestmonialService);
exports.TestmonialService = TestmonialService;
//# sourceMappingURL=testimonial.service.js.map