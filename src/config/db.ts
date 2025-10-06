import mongoose from "mongoose";
import colors from "colors";

export  const connectDb = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.cyan.bold(`MongoDB Conectada en ${url}`))
    } catch (error) {
        console.log(colors.bgRed.white.bold(error))
    }
}