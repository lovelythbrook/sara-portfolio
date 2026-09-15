# Sagarika (Sara) — B.Des Portfolio & Studio

An editorial, high-aesthetic design portfolio created for **Sagarika (Sara)**, an aspiring designer applying for **Bachelor of Design (B.Des)** programs. 

Built with **Vite, React, and Vanilla CSS**, optimized for deployment on **GitHub Pages (`github.io`)**, with a zero-database **Local Creator Studio (Option C)** that saves uploaded high-resolution artwork directly to Git.

---

## ✨ Features & Architecture

### 1. Public Portfolio (Evaluation-Ready for B.Des Reviewers)
- **Editorial Design Aesthetic**: Tailored typography (*Syne*, *Plus Jakarta Sans*, *Playfair Display*), warm terracotta & sage accents, glassmorphic surfaces, and seamless dark/light modes.
- **Filterable Showcase Gallery**: Category filtering (*Sketches & Studies, Form & 3D, Product & Concept, Visual Communication*) with live search.
- **Detailed Case Study Modal**:
  - High-resolution artwork inspection with interactive **zoom/pan**.
  - **Resolution Badges**: Automatic recognition of resolution (e.g., `4K Scan`, `4000×3000px`, `Vector 300 DPI`).
  - **Iterative Methodology**: Step-by-step breakdown (Ideation, Prototyping, Refinement) essential for B.Des portfolio evaluation.
  - Physical scale, medium, materials, and creation year.
- **About Sara & Statement of Purpose**:
  - Academic credentials & B.Des aspirations.
  - Professional, AI-enhanced studio portrait of Sara.
  - Design philosophy & manifesto.
  - Future inquiry areas (*Biomimicry, Ergonomics, Cultural Typography, Social Design*).

### 2. Sara's Creator Studio (Option C: Git-Native Zero-Database)
- Access via **"Studio Access"** in the top navigation.
- **Gmail Sign-In**: Enter Gmail to unlock studio controls.
- **Drag & Drop Uploads**: Accepts ultra-high-resolution images (JPG, PNG, WebP, SVG).
- **Auto-Resolution Detection**: Reads native dimensions (`width × height`) and calculates megapixel density automatically.
- **Direct Git Persistence**: Uploads are saved into `public/portfolio/` and project metadata is written to `src/data/projects.json`.
- **Export & Backup**: Includes one-click **"Download projects.json"** for manual backup or Git commits anytime.

---

## 🚀 Getting Started

### 1. Run the Development Server
```bash
# Install dependencies
npm install

# Start the Vite portfolio website
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Run Sara's Local Studio Server (For Live Uploads)
```bash
# In a separate terminal or background:
npm run studio
```
This runs the local upload API on **`http://localhost:3001`**, enabling direct file saving to `public/portfolio/`.

---

## 🌐 Deploying to GitHub Pages (`github.io`)

The project includes an official GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds and deploys the portfolio automatically on every push!

### Step 1: Create a GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: Sara B.Des Portfolio & Creator Studio"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### Step 2: Enable GitHub Pages in GitHub
1. Go to your repository on GitHub.
2. Click **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will trigger automatically, build your Vite app, and deploy it to:
   ```
   https://<YOUR_USERNAME>.github.io/<REPO_NAME>/
   ```

---

## 📁 Project Structure

```
sara-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD
├── public/
│   ├── favicon.svg                # Monogram SVG brand mark
│   └── portfolio/                 # Seeded high-resolution artwork & Sara's portrait
│       ├── portrait_sara.jpg      # AI-cleaned professional studio portrait
│       ├── hands_sketch.jpg       # Observational drawing & anatomy
│       ├── form_sculpture.jpg     # 3D paper pulp pendant study
│       ├── biomimicry_vessel.jpg  # Sustainable ceramic water carafe
│       └── typography_poster.jpg  # Modernist Swiss typography poster
├── server/
│   └── studio-server.js           # Local Node/Express studio upload API
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Frosted header with theme & studio toggle
│   │   ├── Hero.jsx                # Editorial hero section
│   │   ├── Gallery.jsx             # Filterable portfolio gallery
│   │   ├── ProjectCard.jsx         # Card with hover reveal & resolution tag
│   │   ├── ProjectModal.jsx        # Zoomable case study modal & process steps
│   │   ├── AboutSection.jsx        # Academic background, B.Des statement & portrait
│   │   ├── StudioModal.jsx         # Creator studio with Gmail login & dropzone
│   │   └── Footer.jsx              # Brand sign-off & admissions contact
│   ├── data/
│   │   └── projects.json           # Master projects database
│   ├── styles/
│   │   ├── index.css               # Design system, CSS variables & typography
│   │   └── components.css          # Component styles & animations
│   ├── App.jsx                     # Root application
│   ├── main.jsx                    # Vite entry
│   └── vite.config.js              # Relative base path for GitHub Pages
└── package.json
```

---

## 🎨 Design System & Customization
- **Fonts**: Loaded via Google Fonts in `index.html`:
  - Display: `Syne`
  - Body: `Plus Jakarta Sans`
  - Editorial Quotes: `Playfair Display`
- **Colors**: Configurable in `src/styles/index.css` via CSS variables (`--accent-terracotta`, `--bg-primary`, etc.).
