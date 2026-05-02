"use client";

import { useState } from "react";
import { generateResultUrl } from "@/lib/generate-url";
import { validateSession, validateProgram, validateRoll } from "@/lib/validators";

export type CheckerStatus = "idle" | "loading" | "success" | "error";

export function useResultChecker() {
  const [session, setSession] = useState("");
  const [program, setProgram] = useState("");
  const [roll, setRoll] = useState("");
  const [suffix, setSuffix] = useState(""); // Default to None
  const [status, setStatus] = useState<CheckerStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const checkResult = async () => {
    // Reset state
    setError(null);
    setStatus("loading");
    
    // Validate inputs
    const sessionVal = validateSession(session);
    if (!sessionVal.valid) {
      setError(sessionVal.error || "Invalid session");
      setStatus("error");
      return;
    }

    const programVal = validateProgram(program);
    if (!programVal.valid) {
      setError(programVal.error || "Invalid program");
      setStatus("error");
      return;
    }

    const rollVal = validateRoll(roll);
    if (!rollVal.valid) {
      setError(rollVal.error || "Invalid roll number");
      setStatus("error");
      return;
    }

    // Generate URL with suffix
    const fullRoll = roll.trim() + suffix.trim();
    const url = generateResultUrl(session, program, fullRoll);
    setResultUrl(url);

    try {
      // Pre-check the URL via our server-side proxy to detect connectivity/existence
      const checkRes = await fetch(`/api/check-result?url=${encodeURIComponent(url)}`);
      const data = await checkRes.json();

      if (!data.exists) {
        setStatus("error");
        setError(data.error || "Result chart not found. Please verify your details.");
        return;
      }

      // Phase 3: Save to search history (Appwrite)
      // Note: We don't wait for this to finish to avoid delaying the UI
      import("@/services/auth-service").then(async ({ authService }) => {
        const user = await authService.getCurrentUser();
        if (user) {
          import("@/services/history-service").then(({ historyService }) => {
            historyService.saveSearch({
              userId: user.$id,
              session,
              program,
              rollNumber: roll + suffix,
              resultUrl: url,
              found: true,
            });
          });
        }
      });

      // If exists, the <img> tag will handle the final display
      // We don't set status to success here; the <img> onLoad will do that.
    } catch (err) {
      console.error("Check failed", err);
      // Fallback: let the image tag try anyway
    }
  };

  const handleLoad = () => {
    setStatus("success");
  };

  const handleError = () => {
    setStatus("error");
    setError("Result chart not found. Please verify your details.");
  };

  return {
    session,
    setSession,
    program,
    setProgram,
    roll,
    setRoll,
    suffix,
    setSuffix,
    status,
    setStatus,
    error,
    setError,
    resultUrl,
    checkResult,
    handleLoad,
    handleError,
  };
}
