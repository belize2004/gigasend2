import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stripeCustomerId: { type: String },
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
