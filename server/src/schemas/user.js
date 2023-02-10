import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    order: {
      type: [Schema.Types.ObjectId],
      ref: 'Order',
      default: [],
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);
export default User;
