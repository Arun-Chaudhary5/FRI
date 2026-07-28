import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background gradients for a premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] -z-10" />

      <main className="flex flex-col items-center max-w-3xl text-center glass p-12 rounded-2xl shadow-2xl border border-white/20">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Your AI Research Copilot
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Automate Your Academic Outreach
        </h1>
        
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
          Stop writing generic cold emails. Our AI analyzes your CV and matches it with 
          professors' recent publications to draft highly personalized, authentic outreach 
          emails that get replies.
        </p>

        <div className="flex gap-4 w-full justify-center">
          <Link 
            href="/onboarding" 
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 hover-lift transition-all"
          >
            Get Started
          </Link>
          <a 
            href="#features" 
            className="px-8 py-4 bg-transparent border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all"
          >
            How it works
          </a>
        </div>
      </main>
    </div>
  );
}
