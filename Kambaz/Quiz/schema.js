import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean
}, { _id: false });

const questionSchema = new mongoose.Schema({
  _id: String,
  title: String,
  questionType: {
    type: String, 
    enum: ['Multiple Choice', 'True/False', 'Fill in the Blank'],
    default: 'Multiple Choice'
  },
  points: { type: Number, default: 10 },
  questionText: String,
  choices: [String],
  correctAnswer: mongoose.Schema.Types.Mixed // Can be String, Boolean, Array, or Number
}, { _id: false });

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    points: { type: Number, default: 0 },
    dueDate: Date,
    availableFromDate: Date,
    availableUntilDate: Date,
    course: { type: String, ref: "CourseModel" },
    published: { type: Boolean, default: false },
    quizType: { 
      type: String, 
      enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'],
      default: 'Graded Quiz'
    },
    assignmentGroup: { 
      type: String, 
      enum: ['Quizzes', 'Exams', 'Assignments', 'Project'],
      default: 'Quizzes'
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    attempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: true },
    accessCode: String,
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    questions: [questionSchema]
  },
  { collection: "quizzes" }
);

export default quizSchema;