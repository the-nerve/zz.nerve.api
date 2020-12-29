import { Processors } from './processors';
import { SanityDocumentEvents } from './sanity';

export type AvailableSanityActionableEvent = keyof Omit<
    SanityDocumentEvents,
    'all'
>;
export type AvailableSanityEventHook = 'onCreate' | 'onDelete' | 'onUpdate';

export type EventHookMapping = [
    AvailableSanityActionableEvent,
    AvailableSanityEventHook
];
export type EventHookMappings = EventHookMapping[];

export type EventProcessors = { [key in AvailableSanityEventHook]: Processors };
