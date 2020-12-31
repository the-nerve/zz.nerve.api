import compareAsc from 'date-fns/compareAsc';
import { sanity } from '../api';
import {
    Processor,
    DocumentTypeProcessorsMap,
    DocumentID,
    RawShowPerformanceDates,
    ShowPerformanceDates,
} from '../../types';

/**
 * Retrieve all available performance dates from the show
 *
 * @param {string} documentID
 */
export const getPerformanceDates = async (documentID: DocumentID) => {
    const query =
        "*[_type == 'show' && _id == $documentID][0] {'performances': performances[].datetime, openDate, closeDate}";
    const params = { documentID };
    const rawPerformanceDates: RawShowPerformanceDates = await sanity.fetch(
        query,
        params
    );

    console.log(rawPerformanceDates);
    return rawPerformanceDates;
};

/**
 * Does the show have any performances available?
 * @param {*} performances
 */
const hasPerformances = (performances: string[]) => performances.length > 0;

const generatePerformanceDateObjects = ({
    performances,
    openDate,
    closeDate,
}: RawShowPerformanceDates): ShowPerformanceDates => {
    return {
        performances: performances.map((performance) => new Date(performance)),
        openDate: new Date(openDate),
        closeDate: new Date(closeDate),
    };
};

/**
 * Sort shows from the first performance to the last in Ascending order
 */
export const sortPerformancesFromFirstToLast = (
    performances
): ShowPerformanceDates => performances.sort(compareAsc);

/**
 * Get the first performance and the last performance from a performances array
 */
export const getFirstAndLastPerformances = (performances) => {
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
 * Looking at the
 */
// const shouldOpenOrCloseDatesChange = () => {};

// export const attachShowToSeason: Processor = async (documentID) => {};

export const updateOpenAndCloseDates: Processor = async (documentID) => {
    const rawPerformanceDates = await getPerformanceDates(documentID);
    if (!hasPerformances(rawPerformanceDates.performances)) {
        return null;
    }
    const { performances } = generatePerformanceDateObjects(
        rawPerformanceDates
    );

    const sortedPerformances = sortPerformancesFromFirstToLast(performances);
    console.log(sortedPerformances);
    // https://twitter.com/wesbos/status/1187745700320337920?lang=en
    const { firstPerformance, lastPerformance } = getFirstAndLastPerformances(
        sortedPerformances
    );

    await sanity
        .patch(documentID)
        .set({ openDate: firstPerformance })
        .set({ closeDate: lastPerformance })
        .commit() // Perform the patch and return a promise
        .then((updatedShow) => {
            console.log('Hurray, the show is updated! New document:');
            console.log(updatedShow);
        })
        .catch((err) => {
            console.error('Oh no, the update failed: ', err.message);
        });
};

/**
 * Build a map of processors for this document type
 */
export const showProcessors: DocumentTypeProcessorsMap = {
    created: [updateOpenAndCloseDates],
    updated: [updateOpenAndCloseDates],
    deleted: [],
};
