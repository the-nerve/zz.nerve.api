/**
 * Sanity Document Type: Show
 * Description: This file contains all processing functions related to shows.
 */
import { compareAsc, isEqual } from 'date-fns';
import { sanity } from '../api';
import {
    Processor,
    DocumentTypeProcessorsMap,
    DocumentID,
    RawPerformanceDates,
    PerformanceDates,
    RawShowDates,
    ShowDates,
} from '../../types';

/**
 * Retrieve all available date information from the show
 * @param {string} documentID
 */
const getPerformanceDates = async (documentID: DocumentID) => {
    const query =
        "*[_type == 'show' && _id == $documentID][0] {'performances': performances[].datetime, openDate, closeDate}";
    const params = { documentID };
    const rawPerformanceDates: RawShowDates = await sanity.fetch(query, params);

    return rawPerformanceDates;
};

/**
 * Does the show have any performances available?
 * @param performances An array of the available performance dates
 */
const hasPerformances = (performances: RawPerformanceDates) =>
    performances.length > 0;

/**
 * Sanity returns dates as strings, so we need to convert all of the the
 * date strings to date objects
 *
 * @param rawShowDates stringified version of all show-related dates
 */
const generatePerformanceDateObjects = ({
    performances,
    openDate,
    closeDate,
}: RawShowDates): ShowDates => {
    return {
        performances: performances.map((performance) => new Date(performance)),
        previousOpenDate: new Date(openDate),
        previousCloseDate: new Date(closeDate),
    };
};

/**
 * Sort shows from the first performance to the last (in ascending order)
 * @param performances An array of performance date objects
 */
const sortPerformancesAscending = (
    performances: PerformanceDates
): PerformanceDates => {
    return performances.sort(compareAsc);
};

/**
 * Get the first performance and the last performance dates from an array
 * of performance dates.
 *
 * @param
 */
const getFirstAndLastPerformances = (performances: PerformanceDates) => {
    const {
        length,
        0: firstPerformance,
        [length - 1]: lastPerformance,
    } = performances;

    return {
        firstPerformance,
        lastPerformance,
    };
};

/**
 * Are either of the previous open or close dates
 * different from the first and last performance dates?
 *
 * @param previousOpenDate
 * @param previousCloseDate
 * @param firstPerformance
 * @param lastPerformance
 */
const shouldUpdateOpenOrCloseDates = (
    previousOpenDate,
    previousCloseDate,
    firstPerformance,
    lastPerformance
) =>
    !isEqual(previousOpenDate, firstPerformance) ||
    !isEqual(previousCloseDate, lastPerformance);

/**
 *
 */
const maybeGetNewOpenDate = (openDate, firstPerformance) => {
    if (isEqual(firstPerformance, openDate)) {
        console.log(
            'The opening date for this show is unchanged and will not be updated.'
        );
        return {};
    }

    return { openDate: firstPerformance };
};

const maybeGetNewCloseDate = (closeDate, lastPerformance) => {
    if (isEqual(lastPerformance, closeDate)) {
        console.log(
            'The closing date for this show is unchanged and will not be updated.'
        );
        return {};
    }

    return { closeDate: lastPerformance };
};

// export const attachShowToSeason: Processor = async (documentID) => {};

/**
 *
 * @param documentID
 */
export const maybeUpdateOpenAndCloseDates: Processor = async (documentID) => {
    const rawShowDates = await getPerformanceDates(documentID);

    if (!hasPerformances(rawShowDates.performances)) {
        return null;
    }

    const {
        performances,
        previousOpenDate,
        previousCloseDate,
    } = generatePerformanceDateObjects(rawShowDates);

    const sortedPerformances = sortPerformancesAscending(performances);

    const { firstPerformance, lastPerformance } = getFirstAndLastPerformances(
        sortedPerformances
    );

    if (
        !shouldUpdateOpenOrCloseDates(
            previousOpenDate,
            previousCloseDate,
            firstPerformance,
            lastPerformance
        )
    ) {
        console.log(
            'Open and Close dates are unchanged. No additional action will be taken.'
        );
        return null;
    }

    // Sanity mutation API docs: https://www.sanity.io/docs/http-mutations
    await sanity
        .patch(documentID)
        .set(maybeGetNewOpenDate(previousOpenDate, firstPerformance))
        .set(maybeGetNewCloseDate(previousCloseDate, lastPerformance))
        .commit()
        .then((updatedShow) => {
            console.log(
                `Hooray! The show '${updatedShow.title}' with ID '${documentID}' was successfully updated!`
            );
        })
        .catch((err) => {
            console.error(
                `Oh no, the show with ID ${documentID} failed to update: `,
                err.message
            );
        });
};

/**
 * Build a final map of processors for this document type
 */
export const showProcessors: DocumentTypeProcessorsMap = {
    created: [maybeUpdateOpenAndCloseDates],
    updated: [maybeUpdateOpenAndCloseDates],
    deleted: [],
};
