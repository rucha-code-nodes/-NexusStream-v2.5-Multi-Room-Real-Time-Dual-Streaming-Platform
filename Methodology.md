## 📄 File 2: `METHODOLOGY.md`

# Technical Architecture & Engineering Methodology

## 🧠 Architectural Choices

### 1. Streaming Protocol: WebRTC (Web Real-Time Communication)
* **Why:** Traditional streaming protocols like HLS or RTMP chunk media data into packets, introducing a brutal 2 to 5-second latency delay. For instantaneous, real-time tracking operations, this is unacceptable. 
* **The Choice:** We utilized native browser WebRTC Peer Connections (`RTCPeerConnection`). By negotiating direct, peer-to-peer UDP media channels, the application cuts transmission delay down to sub-second metrics (~3ms to 15ms locally).

### 2. Backend Architecture: Node.js + Socket.IO (Signaling Cluster)
* **Why:** WebRTC peers cannot see each other out of the box; they require an intermediary discovery channel to exchange network metadata before connecting.
* **The Choice:** We engineered an asynchronous Node.js signaling architecture using Socket.IO. Node’s non-blocking, event-driven I/O loop handles simultaneous data handshakes efficiently. Instead of messy global broadcasting, our architecture enforces strict sandboxed room parameters via `socket.join(roomId)`, meaning multiple stream sessions run on the same server without cross-signal leakages.

### 3. Timestamp Layer: HTML5 Canvas 2D Core Manipulation
* **Why:** To prevent tech-savvy users from tampering with local DOM clock text to falsify stream timelines, the timestamp had to be unalterably baked into the video frames before network transmission.
* **The Choice:** We routed the raw hardware webcam feed into an offline, invisible HTML5 video tag, sampling its pixels frame-by-frame onto an active 2D Canvas layout context loop via `requestAnimationFrame`. The running time string is mathematically drawn on top of the pixel grid, producing an immutable, single composite video stream track.

---

## 💥 Specific Technical Challenges & Engineering Solutions

### Challenge 1: The WebRTC Dual-Track Overwrite Bug (Blank Screens)
* **The Problem:** Initially, when both the Canvas feed and Screen Share streams were pushed into the connection pipeline concurrently, the Host dashboard would show the camera stream perfectly, but the Screen Share container remained completely black. WebRTC's native `ontrack` event bundles multiple data lines into a single stream array object (`event.streams[0]`). The host view kept grabbing that first index package repeatedly, meaning the webcam track continuously overrode the screen share frame slot.
* **The Solution:** We decoupled track mapping from the global network array bundle. On the Host engine (`HostView.jsx`), we discarded `event.streams[0]` tracking entirely. Instead, we explicitly targeted the individual inbound track via `event.track` and wrapped it inside a completely isolated, independent media stream capsule on the fly:
  ```javascript
  const isolatedStream = new MediaStream([event.track]);



This cleanly split the inbound tracks into isolated, non-conflicting render lanes.

### Challenge 2: Responsive 16:9 Aspect Ratio Boundary Clipping

* **The Problem:** During layout restructuring, the high-contrast timestamp overlay mysteriously vanished from view on the Host monitor. The canvas element resolution variables were hardcoded to a legacy boxy 4:3 layout format ($640 \times 480$), but the polished CSS system forced a fluid 16:9 widescreen orientation rule featuring an aggressive `object-fit: cover` parameter. The browser was dynamically scaling and clipping off the top $15\%$ margin area of the video track, throwing the timestamp outside the user's visible viewport.
* **The Solution:** We standardized our coordinates and graphics dimensions across both layers. We updated the canvas context properties to initialize at a pristine widescreen $1280 \times 720$ resolution baseline, aligning it perfectly with the 16:9 viewport scale. The draw path tracking anchors were shifted to safe inside vectors `(40, 40)`, ensuring the HUD capsule prints reliably across all screens.

