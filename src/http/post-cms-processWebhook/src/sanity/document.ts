import { sanity } from './api';
import {
    AvailableSanityDocumentEvent,
    AvailableSanityDocumentType,
    SanityDocumentEvents,
    DocumentID,
    QueueItem,
    DocumentQueue,
} from '../types';
import { SANITY_EVENTS } from '../constants';
import { enumToArray } from '../../../../shared/global/utils';

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

    const { 0: documentType } = await sanity.fetch(query, { documentID });

    return documentType;
};

/**
 *
 * @param documents
 * @param eventName
 */
const createQueueItems = async (
    documents: DocumentID[],
    eventName: AvailableSanityDocumentEvent
): Promise<DocumentQueue> =>
    Promise.all(
        documents.map(
            async (documentID: DocumentID): Promise<QueueItem> => {
                const documentType = await fetchDocumentType(documentID);
                return [eventName, documentType, documentID];
            }
        )
    );

/**
 * Create a queue of documents that need to be processed. These documents
 * should be grouped with the triggering event, document type and document ID
 * This signature looks like [event, type, id]
 *
 * @param modifiedDocuments
 */
export const buildDocumentQueue = async (
    modifiedDocuments: SanityDocumentEvents
): Promise<DocumentQueue[]> => {
    // Create array of sanity document events
    const sanityEvents = enumToArray(
        SANITY_EVENTS
    ) as AvailableSanityDocumentEvent[];

    return Promise.all(
        sanityEvents.map(async (EVENT) => {
            const queueItems = await createQueueItems(
                modifiedDocuments[EVENT],
                EVENT
            );

            return queueItems;
        })
    );
};
