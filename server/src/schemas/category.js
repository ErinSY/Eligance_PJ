import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
  major_classification: {
    type: String,
    required: true,
  },
  minor_classification: {
    type: [String],
    required: true,
  },
});

const category = model('Category', categorySchema);
export default category;
