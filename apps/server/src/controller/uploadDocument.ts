import { chunkText } from "../utils/chunkText";
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
    const collectionName = "PrivacyTest";

    // Create collection in vector DB
    await createCollection(dbConnection, collectionName);

    // add logic to process/clean raw data

    // add logic batch processed data

    const response =
      "Privacy Policy Generator Not everyone knows how to make a Privacy Policy agreement, especially with CCPA or GDPR or CalOPPA or PIPEDA or Australia's Privacy Act provisions. If you are not a lawyer or someone who is familiar to Privacy Policies, you will be clueless. Some people might even take advantage of you because of this. Some people may even extort money from you. These are some examples that we want to stop from happening to you. We will help you protect yourself by generating a Privacy Policy. Our Privacy Policy Generator can help you make sure that your business complies with the law. We are here to help you protect your business, yourself and your customers. Fill in the blank spaces below and we will create a personalized website Privacy Policy for your business. No account registration required. Simply generate & download a Privacy Policy in seconds! Small remark when filling in this Privacy Policy generator: Not all parts of this Privacy Policy might be applicable to your website. When there are parts that are not applicable, these can be removed. Optional elements can be selected in step 2. The accuracy of the generated Privacy Policy on this website is not legally binding. Use at your own risk. Looking for Terms and Conditions? Check out Terms and Conditions Generator.";

    // const processedData: { [key: string]: string }[] = await response.json();

    const chunkedTextArray = chunkText(response, 60, 20);
    const processedData = chunkedTextArray.map((chunk) => {
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
