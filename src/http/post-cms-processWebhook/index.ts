import arc from '@architect/functions';

import { PostRequest, Response } from '../../shared/global/types';

import { isValidProject, hasDocumentsToProcess } from './src/conditions';
import { buildQueue, processQueue } from './src/queue';

import { SanityCMSWebhook } from './src/types';

const parseBody = arc.http.helpers.bodyParser;

export async function handler(req: PostRequest): Response {
    const data: SanityCMSWebhook = parseBody(req);

    const { transactionId, projectId, ids } = data;

    if (!isValidProject(projectId)) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                transactionId,
                message: 'Invalid project ID. Shutting down.',
                projectId,
            }),
        };
    }

    if (!hasDocumentsToProcess(ids)) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                transactionId,
                message: 'No documents to process. Shutting down',
            }),
        };
    }

    // Build & process the queue
    const documentQueue = await buildQueue(ids);
    await processQueue(documentQueue);

    return {
        statusCode: 200,
        body: JSON.stringify({
            transactionId,
            message: 'All documents processed successfully.',
            documentsProcessed: ids.all,
        }),
    };
}
