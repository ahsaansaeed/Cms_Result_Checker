"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth-service";
import { historyService } from "@/services/history-service";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { SearchHistoryItem } from "@/types";
import { ExternalLink, History, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
      
      const items = await historyService.getUserHistory(currentUser.$id);
      setHistory(items);
      setLoading(false);
    };

    checkAuthAndLoad();
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <History className="h-8 w-8 text-primary" />
                Search History
              </h1>
              <p className="text-muted-foreground">
                View your 20 most recent result lookups.
              </p>
            </div>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              Back to Checker
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading your history...</p>
            </div>
          ) : history.length === 0 ? (
            <Card className="text-center py-16 border-dashed">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <History className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No history found</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    You haven't checked any results yet, or your history is empty.
                  </p>
                </div>
                <Link href="/" className={buttonVariants()}>
                  Check a Result Now
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {history.map((item, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between py-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">
                        {item.session} — {item.program}
                      </CardTitle>
                      <CardDescription className="font-mono">
                        Roll: {item.rollNumber}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground mr-4">
                        {new Date(item.searchedAt).toLocaleDateString()}
                      </span>
                      <a 
                        href={item.resultUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
