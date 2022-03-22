import express from 'express';
import mongoose from 'mongoose';
import jobsRouter from './routers/jobs';
import applicationsRouter from './routers/applications';

async function init() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/monoapp');

    const app = express();

    app.use(express.json());

    app.use('/api/jobs', jobsRouter);
    app.use('/api/applications', applicationsRouter);

    app.use((req, res) => {
        console.log(req.path)
        res.status(404).json({ message: 'not found' });
    });

    app.listen(3010, () => {
        console.log("Server started!");
    });
}

init();