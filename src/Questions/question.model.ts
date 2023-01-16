import * as mongoose from 'mongoose';

export const QuestionsSchema = new mongoose.Schema({
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

export interface Question {
  formId: string;
  userId: string;
  index: Number;
  qnTitle: string;
  responses: number;
  qnType: string;
  qnId: string;
  qnState: boolean;
  videoURL: string;
  videoKey: string;
  createdOn: string;
}
