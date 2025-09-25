import Vendor, {VendorDocument} from "./vendorsModel";

type VendorInput = Omit<VendorDocument, "createdAt" | "updatedAt" | "comparePassword">;

export async function createVendor(input: VendorInput) {
    try {
        return await Vendor.create(input);
    } catch (error: any ) {
        throw new Error(error)
    }
}