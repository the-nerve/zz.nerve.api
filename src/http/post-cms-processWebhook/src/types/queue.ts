import { AvailableSanityDocumentType, DocumentID } from './sanity';
import { AvailableSanityActionableEvent } from './events';

export interface QueueItem {
    eventName: AvailableSanityActionableEvent;
    documentType: AvailableSanityDocumentType;
    documentID: DocumentID;
}
