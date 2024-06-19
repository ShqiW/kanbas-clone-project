import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("HistoryModel", schema)
export default model;