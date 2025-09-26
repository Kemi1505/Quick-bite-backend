import bcrypt from "bcrypt";

export async function hashPassword(this:any){
    if (!this.isModified('password'))
        return;
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;   
    } catch (error) {
        return (error)
    }
}

export async function comparePassword(this: any,candidatePassword: string): Promise<boolean>{ 
    return bcrypt.compare(candidatePassword, this.password).catch((e) => false)
}