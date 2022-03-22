import express from 'express';
import mongoose from 'mongoose';
import { attachApplicationToJob } from './controllers/jobs';
import { initRabbitMQ, onMessage } from './rabbitmq';
import jobsRouter from './routers/jobs';

async function init() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/monoapp');
    await initRabbitMQ();

    const app = express();

    app.use(express.json());

    app.use('/api/jobs', jobsRouter);

    app.use((req, res) => {
        console.log(req.path)
        res.status(404).json({ message: 'not found' });
    });

    app.listen(3010, () => {
        console.log("Server started!");
    });

    onMessage('application', data => {
        console.log(data);
        attachApplicationToJob(data.jobId, data._id);
    });
}

init();