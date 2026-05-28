
## 📄 File 1: `README.md`

```markdown
# NexusStream v2.5 | Multi-Room Real-Time Dual-Streaming Platform

An enterprise-grade, ultra-low latency real-time streaming application that concurrently pipes synchronized webcam feeds (with hard-burned canvas timestamp HUDs) and screen share tracks over custom WebRTC peer connection corridors.

## 🛠️ Technologies Used

* **Frontend Engine:** React.js, HTML5 Canvas 2D API, Context API
* **Backend Runtime & Signaling:** Node.js, Express, Socket.IO
* **Real-Time Protocols:** WebRTC (RTCPeerConnection API)
* **Design Framework:** Responsive CSS3 Custom Properties (Glassmorphic Dark Theme)
* **State & Logs Persistence:** Web Storage API (localStorage Cluster Tracking)

## 📋 Prerequisites
Before running the application, ensure you have the following installed:
* **Node.js** (v18.x or higher recommended)
* **npm** (v9.x or higher)
* A modern web browser with camera and screen-sharing permissions enabled (Chrome, Edge, or Firefox)


## ⚡ Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone <your-github-repo-link>
cd nexusstream

```

### 2. Spin Up the Backend Server

```bash
cd backend
npm install
npm start

```

*The signaling server will initialize on `http://localhost:3000*`

### 3. Spin Up the Frontend Application

Open a new terminal window, then run:

```bash
cd frontend
npm install
npm start

```

*The React UI will launch instantly on `http://localhost:3001*`

## 🛠️ Testing the Multi-Room Architecture

1. Open **two browser windows side-by-side** (Use an **Incognito window** for the second one to avoid device tracking conflicts).
2. Navigate both windows to `http://localhost:3001`.
3. On **Window A (Client)**: Click **Generate Secure Key**, copy the code, and click **Initialize Broadcast Channel**.
4. On **Window B (Host)**: Paste the generated key and click **Initialize Receiver Monitor**.
5. Click **Connect Hardware Sensors** on the client, select your tracking surface, and hit **Push Live Feeds**.

```
## 🌐 Live Project Links

* 📹 **Video Demonstration: https://drive.google.com/file/d/1oH6V7hc8qFh3pIEBFU_9MOKGf9KC_SuR/view?usp=sharing
* 🚀 **Live Production Deployment:** [Launch the Live App on Vercel/Render](YOUR_DEPLOYED_APP_URL_HERE)






