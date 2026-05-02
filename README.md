# 🎓 MUST Result Checker

A professional, fast, and mobile-friendly web application for students of **Mirpur University of Science & Technology (MUST)** to check their semester results instantly.

![Preview](https://via.placeholder.com/1200x630?text=MUST+Result+Checker)

## 🚀 Features

- **Instant Lookup**: Fetch your grade chart by Session, Program, and Roll Number.
- **Suffix Support**: Automatically handles campus suffixes like `AJK`, `BH`, and `PL`.
- **Search History**: Save and access your previous result lookups (via Appwrite).
- **Dark Mode**: Beautiful dark and light themes.
- **Pre-check System**: Server-side API checks CMS server availability and port 8082 status.
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Backend/Auth/DB**: Appwrite Cloud
- **Deployment**: Vercel

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd must-result-checker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Appwrite credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_ID=your_collection_id
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📐 Project Structure

- `app/`: Next.js pages and API routes.
- `components/`: UI components (shadcn/ui and custom).
- `hooks/`: Custom React hooks for business logic.
- `lib/`: Utility functions, constants, and validators.
- `services/`: Appwrite service layers (Auth and Database).
- `types/`: TypeScript definitions.

## 🛡️ Security & Privacy

- **Input Sanitization**: All user inputs are sanitized to prevent injection attacks.
- **CORS Friendly**: Uses native `<img>` tag loading to bypass cross-origin restrictions.
- **Anonymous Sessions**: Supports anonymous login for privacy-focused history tracking.

## 📝 License

This project is built for educational purposes and is not affiliated with the official MUST administration.

---

Built with ❤️ for MUST students.
