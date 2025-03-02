import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

export const config = {
    db: process.env.MONGODB_URI,
}

export const dbConnect = () => {
    mongoose.connect(config.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Database connected');
    });
}