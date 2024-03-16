import mongoose, { Schema } from "mongoose";
 
const topicSchema = new Schema(
    {
        name: { type: String, required: false },
        category: { type: String, required: false },
        body: { type: String, required: false },
        author: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);
 
const TaskModel = mongoose.models.Task || mongoose.model("Task", topicSchema);
 
export default TaskModel;