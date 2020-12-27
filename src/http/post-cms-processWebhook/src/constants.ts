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
 *
 */
export enum SANITY_EVENT_HOOKS {
    ON_CREATE = 'onCreate',
    ON_DELETE = 'onDelete',
    ON_UPDATE = 'onUpdate',
}
