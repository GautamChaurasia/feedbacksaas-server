import * as mongoose from 'mongoose';

export const ResponseSchema = new mongoose.Schema({
  reviewId: { type: String, required: true },
  formId: { type: String, required: true },
  answers: { type: Object, required: true },
  rating: { type: Number },
  reviewer: { type: Object, required: true },
  createdOn: { type: String, default: new Date().toISOString() },
});

export interface Response {
  reviewId: string;
  formId: string;
  answers: Object;
  rating: Number;
  reviewer: Object;
  createdOn: string;
}
