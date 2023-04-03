import mongoose from 'mongoose';

const mongo_uri = process.env.MONGO_URI || '';

export const dbConnect = async () => {
    return mongoose.connect(mongo_uri);
};