import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("QuizModel", schema)
export default model;