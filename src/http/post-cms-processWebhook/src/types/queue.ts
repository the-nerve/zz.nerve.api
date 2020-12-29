import { AvailableSanityDocumentType, DocumentID } from './sanity';
import { AvailableSanityActionableEvent } from './events';

export type QueueItem = [
    AvailableSanityActionableEvent,
    AvailableSanityDocumentType,
    DocumentID
];

export type DocumentQueue = QueueItem[];
