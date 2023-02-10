import { model, Schema } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  major_classification: {
    type: String,
    required: true,
  },
  minor_classification: {
    type: String,
    required: true,
  },
});

const Product = model('Product', productSchema);
export default Product;