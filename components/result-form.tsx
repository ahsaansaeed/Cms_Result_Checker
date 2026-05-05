"use client";

import { useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [programOpen, setProgramOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);

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
            <Popover open={sessionOpen} onOpenChange={setSessionOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={sessionOpen}
                  className="w-full justify-between font-normal h-10 border-input bg-background"
                >
                  {session
                    ? SESSIONS.find((s) => s.value === session)?.label
                    : "Select Session"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder="Search session..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No session found.</CommandEmpty>
                    <CommandGroup>
                      {SESSIONS.map((s) => (
                        <CommandItem
                          key={s.value}
                          value={`${s.label} ${s.value}`}
                          onSelect={() => {
                            setSession(s.value);
                            setSessionOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              session === s.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {s.label} ({s.value})
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Program Code</Label>
            <Popover open={programOpen} onOpenChange={setProgramOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={programOpen}
                  className="w-full justify-between font-normal h-10 border-input bg-background"
                >
                  {program
                    ? PROGRAMS.find((p) => p.value === program)?.label
                    : "Select Program"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder="Search program..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No program found.</CommandEmpty>
                    <CommandGroup>
                      {PROGRAMS.map((p) => (
                        <CommandItem
                          key={p.value}
                          value={`${p.label} ${p.value}`}
                          onSelect={() => {
                            setProgram(p.value);
                            setProgramOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              program === p.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {p.label} ({p.value})
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
              onValueChange={(val) => setSuffix(val === "none" || !val ? "" : val)}
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
