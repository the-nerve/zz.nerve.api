import { SANITY_EVENTS, SANITY_EVENT_HOOKS } from '../constants';
import {
    DocumentID,
    SanityDocumentEvents,
    EventHookMappings,
    EventProcessors,
    AvailableSanityEventHook,
    QueueItem,
} from '../types';

import {
    onCreateProcessors,
    onDeleteProcessors,
    onUpdateProcessors,
} from '../eventHooks';
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
const maybeRunProcessor = (document: QueueItem) => {};

/**
 *
 * @param queueItem
 * @param processors
 */
const runEventHookProcessorsOnType = (queueItem: QueueItem, processors) => {};

/**
 *
 * @param queueItem
 */
const selectDocumentTypeProcessors = (queueItem: QueueItem) => {
    // use the current queue item document type to check for processors to run
    // if there are processors to run, then we need to check the given eventName to see if there are processors to run
    // If there are processors to run, we need to run the processors specific to this documentType and eventName
};

/**
 *
 * @param {*} documents
 */
export const runDocumentProcessors = (queue: QueueItem[]): void => {
    queue.forEach((item) => {
        const processors = selectDocumentTypeProcessors(item);
    });
};
