import asyncHandler from "express-async-handler";
import User from "../models/user";
import Project from "../models/project";
import checkMandatory from "#utilities/checkMandatory";
import validation from "#utilities/validation";
import userExists from "#utilities/userExists";
import throwError from "#utilities/throwError";
import ApiResponse from "#utilities/apiResponse";
import bcrypt from "bcrypt";
import owner from "#models/owner";
import jwt from "jsonwebtoken";
// import constants from "#constants";

// @desc Register new user
// @route POST /auth/register
// @access PUBLIC
const register = asyncHandler(async (req, res) => {
  const { fullname, username, email, password, owner, projectAssigned, role } = req.body;

  // check for mandatory fields
  checkMandatory(fullname, "Full name", res);
  checkMandatory(username, "Username", res);
  checkMandatory(email, "Email", res);
  checkMandatory(password, "Password", res);
  checkMandatory(role, "Role", res);

  // validate the email
  validation.validateEmail(email, res);

  // validate the password
  validation.validatePassword(password, res);

  // check if the user already exists
  if (await userExists.register(email, username, owner, projectAssigned)) {
    throwError(res, 400, "User already exists");
  }

  // work with files
  // let profileLocalPath;
  // try {
  //   profileLocalPath = req?.files?.profile[0]?.path;
  // } catch (error) {
  //   throwError(res, 400, "Profile cannot be blank");
  // }

  // const profile = await uploadOnCloudinary(profileLocalPath);

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const newUser = await User.create({
    fullname,
    username,
    email,
    password: hashedPassword,
    owner,
    projectAssigned,
    role,
  });

  // send verification email
  // try {
  //   await sendMail({
  //     email,
  //     emailType: constants.EmailTypes.VERIFY,
  //     userID: newUser.id,
  //   });
  // } catch (e) {
  //   console.log(e);
  // }

  const createdUser = await newUser.save();

  if (projectAssigned) {
    await Project.findByIdAndUpdate(
      projectAssigned,
      { $push: { users: createdUser._id } },
      { new: true }
    );
  }

  if (createdUser) {
    res
      .status(201)
      .json(ApiResponse.success(200, "User created successfully", createdUser));
  } else {
    throwError(res, 500, "Something went wrong while registering the user");
  }
});


// @desc Login
// @route POST /auth/login
// @access PUBLIC
const login = asyncHandler(async (req, res) => {
  const { value, password, owner, projectAssigned } = req.body;

  // check for mandatory fields
  checkMandatory(value, "Email or username", res);
  checkMandatory(password, "Password", res);

  // check if user exists
  const user = await userExists.login(value, owner, projectAssigned);
  if (user === -1) {
    throwError(res, 404, "User does not exists");
    return;
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throwError(res, 400, "Invalid Password");
  }

  // create token
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.TOKEN_SECRET as string,
    { expiresIn: process.env.TOKEN_EXPIRY }
  );

  res
    .status(200)
    .json(ApiResponse.success(200, "Logged In successfully", { token }));
});


export { register, login };
