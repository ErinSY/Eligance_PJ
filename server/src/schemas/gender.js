import { model, Schema } from 'mongoose';

const genderSchema = new Schema({
  gender: {
    type: [String],
    required: true,
  }
});

const gender = model('Gender', genderSchema);
export default gender;
