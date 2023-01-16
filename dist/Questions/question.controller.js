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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
let QuestionController = class QuestionController {
    constructor(service) {
        this.service = service;
    }
    getQuestionById(qnId) {
        return this.service.questionData(qnId);
    }
    getFormQuestions(formId, userId) {
        return this.service.allFormQuestions(formId, userId);
    }
    saveQuestion(formId, userId, qnTitle, responses, qnType, qnId, createdOn) {
        return this.service.addQuestion(formId, userId, qnTitle, responses, qnType, qnId, createdOn);
    }
    saveVideoQuestion(formId, userId, qnTitle, responses, qnType, qnId, video64, createdOn) {
        return this.service.addVideoQuestion(formId, userId, qnTitle, responses, qnType, qnId, video64, createdOn);
    }
    reorderQuestions(newOrder) {
        return this.service.reOrder(newOrder);
    }
    patchQuestion(formId, qnId, newFields) {
        return this.service.updateQuestion(formId, qnId, newFields);
    }
    removeQuestionById(formId, qnId, videoKey) {
        return this.service.removeQuestion(formId, qnId, videoKey);
    }
};
__decorate([
    (0, common_1.Get)(':qnId'),
    __param(0, (0, common_1.Param)('qnId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getQuestionById", null);
__decorate([
    (0, common_1.Get)(':formId/:userId'),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Object)
], QuestionController.prototype, "getFormQuestions", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('formId')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('qnTitle')),
    __param(3, (0, common_1.Body)('responses')),
    __param(4, (0, common_1.Body)('qnType')),
    __param(5, (0, common_1.Body)('qnId')),
    __param(6, (0, common_1.Body)('createdOn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String, String, String]),
    __metadata("design:returntype", Object)
], QuestionController.prototype, "saveQuestion", null);
__decorate([
    (0, common_1.Post)('video'),
    __param(0, (0, common_1.Body)('formId')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('qnTitle')),
    __param(3, (0, common_1.Body)('responses')),
    __param(4, (0, common_1.Body)('qnType')),
    __param(5, (0, common_1.Body)('qnId')),
    __param(6, (0, common_1.Body)('video64')),
    __param(7, (0, common_1.Body)('createdOn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String, String, String, String]),
    __metadata("design:returntype", Object)
], QuestionController.prototype, "saveVideoQuestion", null);
__decorate([
    (0, common_1.Patch)('reorder'),
    __param(0, (0, common_1.Body)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "reorderQuestions", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)('formId')),
    __param(1, (0, common_1.Body)('qnId')),
    __param(2, (0, common_1.Body)('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Object)
], QuestionController.prototype, "patchQuestion", null);
__decorate([
    (0, common_1.Delete)(':formId/:qnId'),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, common_1.Param)('qnId')),
    __param(2, (0, common_1.Body)('videoKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Object)
], QuestionController.prototype, "removeQuestionById", null);
QuestionController = __decorate([
    (0, common_1.Controller)('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map