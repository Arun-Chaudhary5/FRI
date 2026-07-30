"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { ChatGPTModal } from "@/components/ChatGPTModal";

export default function Workspace() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [professor, setProfessor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);
  const [findingEmail, setFindingEmail] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "found" | "not_found" | "error">("idle");
  const [draftStatus, setDraftStatus] = useState<"idle" | "saving" | "success" | "error" | "revoked">("idle");
  const [draftError, setDraftError] = useState("");
  
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [showPromptModal, setShowPromptModal] = useState(false);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const res = await fetch(`/api/professors/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProfessor(data.professor);
          if (data.professor.email) setEmailStatus("found");
          if (data.professor.subject) setEmailSubject(data.professor.subject);
          if (data.professor.notes && data.professor.status === "DRAFTED") {
            // Already drafted
          } else if (!data.professor.compatibilityScore) {
            handleMatch();
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfessor();
  }, [id]);

  const handleMatch = async () => {
    setMatching(true);
    try {
      const res = await fetch(`/api/professors/${id}/match`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setProfessor(data.professor);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMatching(false);
    }
  };

  const [findingStatus, setFindingStatus] = useState("");

  const handleFindEmail = async () => {
    setFindingEmail(true);
    setEmailStatus("idle");
    setFindingStatus("Searching university pages...");
    
    const timers = [
      setTimeout(() => setFindingStatus("Checking faculty profile..."), 3000),
      setTimeout(() => setFindingStatus("Verifying academic email..."), 7000),
    ];
    
    try {
      const res = await fetch("/api/find-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ professorId: id })
      });
      const data = await res.json();
      timers.forEach(clearTimeout);
      
      if (res.ok && data.email) {
        setProfessor({ 
          ...professor, 
          email: data.email,
          emailStatus: data.emailStatus,
          emailConfidence: data.emailConfidence,
          emailSource: data.emailSource,
          emailSourceUrl: data.emailSourceUrl
        });
        setEmailStatus("found");
      } else {
        setEmailStatus("not_found");
      }
    } catch (e) {
      console.error(e);
      timers.forEach(clearTimeout);
      setEmailStatus("error");
    } finally {
      setFindingEmail(false);
      setFindingStatus("");
    }
  };

  const handleSendEmail = async () => {
    if (!session) {
      signIn("google");
      return;
    }
    
    if (!professor.email) {
      setDraftStatus("error");
      setDraftError("Please find or enter an email address first.");
      return;
    }

    setSendingEmail(true);
    setDraftStatus("saving");
    setDraftError("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: professor.email,
          subject: emailSubject,
          body: emailBody
        })
      });
      
      if (res.ok) {
        setDraftStatus("success");
        setProfessor({ ...professor, status: "DRAFTED" });
      } else {
        const data = await res.json();
        if (res.status === 401) {
          setDraftStatus("revoked");
        } else {
          setDraftStatus("error");
          setDraftError(data.error || "Unknown error");
        }
      }
    } catch (e) {
      console.error(e);
      setDraftStatus("error");
      setDraftError("Failed to save draft.");
    } finally {
      setSendingEmail(false);
    }
  };

  const generateChatGPTContext = () => {
    if (!professor) return "";
    
    let talkingPoints = [];
    try {
      if (professor.notes) {
        const notes = JSON.parse(professor.notes);
        talkingPoints = notes.talkingPoints || [];
      }
    } catch (e) {}

    return `I need to write a cold email to a professor for a PhD/Research internship. Please write a highly personalized, concise email that does NOT sound like an AI wrote it. No clichés like "I hope this email finds you well" or "delve into".

PROFESSOR INFO:
Name: ${professor.name}
Lab/University: ${professor.lab || professor.university}
Their Research: ${professor.aiAnalysisSummary}
Key Themes: ${professor.currentThemes}

OUR SYNERGY (Talking Points to include):
${talkingPoints.map((tp: string) => `- ${tp}`).join("\n")}

EMAIL REQUIREMENTS:
1. Subject line should be short and specific to their research.
2. Opening: Direct and referencing a specific paper or project of theirs.
3. Middle: How my background specifically connects to their work.
4. Call to Action: Asking for a brief 10 min chat or if they are taking students.
5. Tone: Academic, highly technical, humble, and strictly professional. Avoid flowery language.
6. CRITICAL: Do NOT say "I have attached my CV" or mention any attachments. This email will be sent as plain text without attachments.`;
  };



  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Workspace...</div>;
  }

  if (!professor) {
    return <div className="min-h-screen flex items-center justify-center">Professor not found.</div>;
  }

  let talkingPoints = [];
  try {
    if (professor.notes) {
      const notes = JSON.parse(professor.notes);
      talkingPoints = notes.talkingPoints || [];
    }
  } catch (e) {}

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      <header className="border-b border-border bg-card/50 px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Dashboard
          </Link>
          <div className="h-4 w-px bg-border"></div>
          <h1 className="font-semibold">{professor.name}</h1>
          <span className={`px-2 py-0.5 text-xs rounded-full font-medium border ${
            professor.status === 'SENT' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
            professor.status === 'DRAFTED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
            'bg-muted text-muted-foreground border-border'
          }`}>
            {professor.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleMatch} disabled={matching} className="text-sm font-medium px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 disabled:opacity-50 transition-colors">
            {matching ? "Analyzing Match..." : "Recalculate Match"}
          </button>
          <button className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-lg hover-lift shadow-sm">
            Save Draft
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Intelligence & Match */}
        <div className="w-1/2 border-r border-border bg-muted/10 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          
          <div className="glass p-6 rounded-2xl border border-border flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-1">{professor.name}</h2>
              <p className="text-muted-foreground font-medium mb-4">{professor.position ? professor.position + " at " : ""}{professor.university}</p>
              
              {emailStatus === "found" && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-500/10 px-3 py-1.5 rounded-lg w-fit mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {professor.emailStatus === "VERIFIED_PUBLIC" ? "✓ Verified academic email" : "✓ Email found"}
                  </div>
                  {professor.emailConfidence && (
                    <div className="text-xs text-muted-foreground ml-1">
                      Confidence: {professor.emailConfidence}%
                    </div>
                  )}
                  {professor.emailSource && (
                    <div className="text-xs text-muted-foreground ml-1">
                      Source: {professor.emailSourceUrl ? <a href={professor.emailSourceUrl} target="_blank" rel="noreferrer" className="underline hover:text-primary">{professor.emailSource}</a> : professor.emailSource}
                    </div>
                  )}
                </div>
              )}
              
              {emailStatus === "not_found" && (
                <div className="flex items-center gap-2 text-sm text-yellow-600 font-medium bg-yellow-500/10 px-3 py-1.5 rounded-lg w-fit">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  No verified academic email found
                </div>
              )}

              {emailStatus === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-600 font-medium bg-red-500/10 px-3 py-1.5 rounded-lg w-fit">
                  Email lookup temporarily unavailable
                </div>
              )}
            </div>
            
            {emailStatus !== "found" && (
              <button 
                onClick={handleFindEmail}
                disabled={findingEmail || emailStatus === "error"}
                className="px-3 py-1.5 bg-blue-500/10 text-blue-600 font-medium text-sm rounded-lg hover:bg-blue-500/20 transition-colors disabled:opacity-50"
              >
                {findingEmail ? (findingStatus || "Finding...") : "Find Academic Email"}
              </button>
            )}
          </div>
            
          <div className="glass p-6 rounded-2xl border border-border">
            {matching ? (
              <div className="h-24 flex items-center justify-center flex-col gap-2 bg-card rounded-xl border border-border">
                <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span className="text-sm font-medium">Running Compatibility Engine...</span>
              </div>
            ) : professor.compatibilityScore ? (
              <div className="bg-card rounded-xl border border-border p-4 flex gap-6 items-center">
                <div className="flex flex-col items-center justify-center shrink-0 w-20 h-20 rounded-full bg-primary/10 border-4 border-primary/20">
                  <span className="text-2xl font-bold text-primary">{professor.compatibilityScore}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Match</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Why this is a {professor.compatibilityScore > 80 ? 'great' : 'moderate'} match:</h3>
                  <p className="text-sm text-muted-foreground">{professor.compatibilityReasoning}</p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Research Summary */}
          <div className="glass p-6 rounded-2xl border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              AI Research Analysis
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              {professor.aiAnalysisSummary || "No analysis available."}
            </p>
            
            {talkingPoints.length > 0 && (
              <>
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-2">Recommended Talking Points</h4>
                <ul className="space-y-2">
                  {talkingPoints.map((tp: string, idx: number) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="text-primary shrink-0 mt-0.5">•</span>
                      <span>{tp}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
        </div>

        {/* RIGHT PANEL: Email Editor */}
        <div className="w-1/2 flex flex-col relative bg-card">
          
          <div className="p-6 border-b border-border bg-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Draft Email</h2>
              <button onClick={() => setShowPromptModal(true)} className="flex items-center gap-2 text-sm font-semibold text-blue-500 bg-blue-500/10 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ChatGPT No-Key Mode
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-12">To:</span>
                <input 
                  type="text" 
                  value={professor.email || ""} 
                  onChange={(e) => setProfessor({...professor, email: e.target.value})}
                  placeholder="Unknown - Click 'Find Email via Apollo'" 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium" 
                />
              </div>
              <div className="h-px w-full bg-border"></div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground w-12">Subject:</span>
                <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="e.g. Prospective PhD Student - Interest in [Research Topic]" className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium focus:outline-none" />
              </div>
            </div>
          </div>

          <textarea 
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            className="flex-1 w-full resize-none p-6 bg-transparent border-none focus:ring-0 focus:outline-none text-foreground leading-relaxed"
            placeholder="Use the ChatGPT No-Key Mode button above to generate a highly personalized draft, or start typing here..."
          ></textarea>

          <div className="p-4 border-t border-border bg-muted/20 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-muted-foreground">Draft autosaved locally.</span>
                <div className="flex items-center gap-2 font-medium">
                  {status === "loading" && <span className="text-yellow-500">Refreshing Gmail connection...</span>}
                  {status === "authenticated" && draftStatus !== "revoked" && !(session as any)?.error && <span className="text-green-500 flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Gmail Connected</span>}
                  {draftStatus === 'error' && <span className="text-red-500">{draftError}</span>}
                  {draftStatus === 'success' && <span className="text-green-500">Draft saved to Gmail!</span>}
                </div>
              </div>
              <button 
                onClick={handleSendEmail} 
                disabled={sendingEmail || status === "loading"}
                className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all ${
                  session ? "bg-primary text-primary-foreground hover-lift" : "bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                }`}
              >
                {sendingEmail ? "Saving..." : 
                 draftStatus === "revoked" || (session as any)?.error === "RefreshAccessTokenError" ? "Reconnect Gmail" :
                 session ? "Save Draft to Gmail" : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
                    Connect Gmail
                  </>
                )}
              </button>
            </div>
          </div>

          {showPromptModal && (
            <ChatGPTModal promptContext={generateChatGPTContext()} onClose={() => setShowPromptModal(false)} />
          )}

        </div>
      </div>
    </div>
  );
}
