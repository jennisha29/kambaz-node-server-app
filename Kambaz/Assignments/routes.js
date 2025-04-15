import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Get all assignments
  app.get("/api/assignments", async (req, res) => {
    try {
      const assignments = await assignmentsDao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ message: "Failed to fetch assignments" });
    }
  });

  // Get assignments for a course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching assignments for course:", error);
      res.status(500).json({ message: "Failed to fetch assignments" });
    }
  });

  // Get assignment by ID
  app.get("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignment = await assignmentsDao.findAssignmentById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.json(assignment);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ message: "Failed to fetch assignment" });
    }
  });

  // Create new assignment for a course
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignment = {
        ...req.body,
        course: courseId
      };
      const newAssignment = await assignmentsDao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ message: "Failed to create assignment" });
    }
  });

  // Update assignment
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const updates = req.body;
      const status = await assignmentsDao.updateAssignment(assignmentId, updates);
      
      // Check if the assignment was updated
      if (status.modifiedCount === 0) {
        return res.status(404).json({ message: "Assignment not found or no changes made" });
      }
      
      // Get the updated assignment to return
      const updatedAssignment = await assignmentsDao.findAssignmentById(assignmentId);
      res.json(updatedAssignment);
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ message: "Failed to update assignment" });
    }
  });

  // Delete assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const status = await assignmentsDao.deleteAssignment(assignmentId);
      
      // Check if the assignment was actually deleted
      if (status.deletedCount === 0) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ message: "Failed to delete assignment" });
    }
  });
}