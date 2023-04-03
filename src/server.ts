import 'dotenv/config';
import 'express-async-errors';
import { dbConnect } from "./database/dbConnect";
// import ConsumerData from './services/consumerData';

import app from './index'

// dbConnect().then(() => {
    app.listen(process.env.PORT || 3333, () => {
        console.log('Server running');

    })
// });
