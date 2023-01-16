"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const testimonial_controller_1 = require("./testimonial.controller");
const testimonial_model_1 = require("./testimonial.model");
const testimonial_service_1 = require("./testimonial.service");
const config_1 = require("@nestjs/config");
let TestimonialModule = class TestimonialModule {
};
TestimonialModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Testimonial', schema: testimonial_model_1.TestimonialSchema },
            ]),
        ],
        controllers: [testimonial_controller_1.TestimonialController],
        providers: [testimonial_service_1.TestmonialService],
    })
], TestimonialModule);
exports.TestimonialModule = TestimonialModule;
//# sourceMappingURL=testimonial.module.js.map