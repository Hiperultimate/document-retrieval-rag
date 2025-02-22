import weaviate, {
  generative,
  vectorizer,
  WeaviateClient,
} from "weaviate-client";
import dotenv from "dotenv";
dotenv.config();

const wcdUrl = process.env.WCD_URL as string;
const wcdApiKey = process.env.WCD_API_KEY as string;
const cohereApiKey = process.env.COHERE_API as string;

export async function connectToVectorDB() {
  const client = await weaviate.connectToWeaviateCloud(wcdUrl, {
    authCredentials: new weaviate.ApiKey(wcdApiKey),
    headers: {
      "X-Cohere-Api-Key": cohereApiKey,
    },
  });
  return client;
}

// Collection structure that will be used to create new collection for new documents uploaded
export function generateCollectionStructure(collectionName: string) {
  const classDefinition = {
    name: `${collectionName}Document`,
    description: `Contents of a document called ${collectionName}`,
    vectorizers: vectorizer.text2VecCohere(),
    generative: generative.cohere(),
    properties: [
      {
        name: "content",
        dataType: "text" as const,
        description: "The text content of the chunk.",
        skipVectorization: false,
        vectorizePropertyName: false,
      },
      {
        name: "documentId",
        dataType: "text" as const,
        description: "The unique ID of the document this chunk belongs to.",
        skipVectorization: true,
        vectorizePropertyName: false,
      },
      {
        name: "fileName",
        dataType: "text" as const,
        description: "The name of the file the document came from.",
        skipVectorization: true,
        vectorizePropertyName: false,
      },
    ],
  };

  return classDefinition;
}
