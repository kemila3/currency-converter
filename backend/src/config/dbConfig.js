import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

export const url = {
    // db: 'mongodb://localhost:27017/yourDBName',
    api : `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
}