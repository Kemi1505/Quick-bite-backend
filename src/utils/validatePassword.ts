import User, {UserDocument} from "../models/userModel";
import { omit } from "lodash";

export async function validatePassword({
    email,
    password,
}: {
    email: UserDocument["email"];
    password: string
}) {
    const user = await User.findOne({email});

    if(!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
        return false;
    }

    return omit(user.toJSON(), "password");
}