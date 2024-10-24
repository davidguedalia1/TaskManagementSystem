import { Schema, model } from 'mongoose';

/**
 * Mongoose schema and model for the Project entity.
 */
interface IProject extends Document {
  name: string;
  description: string;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: false },
}, { timestamps: true });

export const Project = model<IProject>('Project', projectSchema);
