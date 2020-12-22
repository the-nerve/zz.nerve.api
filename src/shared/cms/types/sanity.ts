export type DocumentID = string;

export interface SanityDocumentEvents {
    created: DocumentID[] | [];
    deleted: DocumentID[] | [];
    updated: DocumentID[] | [];
    all: DocumentID[] | [];
}

export interface SanityCMSWebhook {
    transactionID: string;
    projectID: string;
    dataset: string;
    ids: SanityDocumentEvents;
}
