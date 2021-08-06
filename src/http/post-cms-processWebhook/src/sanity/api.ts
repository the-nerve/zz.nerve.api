import sanityClient from '@sanity/client';

/**
 * The Official Sanity Client for interacting with the Sanity API
 */
export const sanity = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN, // or leave blank to be anonymous user
    useCdn: false, // `false` if you want to ensure fresh data
});
