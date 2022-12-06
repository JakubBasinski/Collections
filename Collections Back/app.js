import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv'
import multer from 'multer'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const USER = process.env.MONGO_USER;
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

const storage = multer.memoryStorage()
const upload = multer({ storage }).single('image');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(userRoutes)

mongoose
  .connect(
    `mongodb+srv://${USER}:${PASSWORD}@pierwszycluster.ram8q.mongodb.net/Collections?authSource=admin&replicaSet=atlas-cx3nkc-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log('CONNECTED TO MONGODB COLLECTIONS');
    app.listen(PORT);
  
  })
  .catch((err) => console.log(err));
