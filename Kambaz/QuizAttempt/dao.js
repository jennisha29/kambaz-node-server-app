import mongoose from "mongoose";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createQuizAttempt = async (attemptData) => {
  const attempt = new model({ ...attemptData, _id: uuidv4() });
  return await attempt.save();
};

export const findAttemptsByUserId = async (userId) => {
  return await model.find({ user: userId });
};

export default {
  createQuizAttempt,
  findAttemptsByUserId,
};
