import { Schema } from "mongoose";

export const colistSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
  coAuthors: { type: String, required: true },
});
