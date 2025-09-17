import User, {UserDocument} from "../models/userModel";

type UserInput = Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">;

export async function createUser(input: UserInput) {
    try {
        return await User.create(input);
    } catch (error: any ) {
        throw new Error(error)
    }
}