import { sanity } from './api';
import { SanityDocumentEvents } from '../types';
import { SANITY_EVENTS } from '../constants';
import { enumToArray } from '../../../../shared/global/utils';

const fetchDocumentType = async (documentID) => {
    const query = '*[_id == $documentID]._type';

    const { 0: documentType } = await sanity.fetch(query, { documentID });
    return documentType;
};

// TODO: Look into building a queue array with a tuple like [event, documentType, documentID] instead of re-creating an object map from this function. Then processing is a simple forEach loop instead of another nested loop
export const getDocumentTypeMap = async (
    documentEvents: SanityDocumentEvents
): Promise<any> => {
    const eventMap = {};

    // Create array of sanity document events
    const sanityEvents = enumToArray(SANITY_EVENTS);

    // loop over each event in above array (forEach cannot use async/await)
    for (const EVENT of sanityEvents) {
        console.log(`About to map ${EVENT} document types`);

        // Get tuple map of [documentID, documentType]
        const map = await Promise.all(
            documentEvents[EVENT].map(async (documentID) => {
                const documentType = await fetchDocumentType(documentID);
                return [documentID, documentType];
            })
        );

        // Only build an object reference for events that have documents
        // Object will have a signature like {event: [documentID, documentType]}
        if (documentEvents[EVENT].length > 0) {
            eventMap[EVENT] = map;
        }
    }

    return eventMap;
};
