import { Processors } from './processors';
import { SanityDocumentEvents } from './sanity';

export type AvailableSanityDocumentEvent = keyof SanityDocumentEvents;
export type AvailableSanityEventHook = 'onCreate' | 'onDelete' | 'onUpdate';

export type EventHookMapping = [
    AvailableSanityDocumentEvent,
    AvailableSanityEventHook
];
export type EventHookMappings = EventHookMapping[];

export type EventProcessors = { [key in AvailableSanityEventHook]: Processors };
