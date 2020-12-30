// import { sanity } from './api';
import { DocumentTypeProcessorsMap } from '../../types';

// export const getSeasonFromShow = (documentID) => {};
// export const didShowsInSeasonChange = () => {};

/**
 * Build a map of processors for this document type
 */
export const seasonProcessors: DocumentTypeProcessorsMap = {
    created: [],
    updated: [],
    deleted: [],
};
