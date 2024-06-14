import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("moduleModel", schema);
export default model;