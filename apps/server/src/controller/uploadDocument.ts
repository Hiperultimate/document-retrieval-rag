import { chunkText } from "../utils/chunkText";
import cleanStopWordBatch from "../utils/stopWordsCleanUp";
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
    const collectionName = "FactsAboutTwoAnimals";

    // Create collection in vector DB
    await createCollection(dbConnection, collectionName);

    // const response =
    //   "Privacy Policy Generator Not everyone knows how to make a Privacy Policy agreement, especially with CCPA or GDPR or CalOPPA or PIPEDA or Australia's Privacy Act provisions. If you are not a lawyer or someone who is familiar to Privacy Policies, you will be clueless. Some people might even take advantage of you because of this. Some people may even extort money from you. These are some examples that we want to stop from happening to you. We will help you protect yourself by generating a Privacy Policy. Our Privacy Policy Generator can help you make sure that your business complies with the law. We are here to help you protect your business, yourself and your customers. Fill in the blank spaces below and we will create a personalized website Privacy Policy for your business. No account registration required. Simply generate & download a Privacy Policy in seconds! Small remark when filling in this Privacy Policy generator: Not all parts of this Privacy Policy might be applicable to your website. When there are parts that are not applicable, these can be removed. Optional elements can be selected in step 2. The accuracy of the generated Privacy Policy on this website is not legally binding. Use at your own risk. Looking for Terms and Conditions? Check out Terms and Conditions Generator.";

    const response = `
Facts About Rabbits and Frogs

Rabbits
1. Rabbits are social animals and prefer to live in groups.
2. A rabbit's teeth grow continuously and need to be worn down by chewing.
3. Their strong back legs allow them to jump up to 3 feet high and 10 feet far.
4. Rabbits have nearly 360-degree vision without turning their heads.
5. They communicate through body language, like thumping their feet when scared.
6. Rabbits are not rodents; they belong to the order Lagomorpha.
7. They eat certain soft feces, called cecotropes, to absorb extra nutrients.
8. Rabbits can run up to 35 mph to escape predators.
9. They are most active at dawn and dusk.
10. While gentle, they can be territorial when protecting their burrows.

Frogs
1. Frogs are amphibians and can live in both water and on land.
2. Their powerful legs allow them to jump up to 20 times their body length.
3. Frogs can breathe through their skin as well as their lungs.
4. Male frogs use croaking sounds to attract mates.
5. They start life as tadpoles before growing legs and losing their tails.
6. Some frog species secrete toxins to protect themselves from predators.
7. A frog's tongue is extremely sticky and can snap forward quickly to catch prey.
8. Frogs are cold-blooded and rely on their environment to control body temperature.
9. They absorb water through their skin instead of drinking.
10. Some frogs can survive freezing temperatures by entering a state of suspended animation.

Both rabbits and frogs have unique adaptations that help them survive in their environments.
`;

    // const processedData: { [key: string]: string }[] = await response.json();

    // add logic batch processed data
    const chunkedTextArray = chunkText(response, 100, 25);

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
