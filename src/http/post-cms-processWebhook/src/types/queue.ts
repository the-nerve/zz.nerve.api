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

export type Processor = (documentID: DocumentID) => Promise<void>;
export type Processors = Processor[];

export interface DocumentTypeProcessorsMap {
    [SANITY_EVENTS.CREATED]: Processors | undefined[];
    [SANITY_EVENTS.DELETED]: Processors | undefined[];
    [SANITY_EVENTS.UPDATED]: Processors | undefined[];
}
