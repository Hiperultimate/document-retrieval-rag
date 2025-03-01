import { Request, Response } from "express";
import { connectToVectorDB } from "../db/client";
import {
  createCollection,
  importDocumentDataToCollection,
  overwriteCollectionIfAlreadyExist,
} from "../db/collections";
import { chunkText } from "../utils/chunkText";
import getTextFromFile from "../utils/getTextFromFile";
import {
  capitalizeFirstLetter,
  cleanStopWordBatch,
  removeFileExtension,
  sanitizeString,
} from "../utils/textCleanUp";

export const uploadDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  // Check if the filename is empty
  if (!req.file.originalname || req.file.originalname.trim() === "") {
    res.status(400).json({
      error: "Uploaded file name is invalid",
      invalidFileName: req.file.originalname,
    });
    return;
  }

  let text = "";
  try {
    text = await getTextFromFile(req.file.mimetype, req.file.buffer);
    console.log("Received text : ", text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing file");
  }

  try {
    console.log("Document Processing...");

    const dbConnection = await connectToVectorDB();

    // Cleans the filename and makes it the collection name
    const collectionName = capitalizeFirstLetter(
      sanitizeString(removeFileExtension(req.file.originalname))
    );

    // If collection name already exists, delete it
    await overwriteCollectionIfAlreadyExist(dbConnection, collectionName);

    // Create collection in vector DB
    await createCollection(dbConnection, collectionName);

    // add logic batch processed data
    const chunkedTextArray = chunkText(text, 100, 25);

    // add logic to process/clean raw data
    const stopWordCleanupTextArray = cleanStopWordBatch(chunkedTextArray);

    const processedData = stopWordCleanupTextArray.map((chunk) => {
      return { content: chunk, fileName: collectionName };
    });

    const documentResponse = await importDocumentDataToCollection(
      dbConnection,
      collectionName,
      processedData
    );

    dbConnection.close();
    res
      .status(200)
      .json({ message: "Document uploaded successfully", documentResponse });
  } catch (error) {
    // Handle errors appropriately (e.g., pass to error middleware)
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
