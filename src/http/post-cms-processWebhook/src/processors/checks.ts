import { SANITY_EVENTS } from '../constants';
import {
    AvailableSanityEventHook,
    SanityDocumentEvents,
    Processors,
} from '../types';

/**
 *
 * @param {*} documents
 */
export const hasDocumentsToProcess = (
    documents: SanityDocumentEvents
): boolean => {
    console.log('Running document processing check...');

    const { ALL } = SANITY_EVENTS;

    if (documents[ALL].length > 0) {
        const count = documents[ALL].length;

        console.log(
            `There ${count === 1 ? 'is' : 'are'} ${count} ${
                count === 1 ? 'document' : 'documents'
            } that ${count === 1 ? 'requires' : 'require'} processing.`
        );
        return true;
    }

    console.log('No documents need to be processed.');
    return false;
};

/**
 *
 * @param {*} processors
 * @param {*} name
 */
export const hasProcessorsToRunOnHook = (
    processors: Processors,
    name: AvailableSanityEventHook
): boolean => {
    console.log(`Checking to see if the '${name}' hook has processors to run.`);

    if (processors.length > 0) {
        console.log(
            `The '${name}' hook has ${processors.length} processors to run.`
        );
        return true;
    }

    console.log(`No processors found for the '${name}' hook. Skipping...`);
    return false;
};
