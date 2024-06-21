import 'dotenv/config';

import { connectToDb } from '../../db/helpers.js';

import express from 'express';



import exhibitionRouter from '../../controllers/exhibition.js';

import authRouter from '../../controllers/auth.js';

import userRouter from '../../controllers/user.js';

import cors from 'cors' // Added this new import
import serverless from "serverless-http"  // added this new import


const app = express();

app.use(express.json());

app.use(cors())

app.use('/api', exhibitionRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

async function startServer() {
  try {
    await connectToDb();
    console.log('Database connected');
  } catch (err) {
    console.log('Oh no something went wrong');
    console.log(err);
  }
}

startServer();

export const handler = serverless(app)

