import { BASE_URL } from "./constants";

/**
 * Generates the dynamic result chart URL for a given student session, program, and roll number.
 * Pattern: https://cms.must.edu.pk:8082/Chartlet/MUST<SESSION>-<PROGRAM>-<ROLL>/FanG_Chartlet_GPChart.Jpeg?<RANDOM>
 */
export function generateResultUrl(
  session: string,
  program: string,
  roll: string
): string {
  const s = session.trim().toUpperCase();
  const p = program.trim().toUpperCase();
  const r = roll.trim().padStart(3, "0");

  const path = `MUST${s}-${p}-${r}/FanG_Chartlet_GPChart.Jpeg`;
  
  // Cache busting: current timestamp + 6 random digits
  const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
  const cacheBuster = Date.now().toString() + randomDigits;

  return `${BASE_URL}${path}?${cacheBuster}`;
}
