#  JobHunt

JobHunt is a modern, responsive job listing web application built using React.js and Tailwind CSS. It allows users to browse job openings by category, location, and other filters

🚀 [Live Demo](https://smarttodo-app.netlify.app/home)

---


## ⚙️ Features

- 🔍 Filter jobs by role,location,company type,industry, salary, experience, date posted and job type
- 💼 View detailed job descriptions
- 📱 Responsive layout optimized for mobile and desktop
- 💡 Modern UI with ShadCN components and hover effects
- 🎠 Carousel for testimonials or company highlights
- 📦 Skeleton loader for improved UX on slower networks
- 🕵️‍♀️ Follows accessibility best practices with aria-labels and semantic tags
- 🧭 Clear call-to-action buttons for job applications
- 🌙 Dark mode compatible 
- ⚡ Fast and performant with lazy loading
- 🔁 Reusable & Modular Code Structure



---

## 🛠️ Tech Stack

- **Frontend:** React (with Vite) + TypeScript
- **Styling:** Tailwind CSS + ShadCN UI
- **Icons:** Lucide React
- **Deployment:** Netlify

---

## 📁 Project Structure

/src
│
├── assets/               # Static assets like images and logos
│   ├── images/
│   └── logos/
│
├── components/           # Reusable UI components
│   └── [ComponentName]/
│       ├── index.tsx
│       └── constants.ts  # Optional, only if needed for that component
│
├── data/                 # Static or mock data
│   ├── jobDetails.json
│   └── jobList.json
│
├── hooks/                # Custom React hooks
│
├── pages/                # Page-level components
│
├── App.tsx               # Root component
└── main.tsx              # Entry point



---

## 🚀 Getting Started Locally

### 1. Clone the Repo


git clone [https://github.com/suryaspandey/smart-todo-app.git](https://github.com/suryaspandey/Smart-Todo-List-App)

cd smart-todo-app


### 2. Install Dependencies
npm install


### 3. Run the App

npm run dev

### 4. Build for Production

npm run build

