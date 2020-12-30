import {
    AvailableSanityDocumentType,
    QueueItem,
    Queue,
    Processors,
    DocumentTypeProcessorsMap,
} from '../types';
import { showProcessors } from '../sanity';

/**
 *
 * @param documentType
 */
const selectDocumentTypeProcessors = (
    documentType: AvailableSanityDocumentType
): DocumentTypeProcessorsMap | null => {
    console.log(
        `Checking to see if processors exist for document type '${documentType}'...`
    );
    switch (documentType) {
        case 'artist':
            return null;

        case 'location':
            return null;

        case 'organization':
            return null;

        case 'show':
            return showProcessors;

        case 'season':
            return null;

        case 'sponsor':
            return null;

        default:
            return null;
    }
};

/**
 *
 * @param processors
 * @param queueItem
 */
const processQueueItem = (processors: Processors, queueItem: QueueItem) => {
    const { eventName, documentID } = queueItem;

    console.log(
        `There are ${processors.length} '${eventName}' event processors to run on document ${documentID}'...`
    );

    processors.forEach((processor) => {
        console.log(
            `Running function '${processor.name}' on document ${documentID}`
        );
        processor(documentID);
    });
};

/**
 *
 * @param queue
 */
export const processQueue = (queue: Queue) => {
    console.log(`------------`);
    console.log(`Starting to process the queue...`);
    console.log(`------------`);

    queue.forEach((queueItem) => {
        const { eventName, documentType } = queueItem;

        const typeProcessors = selectDocumentTypeProcessors(documentType);

        if (!typeProcessors) {
            console.log(
                `No processors found for document type '${documentType}'. Skipping.`
            );
            return null;
        }

        processQueueItem(typeProcessors[eventName], queueItem);
    });

    console.log('---------');
    console.log(
        'All documents in the queue have been processed! Work complete. Have a nice day :)'
    );
    console.log('---------');
};
