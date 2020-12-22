import { SANITY_EVENTS, SANITY_EVENT_HOOKS } from '@nerve/cms/constants';
import {
    DocumentID,
    SanityDocumentEvents,
    EventHookMappings,
    EventProcessors,
    AvailableSanityEventHook,
} from '@nerve/cms/types';

import {
    onCreateProcessors,
    onDeleteProcessors,
    onUpdateProcessors,
} from '@nerve/cms/eventHooks';
import { hasProcessorsToRunOnHook } from './checks';

/**
 *
 */
const processors: EventProcessors = {
    [SANITY_EVENT_HOOKS.ON_CREATE]: onCreateProcessors,
    [SANITY_EVENT_HOOKS.ON_DELETE]: onDeleteProcessors,
    [SANITY_EVENT_HOOKS.ON_UPDATE]: onUpdateProcessors,
};

/**
 *
 */
const eventHookMappings: EventHookMappings = [
    [SANITY_EVENTS.CREATED, SANITY_EVENT_HOOKS.ON_CREATE],
    [SANITY_EVENTS.DELETED, SANITY_EVENT_HOOKS.ON_DELETE],
    [SANITY_EVENTS.UPDATED, SANITY_EVENT_HOOKS.ON_UPDATE],
];

/**
 *
 * @param {*} hookName
 * @param {*} documents
 */
const maybeRunProcessor = (
    hookName: AvailableSanityEventHook,
    documentIDs: DocumentID[]
) => {
    if (hasProcessorsToRunOnHook(processors[hookName], hookName)) {
        documentIDs.forEach((documentID) => {
            processors[hookName].forEach((processor) => processor(documentID));
        });
    }
};

/**
 *
 * @param {*} documents
 */
export const runDocumentProcessors = (
    documents: SanityDocumentEvents
): void => {
    eventHookMappings.forEach(([EVENT, HOOK]) =>
        maybeRunProcessor(HOOK, documents[EVENT])
    );
};
