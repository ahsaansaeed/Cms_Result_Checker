import { databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { APPWRITE_CONFIG } from "@/lib/constants";
import { SearchHistoryItem } from "@/types";

const { databaseId, collectionId } = APPWRITE_CONFIG;

export const historyService = {
  async saveSearch(data: Omit<SearchHistoryItem, "searchedAt">) {
    if (!databaseId || !collectionId) return null;
    
    try {
      return await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          ...data,
          searchedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error("Failed to save search history", error);
      return null;
    }
  },

  async getUserHistory(userId: string) {
    if (!databaseId || !collectionId) return [];

    try {
      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [
          Query.equal("userId", userId),
          Query.orderDesc("searchedAt"),
          Query.limit(20),
        ]
      );
      return response.documents as unknown as SearchHistoryItem[];
    } catch (error) {
      console.error("Failed to fetch search history", error);
      return [];
    }
  },
};
