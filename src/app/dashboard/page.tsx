"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OutreachTable } from "@/components/OutreachTable";

export default function Dashboard() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveryStatus, setDiscoveryStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [professors, setProfessors] = useState<any[]>([]);

  // Fetch saved professors for CRM view
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch("/api/professors");
        if (res.ok) {
          const data = await res.json();
          setProfessors(data.professors);
        }
      } catch (err) {
        console.error("Failed to fetch professors", err);
      }
    };
    fetchProfessors();
  }, [isScraping, isDiscovering]); // Re-fetch when operations complete

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsScraping(true);
    setErrorMsg("");
    
    try {
      const res = await fetch("/api/scrape-professor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      
      const data = await res.json();
      
      if (res.ok && data.professorId) {
        // Redirect to the Match & Generation workspace
        router.push(`/workspace/${data.professorId}`);
      } else {
        setErrorMsg("Failed to analyze professor: " + (data.error || "Unknown error"));
        setIsScraping(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred while analyzing the URL.");
      setIsScraping(false);
    }
  };

  const handleAutoDiscover = async () => {
    setIsDiscovering(true);
    setErrorMsg("");
    setDiscoveryStatus("Finding professors...");
    
    // Simulate steps for UX while the backend API processes the monolithic task
    const timers = [
      setTimeout(() => setDiscoveryStatus("Analysing candidates..."), 6000),
      setTimeout(() => setDiscoveryStatus("Ranking matches..."), 12000),
      setTimeout(() => setDiscoveryStatus("Finalizing..."), 20000),
    ];

    try {
      const res = await fetch("/api/discover-professors", { method: "POST" });
      
      console.log(`[AUTO-DISCOVER CLIENT] status: ${res.status}`);
      let data: any = {};
      try {
        const text = await res.text();
        console.log(`[AUTO-DISCOVER CLIENT] response: ${text}`);
        data = JSON.parse(text);
      } catch (e) {
        console.log(`[AUTO-DISCOVER CLIENT] Could not parse JSON`);
      }
      
      timers.forEach(clearTimeout);

      if (!res.ok) {
        setErrorMsg("Professor discovery failed. Please try again.");
        setIsDiscovering(false);
        setDiscoveryStatus("");
        return;
      }
      
      if (data.count === 0) {
        setErrorMsg("No matching professors were found. Try adjusting your research interests.");
        setIsDiscovering(false);
        setDiscoveryStatus("");
        return;
      }

      setDiscoveryStatus(`${data.count} matching professors discovered`);
      
      // Refresh the professors list
      const freshRes = await fetch("/api/professors");
      if (freshRes.ok) {
        const freshData = await freshRes.json();
        setProfessors(freshData.professors);
      }
      
      setTimeout(() => {
        setDiscoveryStatus("");
        setIsDiscovering(false);
      }, 3000);
      
    } catch (error) {
      console.error(error);
      timers.forEach(clearTimeout);
      setErrorMsg("Professor discovery failed. Please try again.");
      setDiscoveryStatus("");
      setIsDiscovering(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 page-fade-in relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[50%] rounded-full bg-secondary/10 blur-[120px] -z-10 pointer-events-none" />
      
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-duotone flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
            RC
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Research <span className="text-duotone">Copilot</span>
          </h1>
        </div>
        <nav className="flex gap-4">
          <Link href="/onboarding" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors glass rounded-full hover-lift">Edit Profile</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Input URL */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 rounded-2xl border border-border">
            <h2 className="text-xl font-semibold mb-2">Find a Professor</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Paste a link to a professor's homepage, lab website, or Google Scholar profile. 
              Our AI will analyze their recent work.
            </p>
            
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleScrape} className="space-y-4">
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://scholar.google.com/..." 
                className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50"
                required
              />
              <button 
                type="submit" 
                disabled={isScraping || isDiscovering}
                className="w-full py-3 bg-duotone text-primary-foreground rounded-xl font-semibold hover-lift btn-premium shadow-lg shadow-primary/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isScraping ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Analyzing...
                  </>
                ) : (
                  "Analyze Professor"
                )}
              </button>
            </form>
            
            <div className="relative mt-8 mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground glass rounded-full">Or</span>
              </div>
            </div>
            
            <button 
              onClick={handleAutoDiscover}
              disabled={isDiscovering || isScraping}
              className="w-full py-3 bg-card border border-primary/30 text-primary rounded-xl font-semibold hover:bg-primary/5 hover-lift disabled:opacity-50 transition-all flex flex-col items-center justify-center gap-1 shadow-sm"
            >
              {isDiscovering ? (
                <>
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Auto-Discovering
                  </div>
                  <span className="text-xs font-normal opacity-80">{discoveryStatus}</span>
                </>
              ) : (
                <>
                  Auto-Discover 5 Professors
                  <span className="text-xs font-normal opacity-80">Based on your CV & preferences</span>
                </>
              )}
            </button>

          </div>
          
          <div className="glass p-6 rounded-2xl border border-border bg-primary/5">
            <h3 className="font-semibold mb-2">Compatibility Engine</h3>
            <p className="text-xs text-muted-foreground">
              Once you submit a URL, the AI will crawl their latest publications, extract their research themes, 
              and cross-reference them against your CV to find the perfect talking points.
            </p>
          </div>
        </div>

        {/* Right Column: CRM View */}
        <div className="lg:col-span-2">
          <div className="glass p-6 rounded-2xl border border-border h-full min-h-[400px]">
            <h2 className="text-xl font-semibold mb-6">Outreach Pipeline</h2>
            <OutreachTable professors={professors} />
          </div>
        </div>
      </main>
    </div>
  );
}
