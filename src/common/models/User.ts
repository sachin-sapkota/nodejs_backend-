import { model, Schema, Document } from 'mongoose';
import { UserDocument, UserModel } from '../../types';



const userSchema = new Schema<UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  user_type: { type: String, enum: ['user', 'agent'], required: true },
  address: { type: String },
  email_verified: { type: Boolean, default: false },
  user_verified: { type: Boolean, default: false },
}, {
  timestamps: true
});

export const User = model<UserModel>('User', userSchema);
