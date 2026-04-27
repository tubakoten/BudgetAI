# 💰 BudgetAI — Monthly Budget Tracking System

> COME 342 Introduction to Software Engineering — Term Project, Spring 2025–2026

---

## 👥 Group Members

| Name | GitHub |
|------|-----------|
| Tuba Köten | https://github.com/tubakoten |
| Fatma Işıl Belek | https://github.com/isilbelekk-collab |
| Begüm Karakoç | — |
| İrem Ceran | — |
| Rabia Güler | — |

---

## 📌 About the Project

BudgetAI is a mobile-first web application that helps students and young professionals in high-cost cities like Istanbul take control of their monthly finances. It reduces financial stress by providing real-time budget tracking, automated recurring transactions, proactive overspending alerts, and visual spending analytics — all with minimal manual effort.

---

## ✨ Features

- 🔐 **Authentication** — Secure email & password login with Supabase Auth
- ➕ **Manual Transactions** — Add income or expense entries in under 3 seconds
- 🤖 **Automation** — Monthly salary and rent proposals with user confirm/cancel control
- 📊 **Dashboard** — Real-time summary of income, expenses, and remaining budget
- ⚠️ **Smart Alerts** — Yellow alert at 80% budget usage, red alert at 100%
- 🍩 **Spending Chart** — Doughnut chart showing expense breakdown by category
- ↩️ **Undo** — Restore accidentally deleted transactions within 5 seconds
- 📱 **Mobile-First** — Fully responsive on all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Architecture | Layered Architecture (Data / Business / UI) |

---

## 🗂️ Project Structure

```
src/
└── layers/
    ├── business/
    │   ├── budgetService.js       # Budget calculations
    │   └── alertService.js        # Alert level logic
    ├── data/
    │   ├── supabaseClient.js      # Supabase connection
    │   └── transactionRepository.js # DB queries
    └── ui/
        ├── components/
        │   ├── Dashboard.jsx
        │   ├── TransactionForm.jsx
        │   ├── TransactionList.jsx
        │   └── SpendingChart.jsx
        └── hooks/
            └── useTransactions.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A Supabase account (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/tubakoten/BudgetAI.git
cd BudgetAI

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your Supabase project → **Settings → API**.

### Database Setup

Run the SQL schema in your Supabase SQL Editor:

```sql
-- See /docs/schema.sql for the full script
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📐 Architecture

BudgetAI follows a **Layered Architecture** that strictly separates concerns:

- **Data Layer** — Handles all Supabase queries. No UI logic.
- **Business Logic Layer** — Pure functions for budget calculations and alert levels. No database or UI dependencies.
- **Presentation Layer** — React components and hooks. Calls business functions; never touches the database directly.

This structure makes each layer independently testable and replaceable.

---

## 📄 License

This project was developed for academic purposes as part of COME 342 at the university. All rights reserved by the project group.
