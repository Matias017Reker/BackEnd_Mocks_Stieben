import mongoose from "mongoose";

export const connectDB = async () => {
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/backend-mocks");
    console.log("MongoDB conectado");
} catch (error) {
    console.error("Error al conectar MongoDB", error);
    process.exit(1);
}
};