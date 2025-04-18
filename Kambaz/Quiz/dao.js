import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findAllQuizzes = () => {
return model.find();
};

export const findQuizzesForCourse = (courseId) => {
return model.find({ course: courseId });
};

export const findQuizById = (quizId) => {
return model.findById(quizId);
};

export const createQuiz = (quiz) => {

const newQuiz = {
    ...quiz,
_id: uuidv4(),
questions: (quiz.questions || []).map(question => ({
    ...question,
_id: uuidv4()
}))
};

if (newQuiz.questions && newQuiz.questions.length > 0) {
newQuiz.points = newQuiz.questions.reduce((sum, q) => sum + q.points, 0);
}

return model.create(newQuiz);
};


export const updateQuiz = async (quizId, quizUpdates) => {
if (quizUpdates.questions) {
quizUpdates.questions = quizUpdates.questions.map(question => ({
...question,
_id: question._id || uuidv4()
}));


if (quizUpdates.questions.length > 0) {
    quizUpdates.points = quizUpdates.questions.reduce((sum, q) => sum + (q.points || 0), 0);
}
}

return model.updateOne({ _id: quizId }, { $set: quizUpdates });
};

export const addQuestionToQuiz = async (quizId, question) => {
    if (!question._id) {
    question._id = uuidv4();
    }

const quiz = await model.findById(quizId);
if (!quiz) {
throw new Error("Quiz not found");
}

if (!quiz.questions) {
quiz.questions = [];
}

quiz.questions.push(question);

quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);

await quiz.save();
return quiz;
};

export const updateQuizQuestion = async (quizId, questionId, questionUpdates) => {
try {

const quiz = await model.findById(quizId);
if (!quiz) {
console.log(`Quiz with ID ${quizId} not found`);
throw new Error("Quiz not found");
}


if (!quiz.questions) {
quiz.questions = [];
}

const questionIndex = quiz.questions.findIndex(q => q._id === questionId);

if (questionIndex === -1) {

if (questionUpdates._id === questionId) {
quiz.questions.push(questionUpdates);

quiz.points = quiz.questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0);

await quiz.save();
return quiz;
}

throw new Error("Question not found");
}

const updatedQuestion = {
    ...quiz.questions[questionIndex],
...questionUpdates
};

quiz.questions[questionIndex] = updatedQuestion;

quiz.points = quiz.questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0);

await quiz.save();

return quiz;
} catch (error) {
throw error; 
}
};

export const deleteQuiz = (quizId) => {
return model.deleteOne({ _id: quizId });
};

export const publishQuiz = async (quizId, publishStatus) => {
return model.updateOne(
    { _id: quizId },
    { $set: { published: publishStatus } }
);
};

export const deleteQuizQuestion = async (quizId, questionId) => {
const quiz = await model.findById(quizId);
if (!quiz) {
throw new Error("Quiz not found");
}

quiz.questions = quiz.questions.filter(q => q._id !== questionId);

quiz.points = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);

await quiz.save();
return quiz;
};

export const createQuizAttempt = async (attempt) => {

return { ...attempt, _id: uuidv4() };
};

export const findQuizAttemptsForUser = async (quizId, userId) => {
return [];
};

export const findAllQuizAttempts = async (quizId) => {
return [];
};