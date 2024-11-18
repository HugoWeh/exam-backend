import mongoose from "mongoose";
import { userSchema } from "@/schemas/userSchema";

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
