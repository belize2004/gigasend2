import { Schema, models, model } from 'mongoose';

const ShareSchema = new Schema<Share>({
  email: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default models.Share || model<Share>('Share', ShareSchema);
