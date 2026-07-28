"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "", university: "", degree: "", department: "", 
    expectedGraduation: "", linkedin: ""
  });
  
  const [preferences, setPreferences] = useState({
    preferredResearchAreas: "", targetCountries: "", internshipDuration: "3 Months (Summer)"
  });

  const [file, setFile] = useState<File | null>(null);

  const handleComplete = async () => {
    if (!file) {
      alert("Please upload a document to continue.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 1. Parse CV
      const formData = new FormData();
      formData.append("file", file);
      
      const parseRes = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData
      });
      const parsedCV = await parseRes.json();
      
      if (parseRes.status !== 200) {
        alert("Failed to parse CV: " + (parsedCV.error || "Unknown error"));
        setIsSubmitting(false);
        return;
      }
      
      // 2. Save Profile
      const profileRes = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, preferences, parsedCV })
      });
      
      if (profileRes.status === 200) {
        router.push("/dashboard");
      } else {
        alert("Failed to save profile.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during onboarding.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[40%] rounded-full bg-primary/10 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[100px] -z-10" />

      <main className="w-full max-w-2xl glass rounded-2xl shadow-xl border border-border p-8 md:p-12 transition-all">
        
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{step === 1 ? "Personal Profile" : step === 2 ? "Research Preferences" : "Document Upload"}</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        {step === 1 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-6">Tell us about yourself</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50" placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">University</label>
                <input type="text" value={profile.university} onChange={(e) => setProfile({...profile, university: e.target.value})} className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50" placeholder="Stanford University" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Degree & Department</label>
                <input type="text" value={profile.degree} onChange={(e) => setProfile({...profile, degree: e.target.value})} className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50" placeholder="B.S. Computer Science" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expected Graduation</label>
                <input type="text" value={profile.expectedGraduation} onChange={(e) => setProfile({...profile, expectedGraduation: e.target.value})} className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50" placeholder="YYYY-MM" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <input type="url" value={profile.linkedin} onChange={(e) => setProfile({...profile, linkedin: e.target.value})} className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-6">Research Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Preferred Research Areas</label>
                <input type="text" value={preferences.preferredResearchAreas} onChange={(e) => setPreferences({...preferences, preferredResearchAreas: e.target.value})} className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50" placeholder="e.g. Healthcare NLP, Computer Vision" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Countries</label>
                <input type="text" value={preferences.targetCountries} onChange={(e) => setPreferences({...preferences, targetCountries: e.target.value})} className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50" placeholder="USA, Germany, UK" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Internship Duration</label>
                <select value={preferences.internshipDuration} onChange={(e) => setPreferences({...preferences, internshipDuration: e.target.value})} className="w-full p-3 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary/50">
                  <option>1 Month (Winter)</option>
                  <option>3 Months (Summer)</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-2">Upload your documents</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Our AI will parse your CV to build your permanent knowledge base.
            </p>
            
            <label className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">{file ? file.name : "Click to upload your CV"}</h3>
              <p className="text-sm text-muted-foreground">PDF up to 10MB</p>
              <input type="file" className="hidden" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
        )}

        <div className="mt-10 flex justify-between">
          <button onClick={() => setStep(Math.max(1, step - 1))} className={`px-6 py-3 rounded-xl font-medium transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-muted text-foreground hover:bg-muted/80'}`}>Back</button>
          
          {step < totalSteps ? (
            <button onClick={() => setStep(Math.min(totalSteps, step + 1))} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover-lift">Continue</button>
          ) : (
            <button onClick={handleComplete} disabled={isSubmitting} className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover-lift disabled:opacity-50">
              {isSubmitting ? "Analyzing CV..." : "Analyze & Complete"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
