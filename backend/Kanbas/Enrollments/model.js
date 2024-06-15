import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("enrollmentModel", schema)
export default model;