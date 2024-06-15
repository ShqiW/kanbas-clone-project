import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema({
    user_id: String,
    course_id: String,
},
    { collection: "enrollments" });

export default enrollmentSchema;