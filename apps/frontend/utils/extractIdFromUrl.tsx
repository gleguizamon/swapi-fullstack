/**
 * Extracts the numeric ID from a given SWAPI URL.
 * @param {string} url the URL from which to extract the ID.
 * @returns {string} the extracted ID as a string. Returns an empty string if no ID is found.
 */
const extractIdFromUrl = (url: string): string => {
  const matches = url.match(/\/([0-9]+)\/$/);
  return matches ? matches[1] : "";
};

export { extractIdFromUrl };
