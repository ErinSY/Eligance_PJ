import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';

import connect from './schemas/index.js';
import userRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category.js';
import orderRouter from './routes/order.js';
import admin from './middlewares/admin.js';
//import passportConfig from './passport/index.js';
//import passport from 'passport';

const app = express();
app.use(express.json());

// cross-origin
const corsConfig = {
  origin: 'http://localhost:3000/',
  credential: true,
};
app.use(cors());

app.use('/uploads', express.static('uploads'));

//DB connet
connect();

//router
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/admin', admin, adminRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log('server is running');
});
