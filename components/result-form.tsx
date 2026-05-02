"use client";

import { SESSIONS, PROGRAMS, SUFFIXES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search } from "lucide-react";

interface ResultFormProps {
  session: string;
  setSession: (val: string) => void;
  program: string;
  setProgram: (val: string) => void;
  roll: string;
  setRoll: (val: string) => void;
  suffix: string;
  setSuffix: (val: string) => void;
  onCheck: () => void;
  isLoading: boolean;
}

export function ResultForm({
  session,
  setSession,
  program,
  setProgram,
  roll,
  setRoll,
  suffix,
  setSuffix,
  onCheck,
  isLoading,
}: ResultFormProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Result Lookup</CardTitle>
        <CardDescription className="text-center">
          Enter your session, program code, and roll number to fetch your grade chart.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="session">Academic Session</Label>
            <Select value={session} onValueChange={setSession}>
              <SelectTrigger id="session">
                <SelectValue placeholder="Select Session" />
              </SelectTrigger>
              <SelectContent>
                {SESSIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label} ({s.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Program Code</Label>
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAMS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label} ({p.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="roll">Roll Number</Label>
            <Input
              id="roll"
              placeholder="e.g. 016"
              value={roll}
              onChange={(e) => setRoll(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && onCheck()}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suffix">Campus/Suffix</Label>
            <Select 
              value={suffix || "none"} 
              onValueChange={(val) => setSuffix(val === "none" ? "" : val)}
            >
              <SelectTrigger id="suffix">
                <SelectValue placeholder="Select Suffix" />
              </SelectTrigger>
              <SelectContent>
                {SUFFIXES.map((s) => (
                  <SelectItem key={s.value} value={s.value || "none"}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          className="w-full text-lg h-12" 
          onClick={onCheck}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Check Result
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
