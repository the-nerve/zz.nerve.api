/**
 * Checks to see if the provided Project ID is a valid Sanity Project ID
 *
 * @param {string} projectID
 */
export const isValidProject = (projectId: string): boolean => {
    if (!projectId) {
        console.log('No Project ID provided.');
        return false;
    }

    console.log(
        'Checking to see if the provided Sanity Project ID is valid...'
    );

    if (projectId === process.env.SANITY_PROJECT_ID) {
        console.log(
            `Provided Project ID '${projectId}' is a valid Sanity Project.`
        );
        return true;
    }

    console.log(`Provided Project ID '${projectId}' is invalid.`);
    return false;
};
