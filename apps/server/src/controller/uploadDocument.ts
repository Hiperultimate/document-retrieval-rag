import { connectToVectorDB } from "../db/client";
import {
  createCollection,
  importDocumentDataToCollection,
} from "../db/collections";
import { Request, Response } from "express";

export const uploadDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    console.log("Document Processing...");

    const dbConnection = await connectToVectorDB();

    // Get collection name
    const collectionName = "jeopardyTiny";

    // Create collection in vector DB
    await createCollection(dbConnection, collectionName);

    // add logic to process/clean raw data

    // add logic batch processed data

    // Temp logic
    const response = await fetch(
      "https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json"
    );
    if (!response.ok) {
      throw new Error("Error fetching temp data...");
    }

    const processedData: { [key: string]: string }[] = await response.json();

    const documentResponse = await importDocumentDataToCollection(
      dbConnection,
      collectionName,
      processedData
    );

    console.log("Document Response :", documentResponse);
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
