# 🎓 SkillBarter Campus — Student Time-Banking & Skill Exchange Platform

> **Semester 3 Mini Project**  
> *A decentralized on-campus skill barter network powered by a transparent Time-Banking Credit Ledger.*  
> **Core Premise:** 1 Hour Taught = **+1 Credit** | 1 Hour Learned = **-1 Credit** (Zero cash required).

---

## 🌟 1. Project Overview & Motivation

College students possess rich, diverse talents—ranging from algorithmic programming, calculus tutoring, and organic chemistry to conversational languages, Figma design, guitar playing, and fitness coaching. However, traditional tutoring services are either prohibitively expensive or socially awkward to negotiate.

**SkillBarter Campus** solves this through a **Time-Banking / Credit Ledger Architecture**:
1. **Time as Currency:** All hours are created equal. One hour of tutoring Python equals one hour of conversational Spanish or one hour of Figma prototyping.
2. **Double-Entry Ledger:** Every transaction is immutably logged with timestamps, participant IDs, session references, and balance changes.
3. **Escrow & Verification:** Credits are held in escrow during booking and only transfer once a session is marked **Completed** and verified by the participants.
4. **Welcome Grant:** Verified campus students receive an initial **+3 Credit Bonus** to start learning immediately without an upfront teaching barrier.

---

## 🚀 2. Quick Start & Execution

You have **three seamless ways** to run and evaluate this project:

### Option A: One-Click Windows Launcher (Recommended for Demo)
Simply double-click the included batch script:
```cmd
run_app.bat
```
*This starts the Python full-stack server on `http://localhost:3000` and automatically launches your browser.*

### Option B: Run via Python Server
No external pip libraries needed—uses Python's standard library:
```bash
python server.py
# or on Windows:
py server.py
```
Open **`http://localhost:3000`** in any web browser.

### Option C: Direct Zero-Install Browser Launch
Double-click **`index.html`** or open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.  
*All features (React 18, Tailwind CSS, Lucide icons, LocalStorage persistence, and the Time-Banking engine) run directly inside the browser.*

### Option D: Modern Node.js / Vite & Express Split (Optional)
If running in a Node.js developer environment:
```bash
# 1. Install dependencies
npm install

# 2. Run Vite frontend dev server
npm run dev

# 3. Run Express backend in a separate terminal
npm run server
```

---

## 💻 3. System Architecture & Feature Checklist

### 1. Landing & Authentication Page
- [x] **Hero Value Proposition:** High-impact campus branding explaining how time-banking works.
- [x] **Time-Bank Equilibrium Visualizer:** Interactive diagram illustrating `+1 Hour Taught = +1 Credit` and `-1 Hour Learned = -1 Credit`.
- [x] **Campus Student Sign-Up & Login:**
  - Requires campus email (`@campus.edu`), student major, graduation year, and password.
  - Automatically awards a **+3 Credit Welcome Grant** to new student accounts.
