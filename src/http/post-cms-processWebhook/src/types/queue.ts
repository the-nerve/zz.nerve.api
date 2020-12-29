import { AvailableSanityDocumentType, DocumentID } from './sanity';
import { AvailableSanityDocumentEvent } from './events';

export type QueueItem = [
    AvailableSanityDocumentEvent,
    AvailableSanityDocumentType,
    DocumentID
];

export type DocumentQueue = QueueItem[];
