import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    answer: mongoose.Schema.Types.Mixed,
    correct: { type: Boolean, required: true },
  },
  { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    user: { type: String, required: true, ref: "UserModel" },
    quiz: { type: String, required: true, ref: "QuizModel" },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    answers: [answerSchema],
    score: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "quiz_attempts" }
);

export default quizAttemptSchema;
