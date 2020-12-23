/**
 *
 * @param {*} projectID
 */
export const isValidProject = (projectID: string): boolean => {
    console.log(
        'Checking to see if the provided Sanity Project ID is valid...'
    );

    if (projectID === process.env.SANITY_PROJECT_ID) {
        console.log(`Provided Project ID ${projectID} is valid.`);
        return true;
    }

    console.log(`Provided Project ID ${projectID} is invalid.`);
    return false;
};
