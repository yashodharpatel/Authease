import User, { IUserDocument } from "#models/user";
import { Types } from "mongoose";

const register = async (
  email: string,
  username: string,
  owner: Types.ObjectId,
  projectAssigned: Types.ObjectId
): Promise<boolean> => {
  const user = await User.findOne({
    $and: [
      {
        $or: [{ email: email }, { username: username }],
      },
      { owner: owner },
      { projectAssigned: projectAssigned },
    ],
  });

  // If a user is found, return true, otherwise return false
  return !!user;
};

const login = async (
  value: string,
  owner: Types.ObjectId,
  projectAssigned: Types.ObjectId
): Promise<IUserDocument | -1> => {
  const user = await User.findOne({
    $and: [
      {
        $or: [{ email: value }, { username: value }],
      },
      { owner: owner },
      { projectAssigned: projectAssigned },
    ],
  });

  // Return the user as a plain object or -1 if not found.
  return user ? (user.toObject() as IUserDocument) : -1;
};

export default { register, login };