// import { sanity } from './api';
import { Processor, DocumentTypeProcessorsMap } from '../../types';

/**
 * Retrieve all available performance dates from the show
 *
 * @param {string} documentID
 */
// export const getPerformanceDates = (documentID) => {
// const query =
//     '*[_type == "show" && _id === $documentID] {performances.datetime, openDate, closeDate}';
// const params = { documentID };
// const data = sanity.fetch(query, params).then((show) => show);
// return {
//     performances: data.performances,
//     openDate: data.openDate,
//     closeDate: data.closeDate,
// };
// };

/**
 * Does the show have any performances available?
 * @param {*} performances
 */
// export const hasPerformances = (performances) => performances.length > 0;

/**
 * Sort shows from the first performance to the last in Ascending order
 */
// export const sortPerformancesFromFirstToLast = (performances) => {};

/**
 * Get the first performance and the last performance from a performances array
 */
// export const getFirstAndLastPerformances = (performances) => {};

/**
 * Looking at the
 */
// const shouldOpenOrCloseDatesChange = () => {};

export const attachShowToSeason: Processor<void> = (documentID) => {
    return documentID;
};

export const updateOpenAndCloseDates: Processor<void> = (documentID) => {
    return documentID;
};

/**
 * Build a map of processors for this document type
 */
export const showProcessors: DocumentTypeProcessorsMap = {
    created: [updateOpenAndCloseDates, attachShowToSeason],
    updated: [updateOpenAndCloseDates, attachShowToSeason],
    deleted: [],
};
