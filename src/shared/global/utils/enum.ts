export const enumToArray = (enumObject: any): string[] => {
    return Object.keys(enumObject).map((key) => enumObject[key]);
};
