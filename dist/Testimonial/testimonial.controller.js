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
exports.TestimonialController = void 0;
const common_1 = require("@nestjs/common");
const testimonial_service_1 = require("./testimonial.service");
let TestimonialController = class TestimonialController {
    constructor(service) {
        this.service = service;
    }
    getTestimonials() {
        return this.service.allTestimonials();
    }
    getTetimonialByID(formId) {
        return this.service.testimonialById(formId);
    }
    saveTesimonial(userId, userEmail, formTitle, responses, formType, formId, createdOn) {
        return this.service.addTestimonial(userId, userEmail, formTitle, responses, formType, formId, createdOn);
    }
    patchTitle(formId, newTitle) {
        return this.service.updateForm(formId, newTitle);
    }
    removeTestimonial(formId) {
        return this.service.removeTestimonial(formId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], TestimonialController.prototype, "getTestimonials", null);
__decorate([
    (0, common_1.Get)(':formId'),
    __param(0, (0, common_1.Param)('formId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestimonialController.prototype, "getTetimonialByID", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('userEmail')),
    __param(2, (0, common_1.Body)('formTitle')),
    __param(3, (0, common_1.Body)('responses')),
    __param(4, (0, common_1.Body)('formType')),
    __param(5, (0, common_1.Body)('formId')),
    __param(6, (0, common_1.Body)('createdOn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String, String, String]),
    __metadata("design:returntype", Object)
], TestimonialController.prototype, "saveTesimonial", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)('formId')),
    __param(1, (0, common_1.Body)('newTitle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Object)
], TestimonialController.prototype, "patchTitle", null);
__decorate([
    (0, common_1.Delete)(':formId'),
    __param(0, (0, common_1.Param)('formId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TestimonialController.prototype, "removeTestimonial", null);
TestimonialController = __decorate([
    (0, common_1.Controller)('testimonial'),
    __metadata("design:paramtypes", [testimonial_service_1.TestmonialService])
], TestimonialController);
exports.TestimonialController = TestimonialController;
//# sourceMappingURL=testimonial.controller.js.map