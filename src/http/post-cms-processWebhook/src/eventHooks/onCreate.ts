import { Processors } from '../types';
import { updateOpenAndCloseDates, attachShowToSeason } from '../sanity';

/**
 *
 */

export const onCreateProcessors: Processors = [
    updateOpenAndCloseDates,
    attachShowToSeason,
];
