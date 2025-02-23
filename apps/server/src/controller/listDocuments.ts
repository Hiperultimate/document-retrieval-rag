import { WeaviateClient } from "weaviate-client";
import { connectToVectorDB } from "../db/client";
import { Request, Response } from "express";

export const listDocuments = async (
  req: Request,
  res: Response
): Promise<void> => {
  let dbConnection: null | WeaviateClient = null;

  try {
    dbConnection = await connectToVectorDB();

    const checkingOut = await dbConnection.collections.listAll();

    const docNames = checkingOut.map((obj) => obj.name);

    dbConnection.close();

    res.status(200).json({
      message: "Success",
      data: docNames,
    });
    return;
  } catch (e) {
    if(dbConnection !== null){
        dbConnection.close();
    }
    console.log("Error occured while listing all collections from DB :", e);
    
    res.status(400).json({
      message: "Something went wrong...",
    });
    return;
  }
};
