# 📋 MUST Result Checker Web App — Implementation Plan

> **Version:** 1.0  
> **Date:** May 2, 2026  
> **Tech Stack:** Next.js (App Router) · Tailwind CSS · shadcn/ui · Appwrite · Vercel

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [System Architecture](#3-system-architecture)
4. [URL Generation Logic](#4-url-generation-logic)
5. [UI/UX Design](#5-uiux-design)
6. [Folder Structure](#6-folder-structure-nextjs-app-router)
7. [Appwrite Integration](#7-appwrite-integration)
8. [API / Logic Layer](#8-api--logic-layer)
9. [Error Handling Strategy](#9-error-handling-strategy)
10. [Deployment Plan](#10-deployment-plan)
11. [Security Considerations](#11-security-considerations)
12. [Future Enhancements](#12-future-enhancements)
13. [Development Roadmap](#13-development-roadmap)

---

## 1. Project Overview

### What It Does

The **MUST Result Checker** is a web application that lets students of **Mirpur University of Science & Technology (MUST)** look up their semester results by entering three simple inputs:

| Input | Example |
|-------|---------|
| Session | `FA24` |
| Program | `BSE` |
| Roll Number | `016` |

The app constructs a URL pointing to the university's CMS server, fetches the result chart image, and displays it — all within a clean, mobile-friendly interface.

### Target URL Pattern

```
https://cms.must.edu.pk:8082/Chartlet/MUST<SESSION>-<PROGRAM>-<ROLL>/FanG_Chartlet_GPChart.Jpeg?<RANDOM>
```

### Target Users

- Undergraduate and postgraduate students of MUST.
- Faculty or staff who need to quickly verify a student's grade chart.

### Problem Being Solved

The official CMS portal requires multiple clicks and page loads. This app provides a **single-screen, instant lookup** experience.

---

## 2. Features

### Core Features (MVP)

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Result Lookup Form** | Three input fields: Session, Program, Roll Number |
| 2 | **Dynamic URL Generation** | Constructs the CMS image URL from user inputs |
| 3 | **Result Image Display** | Shows the grade chart image in a responsive card |
| 4 | **Error Handling** | Graceful messages for 404s, network failures, invalid input |
| 5 | **Loading States** | Skeleton / spinner while the image loads |

### Optional Features (Post-MVP)

| # | Feature | Description |
|---|---------|-------------|
| 6 | **Search History** | Store past lookups in Appwrite Database |
| 7 | **Authentication** | Login via Appwrite Auth to save personal history |
| 8 | **Dark / Light Mode** | Theme toggle using `next-themes` |
| 9 | **Share Result** | Copy shareable link or download image |

---

## 3. System Architecture

### High-Level Diagram

```
┌──────────────┐       ┌──────────────────┐       ┌─────────────────────┐
│              │       │                  │       │                     │
│   Browser    │──────▶│  Next.js on      │──────▶│  Appwrite Cloud     │
│   (Client)   │       │  Vercel          │       │  (Auth + Database)  │
│              │◀──────│  (App Router)    │◀──────│                     │
└──────┬───────┘       └──────────────────┘       └─────────────────────┘
       │
       │  Direct image request (client-side <img>)
       ▼
┌──────────────────────────┐
│  CMS Server              │
│  cms.must.edu.pk:8082    │
│  (Result Image Host)     │
└──────────────────────────┘
```

### How It Works

1. **User fills the form** → Client-side JS constructs the image URL.
2. **Image is loaded directly** via an `<img>` tag pointing at the CMS server.
3. **No server-side proxy needed** if the CMS server allows cross-origin image loading (most image hosts do for `<img>` tags).
4. **Appwrite** handles optional auth and search history storage.

### CORS Considerations

- `<img>` tags are **not blocked by CORS** — browsers allow cross-origin image loading natively.
- If you need to **programmatically read image pixels** (e.g., to detect a 404 error page), you would need a server-side proxy via a Next.js API route:

```typescript
// app/api/check-result/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const response = await fetch(url!, { method: "HEAD" });
  return Response.json({ exists: response.ok, status: response.status });
}
```

- The recommended approach is to use the `<img>` `onLoad` / `onError` events to detect success or failure without needing a proxy.

---

## 4. URL Generation Logic

### URL Template

```
BASE = "https://cms.must.edu.pk:8082/Chartlet/"
PATH = `MUST${session}-${program}-${roll}/FanG_Chartlet_GPChart.Jpeg`
QUERY = `?${Date.now()}` // cache-busting random parameter
FULL = BASE + PATH + QUERY
```

### Pseudocode

```
FUNCTION generateResultUrl(session, program, roll):
    session = session.trim().toUpperCase()        // e.g. "FA24"
    program = program.trim().toUpperCase()        // e.g. "BSE"
    roll    = roll.trim().padStart(3, '0')        // e.g. "016"

    path = "MUST" + session + "-" + program + "-" + roll
    url  = BASE_URL + path + "/FanG_Chartlet_GPChart.Jpeg"
    url  = url + "?" + randomNumber()             // cache bypass

    RETURN url
END FUNCTION
```

### Implementation (TypeScript)

```typescript
// lib/generate-url.ts

const BASE_URL = "https://cms.must.edu.pk:8082/Chartlet/";

export function generateResultUrl(
  session: string,
  program: string,
  roll: string
): string {
  const s = session.trim().toUpperCase();
  const p = program.trim().toUpperCase();
  const r = roll.trim().padStart(3, "0");

  const path = `MUST${s}-${p}-${r}/FanG_Chartlet_GPChart.Jpeg`;
  const cacheBuster = Date.now().toString() + Math.random().toString(36).slice(2);

  return `${BASE_URL}${path}?${cacheBuster}`;
}
```

### Cache-Busting Parameter

The `?<RANDOM>` query parameter ensures the browser does not serve a cached (stale) version of the image. We use `Date.now()` combined with a random string for uniqueness.

---

## 5. UI/UX Design

### Layout

```
┌─────────────────────────────────────────┐
│  🎓 MUST Result Checker        [Theme] │  ← Header
├─────────────────────────────────────────┤
│                                         │
│   ┌─────────────────────────────────┐   │
│   │  Session:   [ FA24         ▼ ]  │   │
│   │  Program:   [ BSE          ▼ ]  │   │
│   │  Roll No:   [ 016            ]  │   │
│   │                                 │   │
│   │  [ 🔍 Check Result ]           │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │      Result Image Card          │   │
│   │      (or error message)         │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│  Footer: Built for MUST students        │
└─────────────────────────────────────────┘
```

### shadcn/ui Components Used

| Component | Usage |
|-----------|-------|
| `Card`, `CardHeader`, `CardContent` | Wraps the form and result display |
| `Input` | Roll number field |
| `Select` | Session and Program dropdowns |
| `Button` | Submit / Check Result action |
| `Skeleton` | Loading placeholder while image loads |
| `Alert` | Error and success messages |
| `Label` | Accessible form labels |

### Responsive Design

- **Mobile-first** approach using Tailwind breakpoints.
- Form stacks vertically on small screens, side-by-side on `md+`.
- Result image uses `max-w-full` and `object-contain` for proper scaling.

### Loading & Error States

| State | UI |
|-------|----|
| **Idle** | Form visible, no result card |
| **Loading** | `Skeleton` placeholder in result area + disabled button |
| **Success** | Result image displayed in a `Card` |
| **Error** | `Alert` with destructive variant showing error message |

---

## 6. Folder Structure (Next.js App Router)

```
cms-result-checker/
├── app/
│   ├── layout.tsx              # Root layout (fonts, theme, metadata)
│   ├── page.tsx                # Home page (result checker)
│   ├── globals.css             # Tailwind + shadcn base styles
│   ├── api/
│   │   └── check-result/
│   │       └── route.ts        # Optional: HEAD-check proxy
│   ├── history/
│   │   └── page.tsx            # Optional: search history page
│   └── login/
│       └── page.tsx            # Optional: auth page
│
├── components/
│   ├── ui/                     # shadcn/ui generated components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   ├── alert.tsx
│   │   └── label.tsx
│   ├── result-form.tsx         # Main lookup form component
│   ├── result-display.tsx      # Image display + error states
│   ├── header.tsx              # App header with theme toggle
│   ├── footer.tsx              # App footer
│   └── theme-provider.tsx      # next-themes wrapper
│
├── lib/
│   ├── generate-url.ts         # URL generation function
│   ├── validators.ts           # Input validation helpers
│   ├── appwrite.ts             # Appwrite client setup
│   ├── constants.ts            # Sessions, programs, base URL
│   └── utils.ts                # shadcn cn() helper
│
├── services/
│   ├── auth-service.ts         # Appwrite Auth wrappers
│   └── history-service.ts      # Appwrite DB CRUD for history
│
├── hooks/
│   ├── use-result-checker.ts   # Custom hook for form + fetch logic
│   └── use-auth.ts             # Optional: auth state hook
│
├── types/
│   └── index.ts                # TypeScript interfaces
│
├── public/
│   ├── favicon.ico
│   └── og-image.png            # Open Graph image for SEO
│
├── .env.local                  # Environment variables
├── next.config.ts              # Next.js config (image domains)
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json
├── package.json
└── README.md
```

---

## 7. Appwrite Integration

### Setup

1. Create a project on [Appwrite Cloud](https://cloud.appwrite.io/).
2. Note the **Project ID** and **Endpoint**.
3. Store in `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_DATABASE_ID=result_checker_db
APPWRITE_COLLECTION_ID=search_history
```

### Client Initialization

```typescript
// lib/appwrite.ts
import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export { client };
```

### Authentication (Optional)

| Method | Description |
|--------|-------------|
| `account.createEmailPasswordSession()` | Email/password login |
| `account.createOAuth2Session('google')` | Google OAuth |
| `account.get()` | Get current user |
| `account.deleteSession('current')` | Logout |

### Database Schema — `search_history` Collection

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | String (36) | Yes | Appwrite user ID |
| `session` | String (10) | Yes | e.g. `FA24` |
| `program` | String (10) | Yes | e.g. `BSE` |
| `rollNumber` | String (10) | Yes | e.g. `016` |
| `resultUrl` | String (500) | Yes | Generated URL |
| `found` | Boolean | Yes | Whether image loaded |
| `searchedAt` | DateTime | Yes | Timestamp |

### History Service

```typescript
// services/history-service.ts
import { databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";

const DB_ID = process.env.APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID!;

export async function saveSearch(data: {
  userId: string;
  session: string;
  program: string;
  rollNumber: string;
  resultUrl: string;
  found: boolean;
}) {
  return databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
    ...data,
    searchedAt: new Date().toISOString(),
  });
}

export async function getUserHistory(userId: string) {
  return databases.listDocuments(DB_ID, COLLECTION_ID, [
    Query.equal("userId", userId),
    Query.orderDesc("searchedAt"),
    Query.limit(20),
  ]);
}
```

---

## 8. API / Logic Layer

### 8.1 — URL Generation Function

Already shown in [Section 4](#4-url-generation-logic). Resides in `lib/generate-url.ts`.

### 8.2 — Input Validation

```typescript
// lib/validators.ts

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateSession(session: string): ValidationResult {
  const pattern = /^(FA|SP)\d{2}$/i;
  if (!session.trim()) return { valid: false, error: "Session is required." };
  if (!pattern.test(session.trim()))
    return { valid: false, error: "Session must be like FA24 or SP25." };
  return { valid: true };
}

export function validateProgram(program: string): ValidationResult {
  const allowed = ["BSE", "BSCS", "BSIT", "BSSE", "BSAI", "MCS", "MSE"];
  const p = program.trim().toUpperCase();
  if (!p) return { valid: false, error: "Program is required." };
  if (!allowed.includes(p))
    return { valid: false, error: `Program must be one of: ${allowed.join(", ")}` };
  return { valid: true };
}

export function validateRoll(roll: string): ValidationResult {
  const pattern = /^\d{1,3}[A-Z]{0,3}$/i;
  if (!roll.trim()) return { valid: false, error: "Roll number is required." };
  if (!pattern.test(roll.trim()))
    return { valid: false, error: "Roll number must be like 016 or 016AJK." };
  return { valid: true };
}
```

### 8.3 — Image Existence Check (Optional Proxy)

```typescript
// app/api/check-result/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url || !url.startsWith("https://cms.must.edu.pk")) {
    return NextResponse.json({ exists: false, error: "Invalid URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(8000) });
    return NextResponse.json({ exists: res.ok, status: res.status });
  } catch {
    return NextResponse.json({ exists: false, error: "Network error" }, { status: 502 });
  }
}
```

> **When to use:** Only if the `<img>` `onError` event proves unreliable. In most cases, client-side detection is sufficient.

---

## 9. Error Handling Strategy

### Error Matrix

| Scenario | Detection Method | User Message |
|----------|-----------------|--------------|
| Empty / invalid input | Client-side validation | Field-level error under each input |
| Image not found (404) | `<img onError>` event | "No result found for this combination." |
| CMS server down | `<img onError>` + timeout | "The CMS server is not responding. Try again later." |
| Network offline | `navigator.onLine` check | "You appear to be offline." |
| Appwrite error | try/catch in service calls | "Could not save search history." (non-blocking) |

### Implementation Pattern

```typescript
// Inside the result-display component
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
const [errorMsg, setErrorMsg] = useState("");

function handleImageLoad() {
  setStatus("success");
}

function handleImageError() {
  setStatus("error");
  setErrorMsg("No result found. Please verify your session, program, and roll number.");
}

// In JSX:
// <img src={resultUrl} onLoad={handleImageLoad} onError={handleImageError} />
```

### Timeout Handling

Set a 10-second timeout. If the image hasn't loaded by then, show a warning:

```typescript
useEffect(() => {
  if (status !== "loading") return;
  const timer = setTimeout(() => {
    setStatus("error");
    setErrorMsg("Request timed out. The server may be slow or unreachable.");
  }, 10000);
  return () => clearTimeout(timer);
}, [status]);
```

---

## 10. Deployment Plan

### Vercel Setup

1. Push code to a GitHub repository.
2. Import the repo in [Vercel Dashboard](https://vercel.com/new).
3. Vercel auto-detects Next.js — no special build config needed.
4. Set environment variables in Vercel project settings.

### Environment Variables

| Variable | Where | Value |
|----------|-------|-------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Vercel + `.env.local` | `https://cloud.appwrite.io/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Vercel + `.env.local` | Your Appwrite project ID |
| `APPWRITE_DATABASE_ID` | Vercel + `.env.local` | `result_checker_db` |
| `APPWRITE_COLLECTION_ID` | Vercel + `.env.local` | `search_history` |

### Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.must.edu.pk",
        port: "8082",
        pathname: "/Chartlet/**",
      },
    ],
  },
};

export default nextConfig;
```

> **Note:** If using a plain `<img>` tag instead of `next/image`, this config is not required but is good practice.

### Custom Domain (Optional)

- Add a custom domain in Vercel (e.g., `result.must-students.com`).
- Update DNS records as prompted by Vercel.

---

## 11. Security Considerations

### Input Sanitization

- **Whitelist characters:** Only allow alphanumeric characters and hyphens in inputs.
- **Trim and uppercase** all inputs before URL construction.
- **Reject suspicious patterns:** Block any input containing `/`, `..`, `<`, `>`, or script tags.

```typescript
export function sanitizeInput(input: string): string {
  return input.replace(/[^a-zA-Z0-9-]/g, "").trim();
}
```

### URL Validation

- Always verify the generated URL starts with the expected base URL before use.
- Never allow user-supplied arbitrary URLs to be fetched by the API proxy.

### Rate Limiting (Optional)

- Use Vercel's built-in Edge Middleware or a library like `next-rate-limit` to limit API route calls.
- Suggested limit: **30 requests per minute per IP**.

### Appwrite Security

- Set **collection-level permissions** so users can only read/write their own history documents.
- Use Appwrite's built-in session management — never store tokens manually.

---

## 12. Future Enhancements

| Priority | Enhancement | Description |
|----------|-------------|-------------|
| 🔴 High | **Auto-detect Session** | Pre-fill session based on current date (FA = Aug–Dec, SP = Jan–Jun) |
| 🔴 High | **PDF Download** | Convert the result image to a downloadable PDF |
| 🟡 Medium | **Bulk Checker** | Upload a CSV of roll numbers and fetch all results at once |
| 🟡 Medium | **Screenshot & Share** | Use `html2canvas` to capture and share result cards |
| 🟢 Low | **Push Notifications** | Notify students when new results are available |
| 🟢 Low | **Analytics Dashboard** | Track popular programs, peak usage times |
| 🟢 Low | **PWA Support** | Installable app with offline caching of past results |

---

## 13. Development Roadmap

### Phase 1 — UI Foundation (Days 1–2)

- [ ] Initialize Next.js project with App Router
- [ ] Install and configure Tailwind CSS
- [ ] Install shadcn/ui and add required components
- [ ] Build `Header`, `Footer`, `ResultForm`, `ResultDisplay` components
- [ ] Implement responsive layout
- [ ] Add dark/light theme toggle

### Phase 2 — Core Logic (Days 3–4)

- [ ] Implement `generateResultUrl()` in `lib/generate-url.ts`
- [ ] Implement input validators in `lib/validators.ts`
- [ ] Create `useResultChecker` custom hook
- [ ] Wire up form submission → URL generation → image display
- [ ] Add loading, success, and error states
- [ ] Add timeout handling

### Phase 3 — Appwrite Integration (Days 5–6)

- [ ] Set up Appwrite project and database
- [ ] Initialize Appwrite client in `lib/appwrite.ts`
- [ ] Implement auth service (login, logout, session check)
- [ ] Implement history service (save search, list history)
- [ ] Build the `/history` page
- [ ] Add login/signup flow

### Phase 4 — Polish & Deploy (Days 7–8)

- [ ] Add SEO metadata (title, description, Open Graph)
- [ ] Test on multiple devices and browsers
- [ ] Set up Vercel project and environment variables
- [ ] Deploy to production
- [ ] Write README.md with setup instructions
- [ ] Share with users and gather feedback

### Milestone Summary

```
Week 1:  ████████████████████████████████████████ MVP Live
Week 2+: Iterate based on feedback, add optional features
```

---

## Quick Start (Developer Reference)

```bash
# 1. Create the project
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# 2. Install shadcn/ui
npx -y shadcn@latest init

# 3. Add components
npx -y shadcn@latest add button card input select skeleton alert label

# 4. Install Appwrite SDK
npm install appwrite

# 5. Install theme support
npm install next-themes

# 6. Run dev server
npm run dev
```

---

> **This plan is a living document.** Update it as requirements evolve and new decisions are made.
