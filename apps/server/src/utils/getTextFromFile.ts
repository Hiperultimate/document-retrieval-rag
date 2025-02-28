import {
  extractTextFromDOCX,
  extractTextFromJSON,
  extractTextFromPDF,
  extractTextFromTXT,
} from "./fileRead";

async function getTextFromFile(fileExtension: string, fileBuffer: Buffer) {
  let text = "";
  switch (fileExtension) {
    case "application/pdf":
      const pdfData = await extractTextFromPDF(fileBuffer);
      text = pdfData;
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      const mammothResult = await extractTextFromDOCX(fileBuffer);
      text = mammothResult;
      break;
    case "application/json":
      text = extractTextFromJSON(fileBuffer);
      break;
    case "text/plain":
      text = extractTextFromTXT(fileBuffer);
      break;
    default:
      throw new Error("Unsupported file type");
  }

  return text;
}

export default getTextFromFile;
