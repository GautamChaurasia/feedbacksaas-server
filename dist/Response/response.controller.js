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
exports.ResponseController = void 0;
const common_1 = require("@nestjs/common");
const response_service_1 = require("./response.service");
const decorators_1 = require("@nestjs/common/decorators");
let ResponseController = class ResponseController {
    constructor(service) {
        this.service = service;
    }
    getResponses(formId, count) {
        return this.service.responses(formId, count);
    }
    saveResponse(reviewId, formId, textAnswers, videoAnswers, rating, reviewer, createdOn) {
        return this.service.addResponse(reviewId, formId, textAnswers, videoAnswers, rating, reviewer, createdOn);
    }
};
__decorate([
    (0, common_1.Get)(':formId'),
    __param(0, (0, common_1.Param)('formId')),
    __param(1, (0, decorators_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ResponseController.prototype, "getResponses", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('reviewId')),
    __param(1, (0, common_1.Body)('formId')),
    __param(2, (0, common_1.Body)('textAnswers')),
    __param(3, (0, common_1.Body)('videoAnswers')),
    __param(4, (0, common_1.Body)('rating')),
    __param(5, (0, common_1.Body)('reviewer')),
    __param(6, (0, common_1.Body)('createdOn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object, Number, Object, String]),
    __metadata("design:returntype", Object)
], ResponseController.prototype, "saveResponse", null);
ResponseController = __decorate([
    (0, common_1.Controller)('response'),
    __metadata("design:paramtypes", [response_service_1.ResponseService])
], ResponseController);
exports.ResponseController = ResponseController;
//# sourceMappingURL=response.controller.js.map