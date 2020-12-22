import { Processors } from '@nerve/cms/types';
import { updateOpenAndCloseDates, attachShowToSeason } from '@nerve/cms/sanity';
/**
 *
 */

export const onUpdateProcessors: Processors = [
    updateOpenAndCloseDates,
    attachShowToSeason,
];
