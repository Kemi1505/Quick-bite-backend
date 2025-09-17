import mongoose from "mongoose";
import config from 'config';

const connect = async ()=>{
    const dbUri = config.get('dbUri') as string;
    try{
        await mongoose.connect(dbUri)
        console.log("Database Connected")
    }
    catch(error){
        console.log("Database error", error)
        process.exit(1)
    }
}

export default connect