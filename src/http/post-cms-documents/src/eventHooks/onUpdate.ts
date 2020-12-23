import { Processors } from '../types';
import { updateOpenAndCloseDates, attachShowToSeason } from '../sanity';
/**
 *
 */

export const onUpdateProcessors: Processors = [
    updateOpenAndCloseDates,
    attachShowToSeason,
];
