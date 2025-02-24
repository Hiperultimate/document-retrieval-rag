export function chunkText(text: string, chunkSize = 125, chunkOverlap = 50): string[] {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = start + chunkSize;
    chunks.push(text.substring(start, end));
    start += chunkSize - chunkOverlap;
  }
  return chunks;
}
