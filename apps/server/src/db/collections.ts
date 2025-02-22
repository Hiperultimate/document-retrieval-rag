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
    console.error("Error in creating collection : ", collectionName);
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
