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
export type RawPerformanceDates = string[];
export type PerformanceDates = Date[];

export interface RawShowDates {
    performances: RawPerformanceDates;
    openDate: string;
    closeDate: string;
}

export interface ShowDates {
    performances: PerformanceDates;
    previousOpenDate: Date;
    previousCloseDate: Date;
}

/**
 * Season types
 */
