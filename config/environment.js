import dotenv from 'dotenv';
dotenv.config();

export const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/exhibition-calendar';
export const port = process.env.PORT || 4000;
export const secret = process.env.SECRET || 'hopper-dali-chicago';