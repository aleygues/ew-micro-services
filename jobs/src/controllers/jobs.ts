import { Request, Response } from 'express';
import JobModel from '../models/Job';

export async function attachApplicationToJob(jobId: string, applicationId: string): Promise<void> {
    const job = await JobModel.findById(jobId);
    if (job) {
        job.applicationsIds.push(applicationId);
        await job.save();
    }
}

// add "application url" to manage services then, based on an env var
export async function readAll(req: Request, res: Response) {
    res.json(await JobModel.find());
}

export async function readOne(req: Request, res: Response) {
    res.json(await JobModel.findById(req.params.id));
}

export async function create(req: Request, res: Response) {
    res.json(await JobModel.create(req.body));
}