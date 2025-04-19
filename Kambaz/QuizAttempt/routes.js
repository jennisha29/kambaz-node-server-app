import * as dao from "./dao.js";

export default function QuizAttemptRoutes(app) {
  const createQuizAttempt = async (req, res) => {
    try {
      const attempt = await dao.createQuizAttempt(req.body);
      res.json(attempt);
    } catch (err) {
      console.error("Error creating quiz attempt:", err);
      res.status(500).json({ error: "Failed to create quiz attempt" });
    }
  };
  const findAttemptsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const attempts = await dao.findAttemptsByUserId(userId);
      res.json(attempts);
    } catch (err) {
      console.error("Error fetching attempts:", err);
      res.status(500).json({ error: "Failed to fetch quiz attempts" });
    }
  };

  app.post("/api/quiz-attempts", createQuizAttempt);
  app.get("/api/quiz-attempts/:userId", findAttemptsByUserId);
}
