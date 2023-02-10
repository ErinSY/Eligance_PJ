import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.error(error));
};
export default connect;
