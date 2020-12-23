export type DocumentID = string;

export interface SanityDocumentEvents {
    created: DocumentID[] | [];
    deleted: DocumentID[] | [];
    updated: DocumentID[] | [];
    all: DocumentID[] | [];
}

export interface SanityCMSWebhook {
    transactionId: string;
    projectId: string;
    dataset: string;
    ids: SanityDocumentEvents;
}
