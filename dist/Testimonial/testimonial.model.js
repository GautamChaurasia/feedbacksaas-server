"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialSchema = void 0;
const mongoose = require("mongoose");
exports.TestimonialSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    formTitle: { type: String, required: true },
    responses: { type: Number, default: 0 },
    formType: { type: String, required: true },
    formId: { type: String, required: true },
    createdOn: { type: String, default: new Date().toISOString() },
});
//# sourceMappingURL=testimonial.model.js.map