export function truncateString(str, maxLen = 200, ending = '...') {
  if (str.length > maxLen) {
    return str.substring(0, maxLen) + ending;
  }
  return str;
}