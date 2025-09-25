import { omit } from "lodash";
import { Model, Document } from "mongoose";

export async function validatePassword<T extends Document & { 
  email: string; 
  password: string; 
  comparePassword(candidate: string): Promise<boolean>; 
}>(
  Model: Model<T>,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  }
) {
  const user = await Model.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
