# Research Copilot 🚀

Research Copilot is a locally-hosted, full-stack automation tool designed to eliminate the manual grind of academic outreach. 

If you've ever spent hours parsing through dense academic lab pages, trying to figure out what a professor is *actually* researching, hunting down their real email address, and agonizing over a personalized outreach email—this tool automates that entire workflow end-to-end.

## 📖 The Core Concept

The goal was simple: **Build a tool that works for one person to solve a hyper-specific, tedious workflow.** 

Instead of treating research outreach as a manual data-entry job, Research Copilot leverages LLMs and automated scraping to act as your personal academic assistant. You give it your CV and a professor's website, and it does the rest.

### The Final Automated Workflow:
1. **Onboarding / Parsing:** You log in with Google and upload your CV (PDF). The app parses the text and uses AI to extract your core skills, experiences, and research interests into a structured profile.
2. **Discovery & Scraping:** You provide a link to a professor's lab or academic page. The app scrapes the content and uses AI to summarize their *current* active research themes.
3. **The Match:** The AI cross-references your extracted CV profile against the professor's research themes to find genuine overlapping interests.
4. **Email Discovery:** The app hunts down the professor's academic email by scanning the scraped text, performing targeted academic domain searches (via Serper), or falling back to the Hunter.io API.
5. **Draft Generation & Gmail Integration:** Finally, the AI drafts a highly personalized, context-aware outreach email highlighting why you'd be a good fit for their lab. With one click, this draft is pushed directly into your actual Gmail Drafts folder.

## 🛠 Tech Stack

- **Framework:** [Next.js 13+ (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js v4 (Auth.js)](https://next-auth.js.org/) with Google Provider (requires Gmail compose scope)
- **AI Inference:** [Groq SDK](https://groq.com/) (using Llama 3 for lightning-fast inference)
- **Styling:** Tailwind CSS + Glassmorphism UI
- **External APIs:** Serper (Google Search), Hunter.io (Email Verification)

## 🚧 Difficulties & Lessons Learned

Building a full-stack tool from scratch is never as straightforward as the tutorials make it look. Here are some of the "boss battles" encountered during development:

### 1. NextAuth & Next.js 13+ App Router Quirks
Authentication was by far the trickiest architectural challenge. 
- **The Issue:** Migrating custom session callbacks and handling JWT lifecycles in the Next.js App Router caused massive headaches. At one point, refactoring the auth logic stripped the database ID from the JWT token, causing silent `401 Unauthorized` errors on protected routes, while public routes worked fine.
- **The Fix:** Standardized all protected API routes to verify identity natively via `session.user.email` (which Google's provider guarantees) and then dynamically queried Prisma for the user's DB record. We also had to navigate the exact import semantics (`next-auth/next` vs `next-auth`) to prevent Turbopack from crashing with `[CLIENT_FETCH_ERROR]` HTML responses.

### 2. Prisma Database Migrations
- **The Issue:** When deploying to Neon, an early database migration failed catastrophically with a `string contains embedded null` error from PostgreSQL.
- **The Fix:** The root cause was traced to a corrupted `migration.sql` file that was somehow encoded in UTF-16 with a Byte Order Mark (BOM) and contained leaked console output (`injected env (9) from .env // tip:`). Wiping the corrupted migration history and regenerating clean, UTF-8 migration files solved the issue.

### 3. Scraping & Email Discovery Accuracy
- **The Issue:** Academic websites are notoriously unstructured. Some are modern React apps; others are HTML tables from 1998. Finding an email address reliably without hitting rate limits or SSRF vulnerabilities required a multi-layered approach.
- **The Fix:** Built a cascading fallback system. Phase 1 scans the raw scraped HTML. Phase 2 leverages Google Serper to search the authoritative academic domain (`site:university.edu "Prof Name" email`). Phase 3 falls back to Hunter.io for programmatic guessing based on domain patterns.

## 🚀 Getting Started (Running Locally)

Since this project was built as a personal workflow automation tool, it is designed to run locally.

### Prerequisites
You will need API keys for:
- Google Cloud Console (OAuth Client ID & Secret with Gmail APIs enabled)
- Groq API
- Neon (PostgreSQL connection string)
- Serper & Hunter.io (optional, for email discovery)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file based on `.env.example`
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000` and start automating your outreach!

---
*Built to save hours of manual labor. Because code doesn't always have to scale to thousands of users to be valuable—sometimes it just needs to work perfectly for one.*
