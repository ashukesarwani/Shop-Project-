import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "PASTE_MONGODB_URL_HERE";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose.connect(MONGODB_URI);
};
