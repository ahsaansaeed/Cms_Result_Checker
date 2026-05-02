"use client";

import { Moon, Sun, GraduationCap, History, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth-service";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    authService.getCurrentUser().then(setUser);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">MUST Results</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link 
            href="/history" 
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:flex gap-2")}
          >
            <History className="h-4 w-4" />
            History
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {user ? (
            <Link 
              href="/history" 
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className={buttonVariants({ size: "sm" })}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