- [x] **Demo Persona Switcher:** Top simulator bar allowing evaluators to switch between 4 realistic student personas in one click:
  1. **Aarav Sharma** (CS Senior '25 — Web Dev, React, Python)
  2. **Elena Rostova** (Fine Arts Junior '26 — Figma UI/UX, 3D Sculpting)
  3. **Marcus Chen** (Business Analytics Soph '27 — Financial Modeling, Excel)
  4. **Priya Patel** (Linguistics & Pre-Med '26 — Spanish, Organic Chemistry)

### 2. Explore / Skills Marketplace
- [x] **Live Reactive Search:** Search by skill name, student name, keyword, or topic.
- [x] **Genre / Category Filtering:**
  - 💻 *Programming & Tech* (React, Python, Data Structures)
  - 📚 *Academic & Tutoring* (Calculus, Organic Chem, Finance)
  - 🗣️ *Languages* (Spanish, French, Japanese)
  - 🎨 *Design & Arts* (Figma UI/UX, Blender 3D)
  - 🎵 *Music & Creative* (Acoustic Guitar, Video Editing)
  - 🏃 *Fitness & Wellness* (Strength Training, Nutrition)
  - 💼 *Career & Professional* (Resume Review, Mock Interviews)
- [x] **Skill Mode Filter:**
  - `🎓 Available to Teach` (Learn from them, cost: 1 credit)
  - `🙋 Seeking Tutors` (Offer to teach them, earn: +1 credit)
- [x] **Sorting:** Sort by Recently Added or Highest Student Rating.
- [x] **Skill Cards:** Student avatar, name, major, rating, proficiency level, meeting location, and direct action buttons.
- [x] **Book Session Proposal Modal:** Date, time, campus meeting spot, message, and real-time ledger preview.

### 3. Comprehensive User Dashboard (4 Tabs)
- [x] **Profile Tab:**
  - Full student identity card with verified campus badge.
  - Prominent **Time-Bank Credit Display** showing current balance, hours taught (+), and hours learned (-).
  - Student bio, major, graduation year, and reputation score.
  - List of active skills offered with removal options.
  - List of skills wanted/wishlist.
- [x] **Credit Ledger / History Tab:**
  - Complete, transparent audit log of all transactions.
  - Shows transaction type (`Welcome Grant`, `Credit Earned`, `Credit Spent`).
  - Records counterparty student name, reference session ID, timestamp, credit change (+1 / -1), and updated balance.
  - Real-time ledger integrity status badge.
- [x] **My Sessions / Bookings Tab:**
  - Tracks sessions categorized by role (`Teaching` vs. `Learning`) and status (`Pending`, `Confirmed`, `Completed`).
  - **Accept / Decline** controls for pending proposals.
  - **"Mark Completed & Settle Credits"** button:
    - Automatically executes the transfer (+1 to teacher, -1 from learner).
    - Writes immutable entries into both participants' ledger histories.
    - Opens the **Rating & Testimonial** dialog to update student reputation.
- [x] **Add / Manage Skills Tab:**
  - Clean form to list a new skill to teach or request a skill to learn.
  - Live category selector, proficiency levels, location, and schedule availability.
  - Immediately publishes to the campus marketplace.

### 4. UI/UX Standards
- [x] Styled with **Tailwind CSS** using a crisp, student-friendly palette (Indigo/Brand-600, Emerald-600, Slate).
- [x] Fully responsive across mobile smartphones, tablets, and desktop monitors.
- [x] Interactive toast notification system providing immediate visual feedback for all transactions.

---

## 📊 4. Database Schema & Data Models

### User Model
```json
{
  "id": "usr_aarav",
  "name": "Aarav Sharma",
  "email": "aarav.sharma@campus.edu",
  "major": "Computer Science",
  "gradYear": "2025",
  "creditBalance": 4,
  "rating": 4.9,
  "reviewsCount": 14,
  "sessionsTaught": 8,
  "sessionsLearned": 4,
  "badges": ["Top Mentor", "Code Wizard"]
}
```

### Skill Model
```json
{
  "id": "sk_1",
  "userId": "usr_aarav",
  "userName": "Aarav Sharma",
  "type": "teaching", // "teaching" or "learning"
  "title": "Full-Stack Web Development with React & Tailwind",
  "category": "Programming & Tech",
  "level": "Intermediate to Advanced",
  "location": "Engineering Lab 3 / Online",
  "availability": "Tue/Thu afternoons, Weekends",
  "creditsCost": 1,
  "createdAt": "2026-10-28T14:30:00Z"
}
```

### Session Booking Model
```json
{
  "id": "ses_active_1",
  "skillId": "sk_1",
  "skillTitle": "Full-Stack Web Development with React & Tailwind",
  "teacherId": "usr_aarav",
  "learnerId": "usr_marcus",
  "status": "confirmed", // "pending" | "confirmed" | "completed" | "declined"
  "scheduledDate": "2026-11-12",
  "scheduledTime": "15:30",
  "locationDetails": "Main Library Room 4A",
  "creditAmount": 1,
  "ratingGiven": 5,
  "reviewText": "Great peer session!"
}
```

### Ledger Transaction Model (Double-Entry)
```json
{
  "id": "tx_102",
  "userId": "usr_aarav",
  "type": "credit_earned", // "credit_earned" | "credit_spent" | "credit_bonus"
  "amount": 1,
  "description": "Taught 'Python Basics & Algorithms' to Marcus Chen",
  "partnerName": "Marcus Chen",
  "sessionId": "ses_901",
  "timestamp": "2026-10-25T16:30:00Z",
  "balanceAfter": 4,
  "status": "settled"
}
```

---

## 🧪 5. Suggested Evaluation / Demo Walkthrough

To demo the platform to professors, evaluators, or peers:
1. **Explore Marketplace:**
   - Go to **Marketplace**. Filter by `Academic & Tutoring` or search for `Spanish`.
   - Toggle between `Available to Teach` and `Seeking Tutors`.
2. **Simulate a Booking:**
   - As **Aarav** (CS Senior), find Priya Patel's *Conversational Spanish* listing.
   - Click **Book Session (-1 cr)**. Fill in the date, time, and click **Send Barter Proposal**.
3. **Switch Persona to Priya:**
   - On the top dark simulator bar, click **Priya (5 cr)**.
   - Open **Dashboard -> My Bookings**. Notice the incoming proposal from Aarav.
   - Click **Accept Proposal**.
4. **Complete Session & Verify Ledger:**
   - Click **Mark Completed & Settle Credits**. Leave a 5-star review.
   - Watch the instant toast notification!
   - Priya's balance increases to **6 cr** (+1 for teaching).
   - Click **Credit Ledger / History** to see the newly settled entry.
5. **Switch Back to Aarav:**
   - Click **Aarav** in the top bar.
   - Notice Aarav's balance decreased by 1 credit (spent on Spanish).
   - Check Aarav's **Credit Ledger** to see `-1.0 Credit Spent: Learned Conversational Spanish from Priya Patel`.

---

## 📁 6. Codebase File Structure

```
d:\Mini project sem 3\
├── index.html                  # Turnkey Standalone SPA (React 18, Tailwind, Lucide, Ledger Engine)
├── server.py                   # Python standard library Full-Stack REST & Static Web Server
├── run_app.bat                 # One-click Windows startup script
├── package.json                # Modern Node.js project manifest & scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS theme extension
├── postcss.config.js           # PostCSS configuration
├── README.md                   # Project documentation & evaluator report
├── src/                        # Modular React source code
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   └── SkillBarterContext.jsx  # Global state machine & time-banking engine
│   ├── data/
│   │   └── mockData.js             # Initial student personas, listings & history
│   └── components/
│       ├── Navbar.jsx
│       ├── HeroSection.jsx
│       ├── Marketplace.jsx
│       ├── SkillCard.jsx
│       ├── BookSessionModal.jsx
│       ├── CompletionModal.jsx
│       ├── AuthModal.jsx
│       ├── Toast.jsx
│       └── Dashboard/
│           ├── Dashboard.jsx
│           ├── ProfileTab.jsx
│           ├── LedgerTab.jsx
│           ├── SessionsTab.jsx
│           └── AddSkillTab.jsx
└── server/
    └── server.js               # Node.js / Express REST API backend
```

---

## 🎓 7. Educational Highlights for Semester 3 Submission
- **Economic Principles:** Implementation of mutual credit clearing and time-banking algorithms.
- **Data Integrity:** Strict validation ensuring learners cannot book sessions when credit balances fall below 1.
- **User Experience:** Clean card hierarchy, high contrast status pills, accessible modal dialogs, and instant reactive updates.
