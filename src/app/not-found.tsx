import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="glass p-8 rounded-2xl border border-border max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2">404</h2>
        <h3 className="text-xl font-semibold mb-2">Page Not Found</h3>
        <p className="text-muted-foreground mb-8 text-sm">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/dashboard" className="w-full py-3 block bg-primary text-primary-foreground rounded-xl font-semibold hover-lift">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
