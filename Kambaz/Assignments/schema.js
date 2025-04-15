import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    points: Number,
    dueDate: Date,
    availableFromDate: String, 
    course: { type: String, ref: "CourseModel" },
    module: { type: String, ref: "ModuleModel" }
  },
  { collection: "assignments" }
);

export default assignmentSchema;