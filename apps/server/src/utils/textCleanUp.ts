const stopWords = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "at",
  "with",
  "for",
  "from",
  "by",
  "as",
  "that",
  "this",
  "it",
]);

export function cleanStopWordBatch(texts: string[]): string[] {
    return texts.map(text =>
      text
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/) // Split into words
        .filter(word => !stopWords.has(word)) // Remove stop words
        .join(" ") // Join back into a sentence
    );
  }

export function sanitizeString(input: string): string {
  // Check if the input is a string
  if (typeof input !== 'string') {
    throw new Error('Input must be a string.');
  }

  // Remove empty spaces and special characters using regex
  const sanitized = input.replace(/[^a-zA-Z0-9]/g, '').trim();

  // Throw an error if the sanitized string is empty
  if (sanitized.length === 0) {
    throw new Error('The resulting string is empty after sanitization.');
  }

  // Return the valid sanitized string
  return sanitized;
}

export function removeFileExtension(filename: string): string {
  // Check if the input is a string
  if (typeof filename !== 'string') {
    throw new Error('Input must be a string.');
  }

  // Find the last occurrence of the dot
  const lastDotIndex = filename.lastIndexOf('.');

  // If there is no dot, return the original filename
  if (lastDotIndex === -1) {
    return filename;
  }

  // Return the substring before the last dot
  return filename.substring(0, lastDotIndex);
}