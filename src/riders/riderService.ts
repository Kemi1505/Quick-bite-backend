import Rider,{RiderDocument} from "./riderModel";

type RiderInput = Omit<RiderDocument, "createdAt" | "updatedAt" | "comparePassword">;

export async function createRider(input: RiderInput) {
    try {
        return await Rider.create(input);
    } catch (error: any ) {
        throw new Error(error)
    }
}