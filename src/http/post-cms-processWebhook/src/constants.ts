import { AvailableSanityActionableEvent } from './types';

/**
 * The events that Sanity sends over with its webhook.
 * Each of these events are sent as keys with the value
 * ultimately being an array of documents that were modified
 */
export enum SANITY_EVENTS {
    CREATED = 'created',
    DELETED = 'deleted',
    UPDATED = 'updated',
    ALL = 'all',
}

/**
 * An array of events that we want to take action on. This purposefully does
 * not include the "all" event, as we don't have any need to iterate on it
 * at present. All processing for each document type is handled on one the
 * of the three events below.
 */
export const SANITY_ACTIONABLE_EVENTS: AvailableSanityActionableEvent[] = [
    'created',
    'deleted',
    'updated',
];
