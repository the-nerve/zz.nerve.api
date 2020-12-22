/**
 *
 * @param {*} projectID
 */
export const isValidProject = (projectID: string): boolean =>
    projectID === process.env.SANITY_PROJECT_ID;
