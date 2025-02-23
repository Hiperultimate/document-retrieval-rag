import { WeaviateClient } from "weaviate-client";
import { connectToVectorDB } from "../db/client";
import { Request, Response } from "express";

export const documentTalk = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { documentName, query } = req.body;

  // Validate the request body
  if (!documentName || typeof documentName !== "string") {
    res
      .status(400)
      .json({ error: "documentName is required and must be a string." });
    return;
  }

  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "query is required and must be a string." });
    return;
  }

  let dbConnection: null | WeaviateClient = null;

  try {
    dbConnection = await connectToVectorDB();

    const checkingOut = await dbConnection.collections.get(documentName);

    const relatedTags = await checkingOut.query.nearText(query, {
      limit: 5,
    });

    dbConnection.close();

    // If validation passes, proceed with your logic
    // For demonstration, we'll just return the received data
    res.status(200).json({
      message: "Fetched related keywords succesfully...",
      data: { documentName, relatedTags },
    });
    return;
  } catch (error) {
    if (dbConnection !== null) {
      dbConnection.close();
    }

    console.log("Error occured while listing all collections from DB :", error);

    res.status(400).json({
      message: "Something went wrong...",
    });
    return;
  }
};
