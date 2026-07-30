import Link from "next/link";

interface Professor {
  id: string;
  name: string | null;
  university: string | null;
  compatibilityScore: number | null;
  status: string;
}

export function OutreachTable({ professors }: { professors: Professor[] }) {
  if (professors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center border-2 border-dashed border-border rounded-xl">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
        <h3 className="font-medium text-lg">No professors tracked yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-1">
          Paste a link on the left to analyze your first professor and start building your outreach pipeline.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-sm text-muted-foreground">
            <th className="pb-3 font-medium">Professor</th>
            <th className="pb-3 font-medium">University</th>
            <th className="pb-3 font-medium">Match Score</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((prof) => (
            <tr key={prof.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-4 font-medium">{prof.name || "Unknown"}</td>
              <td className="py-4 text-sm text-muted-foreground">{prof.university || "-"}</td>
              <td className="py-4">
                {prof.compatibilityScore ? (
                  <div className="flex items-center gap-2">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden max-w-[60px]">
                      <div className="h-full bg-green-500" style={{ width: `${prof.compatibilityScore}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold">{prof.compatibilityScore}%</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">Pending</span>
                )}
              </td>
              <td className="py-4">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-600 font-medium border border-blue-500/20">
                  {prof.status}
                </span>
              </td>
              <td className="py-4 text-right">
                <Link href={`/workspace/${prof.id}`} className="text-sm font-medium text-primary hover:underline">
                  Open Workspace
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
