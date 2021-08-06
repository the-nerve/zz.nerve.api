import { sanity } from '../sanity';

import {
    AvailableSanityActionableEvent,
    AvailableSanityDocumentType,
    SanityDocumentEvents,
    DocumentID,
    QueueItem,
} from '../types';

import { SANITY_ACTIONABLE_EVENTS } from '../constants';
import { asyncForEach } from '../../../../shared/utils';

/**
 * Fetch a single document from Sanity based on the Document ID
 * and get the Type of that document
 *
 * @param documentID The ID of the document to get from Sanity
 */
const fetchDocumentType = async (
    documentID: DocumentID
): Promise<AvailableSanityDocumentType> => {
    const query = '*[_id == $documentID]._type';

    console.log(`Fetching type for document '${documentID}'...`);

    const { 0: documentType } = await sanity
        .fetch(query, { documentID })
        .catch((error) =>
            console.log(
                'Error encountered while attempting to fetch Document Type from the Sanity API: ',
                error
            )
        );

    console.log(`Document '${documentID}' has a type of '${documentType}'`);

    return documentType;
};

/**
 * Build a queue of documents that need to be processed
 *
 * @param documents The ID of all of the documents within the current event that need to be processed
 * @param eventName The name of the Sanity event we are currently working with
 */
const createQueueItems = async (
    documents: DocumentID[],
    eventName: AvailableSanityActionableEvent
): Promise<QueueItem[]> => {
    console.log(`Building document queue for the '${eventName}' event...`);

    return Promise.all(
        documents.map(
            async (documentID: DocumentID): Promise<QueueItem> => {
                const documentType = await fetchDocumentType(documentID);
                console.log(`Adding document '${documentID}' to the queue.`);
                return { eventName, documentType, documentID };
            }
        )
    );
};

/**
 * Create a queue of documents that need to be processed. These documents
 * should be grouped with the triggering event, document type and document ID
 *
 * @param documentEvents The documents that were modified according to the Sanity Webhook payload
 */
export const buildQueue = async (
    documentEvents: SanityDocumentEvents
): Promise<QueueItem[]> => {
    console.log('---------');
    console.log('Starting to build the queue...');
    console.log('---------');

    const queue: QueueItem[] = [];

    await asyncForEach(
        SANITY_ACTIONABLE_EVENTS,
        async (EVENT: AvailableSanityActionableEvent) => {
            // Don't do any work on events with no modified documents
            if (documentEvents[EVENT].length === 0) {
                console.log(
                    `The '${EVENT}' event contains no documents to process and is being omitted.`
                );
                return;
            }

            const queueItems = await createQueueItems(
                documentEvents[EVENT],
                EVENT
            );
            queue.push(...queueItems);
        }
    );

    console.log(`------------`);
    console.log(
        'The queue has been built and is prepared for processing: ',
        queue
    );

    return queue;
};
