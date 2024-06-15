import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: String,
    description: String,
    course: String,
    availableFrom: String,
    availableUntil: String,
    dueDate: String,
    points: String
},
    { collection: "assignments" }
);
export default assignmentSchema;

