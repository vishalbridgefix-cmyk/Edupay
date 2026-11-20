
import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

tokenBlacklistSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const tokenBlacklistModel = mongoose.model(
  "TokenBlacklist",
  tokenBlacklistSchema
);

export default tokenBlacklistModel;
