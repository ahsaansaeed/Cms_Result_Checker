"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ResultForm } from "@/components/result-form";
import { ResultDisplay } from "@/components/result-display";
import { useResultChecker } from "@/hooks/use-result-checker";

export default function Home() {
  const {
    session,
    setSession,
    program,
    setProgram,
    roll,
    setRoll,
    suffix,
    setSuffix,
    status,
    error,
    resultUrl,
    checkResult,
    handleLoad,
    handleError,
  } = useResultChecker();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Check Your Results
            </h1>
            <p className="text-xl text-muted-foreground">
              Get instant access to your MUST CMS grade charts.
            </p>
          </div>

          <ResultForm
            session={session}
            setSession={setSession}
            program={program}
            setProgram={setProgram}
            roll={roll}
            setRoll={setRoll}
            suffix={suffix}
            setSuffix={setSuffix}
            onCheck={checkResult}
            isLoading={status === "loading"}
          />

          <ResultDisplay
            status={status}
            resultUrl={resultUrl}
            error={error}
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
