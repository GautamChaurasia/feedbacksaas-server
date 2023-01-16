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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
let QuestionService = class QuestionService {
    constructor(question, config) {
        this.question = question;
        this.config = config;
    }
    async questionData(qnId) {
        try {
            const res = await this.question.findOne({ qnId }, { _id: 0, __v: 0 });
            return res;
        }
        catch (error) {
            return new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async allFormQuestions(formId, userId) {
        try {
            const query = { formId };
            if (userId !== 'None')
                query['userId'] = userId;
            else {
                query['qnState'] = true;
            }
            const res = await this.question
                .find(query, { _id: 0, __v: 0 })
                .sort({ index: 1 });
            return res;
        }
        catch (error) {
            return new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async removeQuestion(formId, qnId, videoKey) {
        try {
            let res;
            if (qnId !== 'None') {
                res = await this.question.deleteOne({ formId, qnId });
                if (!res.deletedCount) {
                    throw new Error('Cannot delete question');
                }
                if (videoKey) {
                    const s3 = this.config.get('s3');
                    const delres = await s3
                        .deleteObject({
                        Bucket: this.config.get('bucket'),
                        Key: videoKey,
                    })
                        .promise();
                }
            }
            else {
                res = await this.question.deleteMany({ formId });
                if (!res.matchedCount) {
                    return 'No corresponding questions found';
                }
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_MODIFIED);
        }
    }
    async addQuestion(formId, userId, qnTitle, responses, qnType, qnId, createdOn) {
        try {
            const count = await this.question.countDocuments({ formId });
            const newQuestion = new this.question({
                formId,
                userId,
                index: count,
                qnTitle,
                responses,
                qnType,
                qnId,
                qnState: true,
                createdOn,
            });
            const res = await newQuestion.save();
            return { formId: res.formId, qnId: res.qnId };
        }
        catch (error) {
            throw new common_1.HttpException('Incorrect details !', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addVideoQuestion(formId, userId, qnTitle, responses, qnType, qnId, video64, createdOn) {
        let [mdata, data] = video64.split(';base64,');
        const ext = mdata.split('/')[1];
        const vbuffer = Buffer.from(data, 'base64');
        const filename = `${userId + formId + qnId}.${ext}`;
        const s3 = this.config.get('s3');
        const awsres = await s3
            .upload({
            Body: vbuffer,
            Bucket: `${this.config.get('bucket')}/questions/${formId}`,
            Key: filename,
        }, (err, data) => {
            if (err)
                return err;
            return data;
        })
            .promise();
        const count = await this.question.countDocuments({ formId });
        const newQuestion = new this.question({
            formId,
            userId,
            index: count,
            qnTitle,
            responses,
            qnType,
            qnId,
            videoURL: awsres.Location,
            videoKey: awsres.Key,
            qnState: true,
            createdOn,
        });
        const res = await newQuestion.save();
        if (!res) {
            const awsdel = await s3
                .deleteObject({
                Bucket: this.config.get('bucket'),
                Key: filename,
            })
                .promise();
            return { awsdel, res };
        }
        return awsres.Location;
    }
    async updateQuestion(formId, qnId, newFields) {
        try {
            const res = await this.question.updateOne({ formId, qnId }, { $set: newFields });
            if (!res.matchedCount) {
                throw new Error('Update Failed, try again!');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_MODIFIED);
        }
    }
    async reOrder(newOrder) {
        try {
            const promises = [];
            Object.keys(newOrder).forEach((qnId) => {
                promises.push(this.question.updateOne({ qnId }, { $set: { index: newOrder[qnId] } }));
            });
            const res = await Promise.all(promises);
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Question')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map