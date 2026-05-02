"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultDisplayProps {
  status: "idle" | "loading" | "success" | "error";
  resultUrl: string | null;
  error: string | null;
  onLoad: () => void;
  onError: () => void;
}

export function ResultDisplay({
  status,
  resultUrl,
  error,
  onLoad,
  onError,
}: ResultDisplayProps) {
  if (status === "idle") return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 space-y-6">
      {status === "error" && (
        <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="overflow-hidden border-2 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
          <CardTitle className="text-xl">Student Grade Chart</CardTitle>
          {status === "success" && resultUrl && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={resultUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Original
                </a>
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0 relative min-h-[400px] flex items-center justify-center bg-zinc-950/5">
          {status === "loading" && (
            <div className="absolute inset-0 p-6 space-y-4">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-8 w-1/2 mx-auto" />
            </div>
          )}
          
          {resultUrl && (
            <img
              src={resultUrl}
              alt="Grade Chart"
              className={`max-w-full transition-opacity duration-500 ${
                status === "success" ? "opacity-100" : "opacity-0 absolute"
              }`}
              onLoad={onLoad}
              onError={onError}
            />
          )}

          {status === "error" && (
            <div className="text-center p-12 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Unable to display the result chart.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
