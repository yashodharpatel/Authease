// import mongoose from "mongoose";


import mongoose, { Document, Schema } from "mongoose";
// import findOrCreate from "mongoose-findorcreate";


// Define the IOwner interface for the User document
interface IOwner {
  fullname: string;
  username: string;
  email: string;
  password?: string;
  googleID?: string;
  githubID?: string;
  // profile: string; // Uncomment if using cloudinary url for profile image
  projects?: Array<{ projectId: mongoose.Types.ObjectId | string }>; // Array of user references
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

// Extend the Document interface with IUser to create IUserDocument
interface IOwnerDocument extends IOwner, Document {
  // Add any additional methods or properties specific to your schema here
  _id: mongoose.Types.ObjectId;
}

const OwnerSchema: Schema<IOwnerDocument> = new Schema(
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
    password: {
      type: String,
      // required: [true, "Please provide a password"],
      default: "",
      select: false
    },
    googleID: {
      type: String,
      default: ""
    },
    githubID: {
      type: String,
      default: ""
    },
    // profile: {
    //     type: String, // cloudinary url
    //     required: true,
    // },
    projects: [
      {
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      },
    ],
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


// Apply the findOrCreate plugin to the schema
// OwnerSchema.plugin(findOrCreate);

const Owner = mongoose.model<IOwnerDocument>("Owner", OwnerSchema);

export default Owner;

export {IOwner, IOwnerDocument};
// ownerSchema.plugin(findOrCreate);

// export default mongoose.model("Owner", ownerSchema);
