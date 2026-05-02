export interface ResultParams {
  session: string;
  program: string;
  rollNumber: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface SearchHistoryItem extends ResultParams {
  userId: string;
  resultUrl: string;
  found: boolean;
  searchedAt: string;
}
