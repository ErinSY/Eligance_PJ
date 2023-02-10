import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
    required: true,
    default: [],
  },
  address: {
    type: String,
    requird: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  order_request: {
    type: String
  },
  status: {
    type: String,
    required: true,
    default: "배송 준비 중"
  }
},
  { timestamps: true }
);

const Order = model('Order', orderSchema);
export default Order;
