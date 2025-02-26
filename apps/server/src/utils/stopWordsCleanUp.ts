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

function cleanStopWordBatch(texts: string[]): string[] {
    return texts.map(text =>
      text
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .split(/\s+/) // Split into words
        .filter(word => !stopWords.has(word)) // Remove stop words
        .join(" ") // Join back into a sentence
    );
  }

export default cleanStopWordBatch;