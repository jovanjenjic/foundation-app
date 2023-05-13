/* eslint-disable */
/**
 * Make query string from object
 * Accepts properties in object as array or single value
 * @param args - object used to create query string.
 * @param skip - properties to avoid parsing as query args
 * @param init - inital query args in format that is used for `URLSearchParams`
 * @returns query string `(eg. foo=22&foo=11&baz=test.. )`
 */
export const parseQueryString = <T extends Record<string, any>>(
  args: T,
  skip: string[] = [],
  init: string[][] = [],
) => {
  for (const [key, value] of Object.entries<T>(args)) {
    // clear null or undefined values
    if (value === null || value === undefined || skip.includes(key)) continue;

    // case when value is array
    if (Array.isArray(value)) {
      value.forEach((val) => {
        init.push([key, `${val}`]);
      });
      continue;
    }
    // remove empties
    if (`${value}`.length) init.push([key, `${value}`]);
  }
  return new URLSearchParams(init).toString();
};
