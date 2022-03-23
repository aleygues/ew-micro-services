import { Schema, model } from 'mongoose';

export interface IApplication {
    resume: string;
    jobId: string;
    wordCount: number;
}

const schema = new Schema({
    // filepath
    resumeFilename: String,
    jobId: Schema.Types.ObjectId,
    wordCount: Number
});

const ApplicationModel = model('Application', schema);

export default ApplicationModel;