export const BASE_URL = "https://cms.must.edu.pk:8082/Chartlet/";

export const SESSIONS = [
  { label: "Fall 2024", value: "FA24" },
  { label: "Spring 2024", value: "SP24" },
  { label: "Fall 2023", value: "FA23" },
  { label: "Spring 2023", value: "SP23" },
];

export const PROGRAMS = [
  { label: "BS Software Engineering", value: "BSE" },
  { label: "BS Computer Science", value: "BSCS" },
  { label: "BS Information Technology", value: "BSIT" },
  { label: "BS Artificial Intelligence", value: "BSAI" },
];

export const SUFFIXES = [
  { label: "None", value: "" },
  { label: "AJK (Mirpur)", value: "AJK" },
  { label: "BH (Bhimber)", value: "BH" },
  { label: "PL (Pallandri)", value: "PL" },
];

export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.APPWRITE_DATABASE_ID || "",
  collectionId: process.env.APPWRITE_COLLECTION_ID || "",
};
