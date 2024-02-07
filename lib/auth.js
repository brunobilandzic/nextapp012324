import dbConnect from "./db/mongooseConnect";
import AppUser from "../models/auth/AppUser";
import { compare, hash } from "bcryptjs";

export const getOrCreateUser = async ({ email }) => {
  await dbConnect();
  let user = await AppUser.findOne({ email });
  if (!user) {
    user = new AppUser({
      username: email.split("@")[0],
      email,
    });
    await user.save();
  }
  return user;
};

export const validateCredentials = async ({ username, password }) => {
  await dbConnect();
  const user = await AppUser.findOne({ username });
  if (!user) {
    return null;
  }
  const isValid = await isPasswordValid(password, user.password);

  if (isValid) {
    return user;
  }

  return null;
};

export const signUpUser = async ({ email, password, username }) => {
  await dbConnect();

  const user = await AppUser.findOne({ email });

  if (user) {
    console.log("User already exists");
    return null;
  }

  const newUser = new AppUser({
    email,
    password: await hashPassword(password),
    username,
  });

  await newUser.save();
  return newUser;
};

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function isPasswordValid(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
