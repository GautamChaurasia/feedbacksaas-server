"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const response_controller_1 = require("./response.controller");
const response_model_1 = require("./response.model");
const response_service_1 = require("./response.service");
const config_1 = require("@nestjs/config");
let ResponseModule = class ResponseModule {
};
ResponseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Response', schema: response_model_1.ResponseSchema },
            ]),
        ],
        controllers: [response_controller_1.ResponseController],
        providers: [response_service_1.ResponseService],
    })
], ResponseModule);
exports.ResponseModule = ResponseModule;
//# sourceMappingURL=reponse.module.js.map