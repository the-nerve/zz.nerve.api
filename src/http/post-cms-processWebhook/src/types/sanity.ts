export type DocumentID = string;

export interface SanityDocumentEvents {
    created: DocumentID[] | [];
    deleted: DocumentID[] | [];
    updated: DocumentID[] | [];
    all: DocumentID[] | [];
}

export type AvailableSanityDocumentType =
    | 'artist'
    | 'location'
    | 'organization'
    | 'season'
    | 'show'
    | 'sponsor';

export interface SanityCMSWebhook {
    transactionId: string;
    projectId: string;
    dataset: string;
    ids: SanityDocumentEvents;
}

export type AvailableSanityActionableEvent = keyof Omit<
    SanityDocumentEvents,
    'all'
>;

/**
 * Show types
 */
export interface RawShowPerformanceDates {
    performances: string[];
    openDate: string;
    closeDate: string;
}

export interface ShowPerformanceDates {
    performances: Date[];
    openDate: Date;
    closeDate: Date;
}

/**
 * Season types
 */
