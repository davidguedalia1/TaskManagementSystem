import { Schema, model } from 'mongoose';

/**
 * Mongoose schema and model for the Task entity.
 */
interface ITask extends Document {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  projectId: Schema.Types.ObjectId;  // Reference to a Project
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
}, { timestamps: true });

export const Task = model<ITask>('Task', taskSchema);
