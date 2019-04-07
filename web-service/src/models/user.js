import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
  },
  { collection: 'users' }
);

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);

UserSchema.index({ username: 1 });

export default mongoose.model('User', UserSchema);
