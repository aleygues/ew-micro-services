import { Schema, model } from 'mongoose';

const endpoint = process.env.APPLICATION_ENDPOINT || 'http://localhost:3010';

export interface IJob {
    _id: string;
    title: string;
    description: string;
    location: string;
    applicationsIds: string[];
}

const schema = new Schema<IJob>({
    title: String,
    description: String,
    location: String,
    applicationsIds: [Schema.Types.ObjectId]
});

schema.virtual('applicationUrl').get((_: unknown, __: unknown, doc: IJob) => {
    return `${endpoint}/api/jobs/${doc._id}/applications`;
});

schema.virtual('applications').get((_: unknown, __: unknown, doc: IJob) => {
    return doc.applicationsIds.map((applicationId) => `${endpoint}/api/applications/${applicationId}`);
});

schema.set('toJSON', { getters: true });

const JobModel = model('Job', schema);

export default JobModel;