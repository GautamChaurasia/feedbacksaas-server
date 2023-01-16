"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsSchema = void 0;
const mongoose = require("mongoose");
exports.QuestionsSchema = new mongoose.Schema({
    formId: { type: String, required: true },
    userId: { type: String, required: true },
    index: { type: Number, required: true },
    qnTitle: { type: String, required: true },
    responses: { type: Number, default: 0 },
    qnType: { type: String, required: true },
    qnId: { type: String, required: true },
    qnState: { type: Boolean, default: true },
    videoURL: { type: String, required: false },
    videoKey: { type: String, required: false },
    createdOn: { type: String, default: new Date().toISOString() },
});
//# sourceMappingURL=question.model.js.map