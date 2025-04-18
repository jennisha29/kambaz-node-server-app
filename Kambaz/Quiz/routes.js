import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await quizzesDao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    try {
      const { courseId } = req.params;
      const quizzes = await quizzesDao.findQuizzesForCourse(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes for course:", error);
      res.status(500).json({ message: "Failed to fetch quizzes" });
    }
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await quizzesDao.findQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ message: "Failed to fetch quiz" });
    }
  });

  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    try {
      const { courseId } = req.params;
      const quiz = {
        ...req.body,
        course: courseId
      };
      const newQuiz = await quizzesDao.createQuiz(quiz);
      res.json(newQuiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ message: "Failed to create quiz" });
    }
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    try {
      const { quizId } = req.params;
      const updates = req.body;
      const status = await quizzesDao.updateQuiz(quizId, updates);
      
      if (status.modifiedCount === 0) {
        return res.status(404).json({ message: "Quiz not found or no changes made" });
      }
      
      const updatedQuiz = await quizzesDao.findQuizById(quizId);
      res.json(updatedQuiz);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ message: "Failed to update quiz" });
    }
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    try {
      const { quizId } = req.params;
      const status = await quizzesDao.deleteQuiz(quizId);
      
      if (status.deletedCount === 0) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({ message: "Failed to delete quiz" });
    }
  });

  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    try {
      const { quizId } = req.params;
      const { published } = req.body;
      
      const status = await quizzesDao.publishQuiz(quizId, published);
      
      if (status.modifiedCount === 0) {
        return res.status(404).json({ message: "Quiz not found or no changes made" });
      }
      
      const updatedQuiz = await quizzesDao.findQuizById(quizId);
      res.json(updatedQuiz);
    } catch (error) {
      console.error("Error updating quiz publish status:", error);
      res.status(500).json({ message: "Failed to update quiz publish status" });
    }
  });

  app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
    try {
      const { quizId } = req.params;
      const attempt = {
        ...req.body,
        quiz: quizId
      };
      
      const newAttempt = await quizzesDao.createQuizAttempt(attempt);
      res.json(newAttempt);
    } catch (error) {
      console.error("Error creating quiz attempt:", error);
      res.status(500).json({ message: "Failed to create quiz attempt" });
    }
  });

  app.get("/api/quizzes/:quizId/attempts/:userId", async (req, res) => {
    try {
      const { quizId, userId } = req.params;
      const attempts = await quizzesDao.findQuizAttemptsForUser(quizId, userId);
      res.json(attempts);
    } catch (error) {
      console.error("Error fetching quiz attempts for user:", error);
      res.status(500).json({ message: "Failed to fetch quiz attempts" });
    }
  });

  app.get("/api/quizzes/:quizId/attempts", async (req, res) => {
    try {
      const { quizId } = req.params;
      const attempts = await quizzesDao.findAllQuizAttempts(quizId);
      res.json(attempts);
    } catch (error) {
      console.error("Error fetching all quiz attempts:", error);
      res.status(500).json({ message: "Failed to fetch quiz attempts" });
    }
  });

  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    try {
      const { quizId } = req.params;
      const question = req.body;
      
      const updatedQuiz = await quizzesDao.addQuestionToQuiz(quizId, question);
      res.json(updatedQuiz);
    } catch (error) {
      console.error("Error adding question:", error);
      res.status(500).json({ message: "Failed to add question" });
    }
  });

  app.put("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    try { 
      const { quizId, questionId } = req.params;
      const updates = req.body;
      
      const updatedQuiz = await quizzesDao.updateQuizQuestion(quizId, questionId, updates);
      res.json(updatedQuiz);
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ message: "Failed to update question" });
    }
  });

  app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
    try {
      const { quizId, questionId } = req.params;
      
      const updatedQuiz = await quizzesDao.deleteQuizQuestion(quizId, questionId);
      res.json(updatedQuiz);
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ message: "Failed to delete question" });
    }
  });
}