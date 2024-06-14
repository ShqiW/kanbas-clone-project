import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    course: { type: String, required: true },
    dueDate: String,
    availableFrom: String,
    availableUntil: String,
    numberOfQuestions: String,
    score: String
},
    { collection: "quizzes" });
export default quizSchema;