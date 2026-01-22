# School of Gaming – Registration Form System

This project is a prototype registration system developed during my internship at **School of Gaming (SoG)**.  
The goal is to modernize and simplify the student registration and admin approval process for after-school gaming clubs.

---

## 🎯 Project Purpose

- Replace / improve the existing registration workflow
- Provide a clear, step-by-step registration form for parents
- Enable admins to review, accept, waitlist, or cancel registrations
- Support multilingual usage (FI / EN)
- Create a scalable base for future automation and dashboards

---

## 🧩 Features

### Parent / Student Side
- Landing page with School of Gaming branding
- Multi-step registration form
  - Activity selection
  - Parent & child information
  - Additional details
  - Summary & confirmation
- Language toggle (FI / EN)

### Admin Side
- Admin dashboard (protected via URL query)
- View all registrations
- Accept / waitlist / cancel registrations
- Capacity-aware acceptance logic

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Custom CSS (SoG theme)
- **Backend / DB:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Admin)
- **Routing:** React Router

---

## 🚀 Running the Project Locally

### 1. Clone the repository and run by following the steps
```bash
git clone https://github.com/Krishna7770/Registration_Form_System-SOG_Internship.git

cd Registration_Form_System-SOG_Internship

2. Install dependencies
npm install

3. Create environment variables
Create a .env file in the project root:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Start development server
npm run dev


5. The app will be available at:
http://localhost:5173
