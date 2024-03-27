import mongoose, { Schema } from "mongoose";
 
const topicSchema = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        body: { type: String, required: false },
        author: { type: String, required: false },
        authorName: { type: String, required: false },
        authorEmail: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);
 
const TaskModel = mongoose.models.Task || mongoose.model("Task", topicSchema);
 
export default TaskModel;