import {
    AvailableSanityDocumentType,
    QueueItem,
    Queue,
    Processors,
    DocumentTypeProcessorsMap,
    Processor,
} from '../types';
import { showProcessors } from '../sanity';
import { asyncForEach } from '../../../../shared/utils';

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
const processQueueItem = async (
    processors: Processors,
    queueItem: QueueItem
) => {
    const { eventName, documentID } = queueItem;

    console.log(
        `There are ${processors.length} '${eventName}' event processors to run on document ${documentID}'...`
    );

    await asyncForEach(processors, async (processor: Processor) => {
        console.log(
            `Running function '${processor.name}' on document ${documentID}`
        );
        await processor(documentID);
    });
};

/**
 *
 * @param queue
 */
export const processQueue = async (queue: Queue) => {
    console.log(`------------`);
    console.log(`Starting to process the queue...`);
    console.log(`------------`);

    await asyncForEach(queue, async (queueItem: QueueItem) => {
        const { eventName, documentType } = queueItem;

        const typeProcessors = selectDocumentTypeProcessors(documentType);

        if (!typeProcessors) {
            console.log(
                `No processors found for document type '${documentType}'. Skipping.`
            );
            return null;
        }

        await processQueueItem(typeProcessors[eventName], queueItem);
    });

    console.log('---------');
    console.log(
        'All documents in the queue have been processed! Work complete. Have a nice day :)'
    );
    console.log('---------');
};
