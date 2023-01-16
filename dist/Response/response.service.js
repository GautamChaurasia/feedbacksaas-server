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
exports.ResponseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
let ResponseService = class ResponseService {
    constructor(response, config) {
        this.response = response;
        this.config = config;
    }
    async responses(formId, count) {
        try {
            let res;
            if (count === "true") {
                res = await this.response.countDocuments({ formId }).exec();
            }
            else {
                res = await this.response.find({ formId }, { _id: 0, __v: 0 });
            }
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
    async addResponse(reviewId, formId, textAnswers, videoAnswers, rating, reviewer, createdOn) {
        const answers = Object.assign({}, textAnswers);
        const resDir = 'responses';
        const s3 = this.config.get('s3');
        const mapping = {};
        const promises = [];
        try {
            Object.keys(videoAnswers).forEach((key) => {
                const uniqueId = `${reviewId}%${key}`;
                const video64 = videoAnswers[key];
                const [mdata, data] = video64.split(';base64,');
                const ext = mdata.split('/')[1];
                const buffer = Buffer.from(data, 'base64');
                const filename = `${resDir}/${formId}/${uniqueId}.${ext}`;
                promises.push(s3.upload({
                    Body: buffer,
                    Bucket: `${this.config.get('bucket')}`,
                    Key: filename,
                })
                    .promise());
                mapping[filename] = key;
            });
            const awsres = await Promise.all(promises);
            awsres.forEach(retObj => {
                const filename = retObj.Key;
                const qnId = mapping[filename];
                answers[qnId] = retObj.Location;
            });
            const newResponse = new this.response({
                reviewId,
                formId,
                answers,
                rating,
                reviewer,
                createdOn,
            });
            const res = await newResponse.save();
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
};
ResponseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Response')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], ResponseService);
exports.ResponseService = ResponseService;
//# sourceMappingURL=response.service.js.map