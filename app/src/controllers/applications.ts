import { Request, Response } from 'express';
import fs from 'fs';
import ApplicationModel from '../models/Application';
import { attachApplicationToJob } from './jobs';

function processFile(filePath: string): number {
    const allFileContents = fs.readFileSync(filePath, 'utf-8');
    const lines = allFileContents.split(/(?:\r\n|\r|\n)/g);
    const regex = /lorem|impsum/ig;
    let totalWordCount = 0;
    for (const line of lines) {
        const matches = line.match(regex);
        const lineWordCount = matches ? matches.length - 1 : 0;
        totalWordCount += lineWordCount;
    }
    return totalWordCount;
}

export async function create(req: Request, res: Response) {
    if (req.file) {
        const doc = await ApplicationModel.create({
            resumeFilename: req.file.filename,
            wordCount: processFile(req.file.path),
            jobId: req.params.id
        });
        await attachApplicationToJob(req.params.id, doc._id);
        res.json(doc);
    } else {
        res.status(400).json({ message: 'missing resume'});
    }
}

export async function readOne(req: Request, res: Response) {
    res.json(await ApplicationModel.findById(req.params.id));
}