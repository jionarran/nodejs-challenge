import express, { Response, Request, NextFunction } from 'express';
import HandleError from './errors/HandleError';
import ConsumerDataService from './services/consumerData.services';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const consumer = new ConsumerDataService();
consumer.execute();

app.use((err: Error, _: Request, response: Response, next: NextFunction) => {
    if (err instanceof HandleError) {
        return response.status(err.status_code).json({
            status: 'error',
            message: err.msg
        });
    }

    // aqui o ideal é enviarmos esse erro para um error reporting

    return response.status(500).json({
        status: 'err',
        message: 'Internal Server Error'
    })
})

export default app;