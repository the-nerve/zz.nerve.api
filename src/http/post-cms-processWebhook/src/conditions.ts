import { SanityDocumentEvents } from './types';
import { SANITY_EVENTS } from './constants';

/**
 * Checks to see if the provided Project ID is a valid Sanity Project ID
 *
 * @param {string} projectID
 */
export const isValidProject = (projectId: string): boolean => {
    if (!projectId) {
        console.log('No Project ID provided.');
        return false;
    }

    console.log(
        'Checking to see if the provided Sanity Project ID is valid...'
    );

    if (projectId === process.env.SANITY_PROJECT_ID) {
        console.log(
            `Provided Project ID '${projectId}' is a valid Sanity Project. Continuing...`
        );
        return true;
    }

    console.log(`Provided Project ID '${projectId}' is invalid. Exiting.`);
    return false;
};

/**
 * Determines if there are documents that need to be processed and
 * provides sensible logging along the way.
 *
 * @param {*} documents Incoming sanity document events
 */
export const hasDocumentsToProcess = (
    documentEvents: SanityDocumentEvents
): boolean => {
    const { ALL } = SANITY_EVENTS;

    if (documentEvents[ALL].length === 0) {
        console.log('No documents need to be processed.');
        return false;
    }

    const count = documentEvents[ALL].length;

    console.log(
        `There ${count === 1 ? 'is' : 'are'} ${count} ${
            count === 1 ? 'document' : 'documents'
        } that might require processing.`
    );
    return true;
};
