import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: String,
  quiz: String,
  points: Number,
  attempts: Number,
  questions: { type: Array, default: [] }
},
    { collection: "history" });

export default historySchema;
