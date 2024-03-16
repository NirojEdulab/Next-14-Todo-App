import mongoose from "mongoose"


export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://admin:admin123@cluster0.550gql4.mongodb.net/next-todo-app');
    console.log("Database connection established...");
}