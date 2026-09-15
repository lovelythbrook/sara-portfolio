import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const portfolioDir = path.join(rootDir, 'public', 'portfolio');
const dataFilePath = path.join(rootDir, 'src', 'data', 'projects.json');

// Ensure portfolio uploads folder exists
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, portfolioDir);
  },
  filename: (req, file, cb) => {
    // Generate clean slug-based filename with timestamp
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const base = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 40);
    const uniqueSuffix = Date.now();
    cb(null, `${base}_${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB limit for high-res art
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|avif|gif|svg/;
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (allowed.test(ext) || allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP, SVG, AVIF) are supported.'));
    }
  },
});

// GET health & server status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    server: 'Sara Studio Manager',
    uploadDirectory: portfolioDir,
    timestamp: new Date().toISOString(),
  });
});

// GET all projects
app.get('/api/projects', (req, res) => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return res.json([]);
    }
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read projects: ' + err.message });
  }
});

// POST upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file was provided' });
  }

  const relativePath = `portfolio/${req.file.filename}`;
  res.json({
    success: true,
    url: relativePath,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
    message: 'Artwork uploaded successfully to local portfolio assets'
  });
});

// POST save / add project
app.post('/api/projects', (req, res) => {
  try {
    const newProject = req.body;
    if (!newProject || !newProject.title) {
      return res.status(400).json({ error: 'Project title is required' });
    }

    let projects = [];
    if (fs.existsSync(dataFilePath)) {
      projects = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    }

    // Check if updating existing or adding new
    const existingIndex = projects.findIndex(p => p.id === newProject.id);
    if (existingIndex >= 0) {
      projects[existingIndex] = { ...projects[existingIndex], ...newProject };
    } else {
      newProject.id = newProject.id || `proj-${Date.now()}`;
      projects.unshift(newProject);
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf-8');
    res.json({
      success: true,
      project: newProject,
      totalCount: projects.length,
      message: 'Project saved directly to repository data.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save project: ' + err.message });
  }
});

// DELETE project
app.delete('/api/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    let projects = [];
    if (fs.existsSync(dataFilePath)) {
      projects = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    }

    const filtered = projects.filter(p => p.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2), 'utf-8');
    res.json({ success: true, message: 'Project removed successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project: ' + err.message });
  }
});

// POST git sync / publish helper
app.post('/api/publish', (req, res) => {
  const commitMsg = req.body.message || `Portfolio update: ${new Date().toLocaleDateString()}`;
  exec(`git add public/portfolio src/data/projects.json && git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: rootDir }, (err, stdout, stderr) => {
    if (err) {
      return res.json({
        success: false,
        warning: 'Git commit warning or no changes to commit: ' + (stderr || err.message),
        stdout
      });
    }
    res.json({
      success: true,
      message: 'Committed changes to Git repository. Push to remote or run `npm run deploy` to publish to GitHub Pages.',
      stdout
    });
  });
});

app.listen(PORT, () => {
  console.log(`✨ Sara Portfolio Studio Server running at http://localhost:${PORT}`);
  console.log(`📁 Upload destination: ${portfolioDir}`);
  console.log(`📝 Projects data: ${dataFilePath}`);
});
