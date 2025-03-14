import { WeaviateClient } from "weaviate-client";
import { generateCollectionStructure } from "./client";

export async function createCollection(
  client: WeaviateClient,
  collectionName: string
) {
  const collectionStructure = generateCollectionStructure(collectionName);
  try {
    await client.collections.create(collectionStructure);
  } catch (error) {
    console.error("Error in creating collection for : ", collectionName);
    console.error(error);
  }
}

export async function importDocumentDataToCollection(
  client: WeaviateClient,
  collectionName: string,
  processedData: { [key: string]: string }[]
) {
  const selectedCollection = client.collections.get(collectionName);

  const insertResponse =
    await selectedCollection.data.insertMany(processedData);

  return insertResponse;
}

export async function overwriteCollectionIfAlreadyExist(
  client: WeaviateClient,
  collectionName: string
): Promise<void> {
  const isCollectionExist = await client.collections.exists(collectionName);

  if (!isCollectionExist) return;

  console.log(
    "Client is adding a collection that already exists, deleting the old one record:",
    collectionName
  );
  await client.collections.delete(collectionName);
}
