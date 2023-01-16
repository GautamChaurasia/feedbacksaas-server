import * as mongoose from 'mongoose';

export const TestimonialSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  formTitle: { type: String, required: true },
  responses: { type: Number, default: 0 },
  formType: {type: String, required: true},
  formId: { type: String, required: true },
  createdOn: { type: String, default: new Date().toISOString() },
});

export interface Testimonial {
  userId: string;
  userEmail: string;
  formTitle: string;
  responses: number;
  formType: string,
  formId: string;
  createdOn: string;
}
