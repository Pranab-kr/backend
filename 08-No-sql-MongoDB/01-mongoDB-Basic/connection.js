import mongoose from "mongoose";

export const connectMongoDB = async (connectionURI) => {
  const connection = await mongoose.connect(connectionURI);
  return connection;
}
