import mongoose, { Document, Schema } from "mongoose";

// Define the IProject interface representing a Project document in MongoDB
interface IProject {
  name: string;
  description?: string;
  projectOwner: mongoose.Types.ObjectId | string; // Reference to the Owner document
  users?: Array<{ userId: mongoose.Types.ObjectId | string }>; // Array of user references
}

// Define the IProjectDocument interface that extends both IProject and Document
interface IProjectDocument extends IProject, Document {
  _id: mongoose.Types.ObjectId;
}

const ProjectSchema: Schema<IProjectDocument> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid Project name"],
    },
    description: {
      type: String,
      maxlength: [500, "Please provide a valid Project description."],
    },
    projectOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    users: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model<IProjectDocument>("Project", ProjectSchema);

export default Project;

export { IProject, IProjectDocument };
