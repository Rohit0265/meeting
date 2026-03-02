# 🎥 Zoom Clone – Real-Time Video Meeting Platform

🔗 **Live App:** [https://meeting-two-lac.vercel.app/](https://meeting-two-lac.vercel.app/)
📦 **GitHub Repository:** [https://github.com/Rohit0265/meeting](https://github.com/Rohit0265/meeting)

A full-stack **Zoom Clone** built using **Next.js (App Router)**, **Clerk Authentication**, and **Stream Video API**.
This application allows authenticated users to create, join, and manage secure real-time video meetings.

---

# 📌 Project Overview

This project replicates core Zoom functionality using modern web technologies.
It focuses on:

* Secure authentication
* Real-time video communication
* Scalable backend token generation
* Clean and responsive UI
* Protected routing

The application demonstrates integration between authentication systems and real-time communication infrastructure.

---

# 🚀 Core Features

## 🔐 Authentication (Clerk)

* Secure sign up & login
* Protected routes
* Server-side user verification
* JWT-based session handling

## 🎥 Video Meeting System (Stream API)

* Create instant meetings
* Join meetings via link
* Real-time video & audio streaming
* Call state management
* Multiple participants
* Screen sharing support

## 🏠 Personal Meeting Room

* Unique meeting per user
* Reusable personal room link

## 🧠 Smart Backend Integration

* Stream token generated securely server-side
* Authenticated user validation before call access

## 🎨 UI/UX

* Responsive design
* Clean modern interface
* Tailwind CSS styling
* Lucide icons
* Loading states & proper feedback

---

# 🛠️ Tech Stack

| Layer                | Technology           |
| -------------------- | -------------------- |
| Framework            | Next.js (App Router) |
| Language             | TypeScript           |
| Authentication       | Clerk                |
| Video Infrastructure | Stream Video API     |
| Styling              | Tailwind CSS         |
| Icons                | Lucide React         |
| Deployment           | Vercel               |
| State Management     | React Hooks          |

---

# 🏗️ System Architecture

### Authentication Flow

1. User logs in via Clerk
2. Clerk validates identity
3. Backend verifies user session
4. Server generates Stream token
5. Token used to initialize video call

---

### Meeting Flow

1. User clicks "Create Meeting"
2. Unique meeting ID is generated
3. Stream initializes call session
4. Other users join via meeting link
5. Stream handles:

   * Media streaming
   * Participant state
   * Call lifecycle

---

# 📂 Project Structure

```
/app                → Next.js App Router pages
/components         → Reusable UI components
/hooks              → Custom hooks (e.g., useGetCallById)
/providers          → Context providers
/actions            → Server actions (tokenProvider)
/lib                → Utility functions
/public             → Static assets
```

---

# ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stream Video
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```

⚠️ Never commit `.env.local` to GitHub.
⚠️ Keep secret keys private.

---

# 🧑‍💻 Local Development Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rohit0265/meeting.git
cd meeting
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Start Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 🏗️ Production Build

```bash
npm run build
npm start
```

---

# 🔐 Security Considerations

* Stream secret key is never exposed to client
* Token generation happens server-side
* Routes protected via Clerk middleware
* Auth required before meeting access

---

# 🚀 Deployment

This project is deployed using **Vercel**.

### Steps to Deploy:

1. Push code to GitHub
2. Import project into Vercel
3. Add environment variables
4. Deploy

Automatic deployments occur on each push to main branch.

---

# 📈 Possible Future Improvements

* 🎙 Meeting Recording
* 💬 In-call Chat
* 🗓 Calendar Integration
* 🛑 Waiting Room Feature
* 👑 Host Controls (mute all, remove user)
* 📊 Meeting Analytics Dashboard
* 🔒 Role-Based Access Control
* 📝 Meeting History

---

# 🎯 Learning Outcomes

Through this project, you demonstrate:

* Third-party API integration
* Secure token-based architecture
* Real-time communication systems
* Full-stack Next.js development
* Authentication & authorization handling
* Scalable deployment practices

---

# 📄 License

MIT License © Rohit Mathur

---

# 🙌 Acknowledgements

* Clerk – Authentication infrastructure
* Stream – Real-time video SDK
* Next.js Team – React Framework
* Vercel – Deployment platform

---
