import { SANITY_EVENTS } from '../constants';
import {
    AvailableSanityDocumentType,
    DocumentID,
    AvailableSanityActionableEvent,
} from './sanity';

export interface QueueItem {
    eventName: AvailableSanityActionableEvent;
    documentType: AvailableSanityDocumentType;
    documentID: DocumentID;
}

export type Queue = QueueItem[];

export type Processor<T = any> = (documentID: DocumentID) => T;
export type Processors<T = any> = Processor<T>[];

export interface DocumentTypeProcessorsMap {
    [SANITY_EVENTS.CREATED]: Processors | undefined[];
    [SANITY_EVENTS.DELETED]: Processors | undefined[];
    [SANITY_EVENTS.UPDATED]: Processors | undefined[];
}
