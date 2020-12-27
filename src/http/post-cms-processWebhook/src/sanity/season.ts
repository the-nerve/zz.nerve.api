// import { sanity } from './api';
import { Processor } from '../types';

// export const getSeasonFromShow = (documentID) => {};
// export const didShowsInSeasonChange = () => {};
export const attachShowToSeason: Processor<void> = (documentID) => {
    console.log(`Running attachSeasonToShow: ${documentID}`);
};
