import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema({
    user: String,
    course: String,
},
    { collection: "enrollments" });

export default enrollmentSchema;