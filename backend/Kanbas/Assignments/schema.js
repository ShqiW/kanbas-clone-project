import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    course: { type: String, required: true },
    availableFrom: { type: String, required: true },
    availableUntil: { type: String, required: true },
    dueDate: { type: String, required: true },
    points: { type: String, required: true }
},
    { collection: "assignments" }
);
export default assignmentSchema;

