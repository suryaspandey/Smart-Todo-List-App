#  Smart Todo App

A beautifully designed, responsive, and accessible **Task Manager** built with **React.js**, **TypeScript**, and **Supabase** as the backend.

🚀 [Live Demo](https://smarttodo-app.netlify.app/home)

---


## ⚙️ Features

- ✅ **Add, Edit, Delete Tasks**
- 🔍 **Search & Filter Tasks** by status or keywords
- 📊 **Summary Dashboard** with Overview / To-Do / Completed / Failed breakdown
- 🌓 **Light/Dark Mode** with clean UI
- ♿ **Accessible components** with keyboard support and ARIA labels
- 💬 **Confirmation dialog** before task deletion
- 📱 **Responsive UI** for desktop & mobile
- 🎨 **Animations with Framer Motion**
- 🔁 **Auto Refresh** every 30 seconds to fetch latest tasks
- 🔐 **Environment Config** with Supabase credentials
- 📦 Built with **ShadCN UI** and **Lucide Icons**

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS + ShadCN UI
- **Icons:** Lucide React
- **State Management:** Zustand
- **Backend:** Supabase (Database + API)
- **Animations:** Framer Motion
- **Notifications:** Sonner
- **Deployment:** Netlify

---

## 📁 Project Structure
src/

├── components/ // UI components (TaskCard, TaskForm, Dialogs)

├── store/ // Zustand store for task state

├── hooks/ // Custom hooks like useMobile

├── pages/ // Main layout & app screen

├── constants/ // Static content like status icons, colors, etc.


---

## 🚀 Getting Started Locally

### 1. Clone the Repo


git clone [https://github.com/suryaspandey/smart-todo-app.git](https://github.com/suryaspandey/Smart-Todo-List-App)

cd smart-todo-app


### 2. Install Dependencies
npm install

### 3. Set Environment Variables
Create a .env file in the root with the following:

VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_KEY=your_supabase_key

- Add your Supabase environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`) in **Site Settings > Environment Variables** on Netlify.
- To prevent 404 errors on refresh (common in SPAs), create a `_redirects` file inside the `public/` directory:


### 4. Run the App

npm run dev


## 🌐 Deployment

The app is deployed on Netlify

Ensure .env variables are added under Site Settings → Environment Variables

Add a _redirects file in public/ folder to prevent 404 on refresh:

/*    /index.html   200


## 💡 Proposed Innovative Feature: Drag & Drop Task Management

To make the app more interactive and user-friendly, I plan to add drag and drop functionality. This will allow users to:

Move tasks between different sections like "To Do", "Completed", and "Failed"

Reorder tasks within the same section for better prioritization

✨ Why this feature?
- More control: Users can easily organize their tasks visually.

- Better UX: Dragging feels faster and smoother than clicking buttons.

- Familiarity: It mimics tools like Trello or Jira, making it intuitive.

🛠️ How I plan to build it
- I’ll use @dnd-kit/core library for drag and drop.

- Each task card will be draggable.

- Each status column will act as a drop zone.

🔁 On drop:

If moved across sections → update the task’s status.

If reordered within a section → update the task order locally.

- Initially, I’ll use local state to simulate the changes.

- Later, I’ll connect it with Supabase to persist updates.

🔍 Proof of Concept

Here’s how I’ll start:

- Enable dragging and dropping inside the "To Do" section first.

- Use local state (no backend) to manage task reordering.

- Add subtle animations and drop indicators for better UX.

- Once stable, expand to other sections and sync with backend.
