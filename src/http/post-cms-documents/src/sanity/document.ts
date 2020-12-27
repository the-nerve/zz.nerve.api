import { sanity } from './api';
import { SanityDocumentEvents } from '../types';
import { SANITY_EVENTS } from '../constants';

// export const isDocumentType = (type, document) => {};
export const getDocumentTypeMap = async (
    documentevents: SanityDocumentEvents
): Promise<any> => {
    // Create array of sanity document events (maybe at constant level?)
    // loop over each event in above array w/ map
    // map over IDs in event and query sanity data
    // return tuple for each ID in an event like `created: {[documentID, documentType]}`
};
