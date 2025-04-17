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
  // Generate IDs for the quiz and any questions
  const newQuiz = { 
    ...quiz, 
    _id: uuidv4(),
    questions: (quiz.questions || []).map(question => ({
      ...question,
      _id: uuidv4()
    }))
  };
  
  // Calculate total points based on questions
  if (newQuiz.questions && newQuiz.questions.length > 0) {
    newQuiz.points = newQuiz.questions.reduce((sum, q) => sum + q.points, 0);
  }
  
  return model.create(newQuiz);
};

export const updateQuiz = async (quizId, quizUpdates) => {
  // If updating questions, ensure they have IDs
  if (quizUpdates.questions) {
    quizUpdates.questions = quizUpdates.questions.map(question => ({
      ...question,
      _id: question._id || uuidv4()
    }));
    
    // Recalculate total points
    quizUpdates.points = quizUpdates.questions.reduce((sum, q) => sum + q.points, 0);
  }
  
  return model.updateOne({ _id: quizId }, { $set: quizUpdates });
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

// For quiz attempts
export const createQuizAttempt = async (attempt) => {
  // This would be in a separate model in a real implementation
  // For now, we'll just mock it to match client expectations
  return { ...attempt, _id: uuidv4() };
};

export const findQuizAttemptsForUser = async (quizId, userId) => {
  // Mock implementation - would query a separate attempts collection in real app
  return [];
};

export const findAllQuizAttempts = async (quizId) => {
  // Mock implementation - would query a separate attempts collection in real app
  return [];
};