import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", async (req, res) => {
    try {
      const enrollments = await enrollmentsDao.findAllEnrollments();
      res.json(enrollments);
    } catch (error) {
      console.error("Error finding all enrollments:", error);
      res.status(500).send(error.message);
    }
  });

  app.get("/api/users/:userId/enrollments", async (req, res) => {
    try {
      const { userId } = req.params;
      const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error finding enrollments for user:", error);
      res.status(500).send(error.message);
    }
  });

  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const enrollments = await enrollmentsDao.findEnrollmentsForCourse(courseId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error finding enrollments for course:", error);
      res.status(500).send(error.message);
    }
  });

  app.post("/api/enrollments", async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.json(enrollment);
    } catch (error) {
      console.error("Error enrolling user in course:", error);
      res.status(500).send(error.message);
    }
  });

  app.delete("/api/enrollments", async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error unenrolling user from course:", error);
      res.status(500).send(error.message);
    }
  });
}