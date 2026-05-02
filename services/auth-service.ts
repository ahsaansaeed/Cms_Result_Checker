import { account } from "@/lib/appwrite";
import { ID } from "appwrite";

export const authService = {
  // Simple anonymous login to allow search history tracking without email/pass
  async loginAnonymously() {
    try {
      return await account.createAnonymousSession();
    } catch (error) {
      console.error("Anonymous login failed", error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      return await account.get();
    } catch {
      return null;
    }
  },

  async logout() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Logout failed", error);
    }
  },
};
