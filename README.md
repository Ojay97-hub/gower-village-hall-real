# Penmaen and Nicholaston Village Hall

![Gower Village Hall Home Page](./src/assets/README-screenshot.png)

This is the public-facing website and administrative portal for **Penmaen and Nicholaston Village Hall**, located on the beautiful Gower Peninsula (serving Tor Bay and 3 Cliffs). It acts as a community hub providing information about local events, hall bookings, churches, local businesses, and community news.

## 🎯 Who is this for?
- **Local Residents & Visitors**: A central place to find out about coffee mornings, art classes, choir rehearsals, and other community events.
- **Village Hall Committee**: An easy-to-use platform to manage hall bookings, publish news articles, and keep the community informed.

## ✨ Current Features
- **Responsive Landing Pages**: Beautifully designed, mobile-friendly pages for the hall, local churches, committee, and local businesses.
- **Dynamic News & Blog**: A fully integrated news feed that pulls live articles from the database.
- **Admin Authentication**: Secure login system with a clean UI.
- **Blog Content Management System (CMS)**: Authenticated administrators can create, edit, publish, and delete rich-text news articles directly from the website.
- **Master Admin User Management**: A dedicated "Manage Users" dashboard allowing the Master Admin to invite new administrators and revoke access securely.
- **Form Integration**: Contact and booking forms integrated with Web3Forms.

## 🛠️ Technologies Used
- **Frontend Framework**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for structured utility-first styling.
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) 
  - **Auth**: Email & Password authentication with Master Admin Invite system.
  - **PostgreSQL Database**: Core database storing blog posts and administrator allowlists.
  - **Row Level Security (RLS)**: Securing data mutations and reads at the database level.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [Web3Forms](https://web3forms.com/) handling form submissions securely without a custom backend.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and a package manager (like `npm` or `yarn`) installed.

### Installation
1. Install the dependencies:
   ```bash
   npm install
   ```
2. Set up the environment variables. The `.env` file should have the following defined:
   ```env
   VITE_SUPABASE_URL="..."
   VITE_SUPABASE_ANON_KEY="..."
   VITE_SUPABASE_SERVICE_ROLE_KEY="..." 
   VITE_WEB3FORMS_KEY="..."
   VITE_MASTER_ADMIN_EMAILS="owenjames97@outlook.com"
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🎨 Original Design
The original design concepts for the project can be found on [Figma](https://www.figma.com/design/nFqAeB7GiD6K3kmQlD6KMj/gower-village-hall).
