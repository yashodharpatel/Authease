import mongoose, { Document, Schema } from "mongoose";

// Define the IUser interface for the User document
interface IUser {
  fullname: string;
  username: string;
  email: string;
  password: string;
  owner: mongoose.Types.ObjectId | string; // Reference to Owner document
  projectAssigned: mongoose.Types.ObjectId | string; // Reference to Project document
  // profile: string; // Uncomment if using cloudinary url for profile image
  role?: string;
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

// Extend the Document interface with IUser to create IUserDocument
interface IUserDocument extends IUser, Document {
  // Add any additional methods or properties specific to your schema here
  _id: mongoose.Types.ObjectId;
}

// Define the Mongoose schema for the User model
const UserSchema: Schema<IUserDocument> = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please provide a full name"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    // profile: {
    //   type: String, // cloudinary url
    //   required: true,
    // },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
    projectAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    role: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// Create and export the User model based on the schema
const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;

// Optionally export the IUser interface for use elsewhere if needed.
export { IUser, IUserDocument };