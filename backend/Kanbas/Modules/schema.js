import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    course: String,
    lessons: [{
        id: String,
        name: { type: String, required: true },
        description: String,
        module: String
    }]
},
    { collection: "modules" }
);
export default moduleSchema;



