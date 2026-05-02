import { ValidationResult } from "@/types";

export function sanitizeInput(input: string): string {
  return input.replace(/[^a-zA-Z0-9-]/g, "").trim();
}

export function validateSession(session: string): ValidationResult {
  const pattern = /^(FA|SP)\d{2}$/i;
  const s = session.trim();
  if (!s) return { valid: false, error: "Session is required." };
  if (!pattern.test(s))
    return { valid: false, error: "Session must be like FA24 or SP25." };
  return { valid: true };
}

export function validateProgram(program: string): ValidationResult {
  const p = program.trim();
  if (!p) return { valid: false, error: "Program is required." };
  if (p.length < 2) return { valid: false, error: "Invalid program code." };
  return { valid: true };
}

export function validateRoll(roll: string): ValidationResult {
  const pattern = /^\d{1,3}[A-Z]{0,3}$/i;
  const r = roll.trim();
  if (!r) return { valid: false, error: "Roll number is required." };
  if (!pattern.test(r))
    return { valid: false, error: "Roll number must be like 016 or 016AJK." };
  return { valid: true };
}
