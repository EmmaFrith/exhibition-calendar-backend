import 'dotenv/config';

// import path, { dirname } from 'path';

import { connectToDb } from './db/helpers.js';
import express from 'express';
// import { fileURLToPath } from 'url';
import { port } from './config/environment.js';

import exhibitionRouter from './controllers/exhibition.js';
import authRouter from './controllers/auth.js';
import userRouter from './controllers/user.js';


const app = express();

app.use(express.json());

app.use('/api', exhibitionRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

async function startServer() {
  try {
    await connectToDb();
    console.log('Database connected');
    app.listen(port, () => console.log(`Listening on Port: ${port}`));
  } catch (err) {
    console.log('Oh no something went wrong');
    console.log(err);
  }
}

startServer();
