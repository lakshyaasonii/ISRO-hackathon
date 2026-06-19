# 🌍 Automated Satellite Image Urban Heat Island (UHI) Analytics Dashboard by team 🚀COSMIC CLIMATE CREW🚀

An end-to-end full-stack web application designed to analyze urban satellite imagery, calculate land cover estimations, and map thermal heat signatures to mitigate **Urban Heat Islands (UHI)**. Built as a lightweight, lightning-fast microservices system that works seamlessly across desktops and mobile layouts.

Live Deployment Frontend: [https://isro-hackathon-iota.vercel.app/]  
Live Deployment Backend API: [https://isro-hackathon-6h7q.onrender.com]

---

## 🚀 Key Features

- **Pixel-Level Land Cover Analysis:** Scans satellite imagery to dynamically calculate the percentage of Concrete Area, Green Cover, and Water Bodies.
- **Dynamic Thermal Signature Mapping:** Applies a local color gradient matrix to highlight extreme heat zones (Concrete infrastructure) in red/orange and cool zones in blue.
- **Smart Mitigation Rules Engine:** Automatically suggests localized urban solutions (e.g., Cool Roof installation, green canopy integration) based on calculated area densities.
- **Fully Responsive Matrix Grid:** A fluid, dark-themed interface built to auto-adapt layouts between massive desktop screens and compact mobile devices.

---

## 🛠️ Technology Stack Breakdown

### 💻 Frontend (Client Dashboard)
- **Next.js (React.js):** Production-ready React architecture utilizing App Router routing protocols.
- **TypeScript:** Enforces strict structural type safety across components and network API integration payloads.
- **TailwindCSS:** Modern utility-first CSS framework implemented to create an optimized, mobile-responsive dark theme configuration.

### ⚙️ Backend (Data Processing Core)
- **FastAPI:** High-performance, asynchronous Python web framework optimized for microsecond endpoint routing.
- **Uvicorn:** Asynchronous Server Gateway Interface (ASGI) running the production web application workspace.
- **Pillow (PIL):** Core pixel transformation engine used to decode binary graphics, run color matrix classification, and compile heat map transformations.
- **python-multipart:** Specialized middleware configured to parse heavy binary image multi-part request streams from the frontend interface.
- **HTTPX:** Next-generation asynchronous HTTP client used for handling non-blocking internal URL networking routines.

---

---

# 👥 MEET OUR TEAM

Meet the core developers behind **🚀COSMIC CLIMATE CREW🚀**! Check out our profiles and individual contributions below:

---

# 👤 MEMBER 1: [JATIN JADAUN]

## 🔗 GITHUB PROFILE: [👉 CLICK HERE TO VISIT PROFILE](https://github.com/amssre16256-stack)

* **Core Contributions:**
  * Developed the main full-stack framework using **Next.js** and **FastAPI** architectures.
  * Engineered the pixel-level color segmentation algorithm using **Pillow** to calculate Land Cover logic.
  * Successfully handled the production pipeline and live hosting deployment across **Vercel** and **Render**.

---

# 👤 MEMBER 2: [MOHD KAREEM]

## 🔗 GITHUB PROFILE: [👉 CLICK HERE TO VISIT PROFILE](https://github.com/GitXKareem)

* **Core Contributions:**
  * Implemented the responsive UI grid system using **TailwindCSS** and strict data typing via **TypeScript**.
  * Designed the thermal pseudo-color gradient matrix using **Pillow** to map extreme heat signatures visually.
  * Integrated asynchronous file upload middleware using **python-multipart** for handling large satellite graphics.

---

# 👤 MEMBER 3: [MANAS MISHRA]

## 🔗 GITHUB PROFILE: [👉 CLICK HERE TO VISIT PROFILE](https://github.com/Manas-123mishra)

* **Core Contributions:**
  * Optimized API JSON payload delivery structures to minimize network latency between frontend and backend.
  * Created data preprocessing protocols for scaling and standardizing multi-spectral satellite imagery assets.
  * Conducted system-wide performance benchmarking and assisted in cross-platform layout optimization for tablet devices.

---

# 👤 MEMBER 4: [LAKSHYA SONI]

## 🔗 GITHUB PROFILE: [👉 CLICK HERE TO VISIT PROFILE](https://github.com/lakshyaasonii)

* **Core Contributions:**
  * Programmed the non-blocking internal URL routing routines and backend HTTP client data flows using **HTTPX**.
  * Configured the static urban planning rules engine to automatically render customized UHI mitigation responses.
  * Conducted satellite tile data structure analysis, documentation protocols, and system integration verification testing.

---

## 📁 Repository Structure

```text
├── frontend/ (Next.js Application)
│   ├── app/
│   │   ├── layout.tsx       # Core root configuration script
│   │   └── page.tsx         # Responsive dashboard grid layout & state bindings
│   ├── public/              # Static public graphic assets
│   ├── package.json         # Frontend script dependencies
│   └── tailwind.config.ts   # Custom dark-theme responsiveness parameters
│
└── backend/ (FastAPI Core Engine)
    ├── main.py              # Main API entry point, endpoints, & Pillow pipeline
    ├── requirements.txt     # Python deployment packages (FastAPI, Pillow, HTTPX)


