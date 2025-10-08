# Quick Setup Guide - Portfolio Website

This guide will help you quickly add your personal content to the portfolio.

## Step 1: Add Your CV (REQUIRED)

1. Place your CV PDF file here:
   ```
   public/cv/SamirCaizapastoCV.pdf
   ```

2. The download buttons are already configured in:
   - Hero section (top of page)
   - Contact section (bottom of page)

**Important**: The filename must match exactly: `SamirCaizapastoCV.pdf`

## Step 2: Add Project Screenshots (REQUIRED)

Place your project images in `public/images/projects/` with these exact names:

- `esports-dashboard.png` - eSports Analytics Dashboard screenshot
- `rice-system.png` - Rice Crop Management System screenshot
- `pingpong-analysis.png` - Statistical Analysis Ping Pong screenshot
- `powerbi-dashboard.png` - Grocery Sales BI Dashboard screenshot

**Recommended image specs:**
- Format: PNG or JPG
- Dimensions: 1200x900px (4:3 ratio) or 1600x900px (16:9 ratio)
- File size: Keep under 500KB for best performance
- Use tools like TinyPNG or Squoosh to compress images

**Placeholder images**: If you don't have images yet, the site will show a placeholder with "Project Screenshot" text.

## Step 3: Update Your Personal Info (Optional)

### Update Email, LinkedIn, GitHub

Edit `src/components/Hero.tsx` (line 55-67) and `src/components/Contact.tsx` (line 20-40)

```javascript
const socialLinks = [
  {
    icon: <Linkedin size={24} />,
    href: 'https://www.linkedin.com/in/YOUR-USERNAME/',
    label: 'LinkedIn'
  },
  // ... update GitHub and Email
];
```

### Update About Section

Edit `src/components/About.tsx` to modify your bio text.

### Update Meta Tags for SEO

Edit `index.html` (lines 8-24) to update:
- Page title
- Description
- Your name
- Website URL

## Step 4: How to Add or Edit Projects

Edit `src/data/projects.js`:

```javascript
export const projects = [
  {
    id: 1,
    title: "Your Project Name",
    image: "/images/projects/your-image.png",
    tech: ["Technology1", "Technology2", "Technology3"],
    description: "Brief project description here...",
    highlights: [
      "Key achievement 1",
      "Key achievement 2",
      "Key achievement 3"
    ],
    demoUrl: "https://your-demo-link.com",     // Optional
    repoUrl: "https://github.com/your-repo",    // Optional
    analysisUrl: "https://analysis-link.com",   // Optional
    reportUrl: "https://report-link.com",       // Optional
    dashboardUrl: "https://dashboard-link.com"  // Optional
  },
  // Add more projects by copying this structure
];
```

**Tips:**
- Only include the URL fields that exist for your project
- The component will automatically show the correct buttons
- Projects display in a responsive grid (1 column mobile, 2 columns tablet/desktop)

## Step 5: Deploy to Vercel

### Option A: GitHub + Vercel (Recommended - Automatic Updates)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "New Project" → Import your repository

4. Vercel will auto-detect settings from `vercel.json`

5. Click "Deploy"

6. Done! Every future push to GitHub will auto-deploy

### Option B: Vercel CLI (Quick Deploy)

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

### Option C: Manual Drag & Drop

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [vercel.com](https://vercel.com)

3. Drag and drop the `dist` folder

4. Done! (Note: You'll need to manually re-upload for updates)

## Step 6: Customize Colors (Optional)

Edit `tailwind.config.js` to change the color theme:

```javascript
colors: {
  primary: {
    bg: '#0a192f',        // Dark navy background
    light: '#112240',     // Lighter navy
    lighter: '#1d3557',   // Even lighter
  },
  accent: {
    cyan: '#64ffda',      // Bright cyan (primary accent)
    blue: '#00d4ff',      // Bright blue (secondary accent)
    light: '#8af3ff',     // Light cyan
  }
}
```

**Popular color schemes:**
- **Blue Tech**: Keep current colors
- **Green Tech**: cyan: '#00ff88', blue: '#00d4aa'
- **Purple Modern**: cyan: '#bb86fc', blue: '#6200ea'
- **Orange Warm**: cyan: '#ff6b35', blue: '#f7931e'

## Checklist Before Deployment

- [ ] Added CV PDF to `public/cv/`
- [ ] Added all 4 project screenshots to `public/images/projects/`
- [ ] Updated email, LinkedIn, GitHub links
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] Checked responsive design on mobile/tablet/desktop
- [ ] Ready to deploy to Vercel

## Common Issues

### CV download not working
- Check file is at `public/cv/SamirCaizapastoCV.pdf`
- Check filename spelling and capitalization

### Images not showing
- Check files are in `public/images/projects/`
- Check filenames match exactly (case-sensitive)
- Check image file extensions (.png, .jpg)

### Site looks broken
- Run `npm install` to ensure dependencies are installed
- Check browser console for errors (F12)
- Try clearing browser cache

## Testing Locally

Start development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Need Help?

Check the full `README.md` for detailed documentation and troubleshooting.

---

Ready to go live! 🚀
