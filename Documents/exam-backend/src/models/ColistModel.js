import mongoose from "mongoose";
import { colistSchema } from "@/schemas/colistSchema";

export const ColistModel =
  mongoose.models.Colist || mongoose.model("Colist", colistSchema);
