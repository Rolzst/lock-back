import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://omar:ckQ3JMLSeFamwy2O@lockbox.eara8.mongodb.net/?retryWrites=true&w=majority&appName=lockbox')
            .then(()=>console.log("conectado"))
            .catch(err=>console.log(err));
    } catch (error) {
        console.error(error);
    }
}