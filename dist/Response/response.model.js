"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSchema = void 0;
const mongoose = require("mongoose");
exports.ResponseSchema = new mongoose.Schema({
    reviewId: { type: String, required: true },
    formId: { type: String, required: true },
    answers: { type: Object, required: true },
    rating: { type: Number },
    reviewer: { type: Object, required: true },
    createdOn: { type: String, default: new Date().toISOString() },
});
//# sourceMappingURL=response.model.js.map