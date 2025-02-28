import pdf from "pdf-parse";
import mammoth from "mammoth";

export const extractTextFromPDF = async (fileBuffer: Buffer) => {
  const data = await pdf(fileBuffer);
  return data.text;
};

export const extractTextFromDOCX = async (fileBuffer: Buffer) => {
  const result = await mammoth.extractRawText({ buffer: fileBuffer });
  return result.value;
};

export const extractTextFromJSON = (fileBuffer: Buffer): any => {
  return JSON.parse(fileBuffer.toString("utf-8"));
};

export const extractTextFromTXT = (fileBuffer: Buffer): string => {
  return fileBuffer.toString("utf-8");
};
