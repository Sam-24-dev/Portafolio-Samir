# Samir Caizapasto - Professional Portfolio

A modern, responsive portfolio website showcasing data analysis projects, technical skills, and professional experience. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Smooth Animations**: Page transitions, scroll effects, and typing animations
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Performance Optimized**: Lazy loading images, code splitting, and optimized bundle size
- **SEO Ready**: Complete meta tags, Open Graph, and structured data
- **Easy to Update**: Centralized project data and simple content management

## Project Structure

```
portfolio/
├── public/                      # Static assets
│   └── cv/                      # CV PDF files (ADD YOUR CV HERE)
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   └── projects/        # Project screenshots (ADD YOUR IMAGES HERE)
│   │   └── cv/                  # CV files accessible from code
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation with smooth scroll
│   │   ├── Hero.tsx             # Hero section with typing effect
│   │   ├── About.tsx            # About section
│   │   ├── Projects.tsx         # Projects showcase
│   │   ├── Skills.tsx           # Technical skills
│   │   └── Contact.tsx          # Contact form
│   ├── data/
│   │   └── projects.js          # Project data (EDIT TO ADD PROJECTS)
│   ├── App.tsx                  # Main app component
│   ├── index.css                # Global styles & Tailwind
│   └── main.tsx                 # App entry point
├── index.html                   # HTML template with SEO meta tags
├── tailwind.config.js           # Tailwind configuration with custom theme
├── vercel.json                  # Vercel deployment configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Adding Your Content

### 1. Add Your CV

Place your CV PDF file in the `public/cv/` folder with the name:
```
public/cv/SamirCaizapastoCV.pdf
```

The CV download button is configured in two places:
- Hero component (`src/components/Hero.tsx`)
- Contact component (`src/components/Contact.tsx`)

### 2. Add Project Screenshots

Add your project screenshots to `public/images/projects/` with these filenames:
- `esports-dashboard.png`
- `rice-system.png`
- `pingpong-analysis.png`
- `powerbi-dashboard.png`

**Recommended image specifications:**
- Format: PNG or WebP (for better performance)
- Dimensions: 1200x900px or 16:9 aspect ratio
- File size: Under 500KB (optimize for web)

### 3. Update Project Data

Edit `src/data/projects.js` to modify or add projects:

```javascript
export const projects = [
  {
    id: 1,
    title: "Your Project Title",
    image: "/images/projects/your-image.png",
    tech: ["Technology1", "Technology2"],
    description: "Brief description...",
    highlights: ["Achievement 1", "Achievement 2"],
    demoUrl: "https://demo-link.com",
    repoUrl: "https://github.com/your-repo"
  },
  // Add more projects...
];
```

### 4. Update Personal Information

Edit these files to update your personal information:

- **Contact info**: `src/components/Hero.tsx` and `src/components/Contact.tsx`
- **About section**: `src/components/About.tsx`
- **Skills**: `src/components/Skills.tsx`
- **SEO meta tags**: `index.html`

### 5. Customize Theme Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: {
    bg: '#0a192f',      // Main background color
    light: '#112240',   // Light background
  },
  accent: {
    cyan: '#64ffda',    // Primary accent
    blue: '#00d4ff',    // Secondary accent
  }
}
```

## Building for Production

Build the project:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the settings from `vercel.json`
6. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Build your project: `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag and drop the `dist` folder
4. Your site will be deployed instantly

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy every push to the main branch
- Create preview deployments for pull requests
- Provide deployment URLs for testing

## Performance Tips

1. **Optimize Images**: Use WebP format and compress images before uploading
2. **Lazy Loading**: Images automatically lazy load (already implemented)
3. **Code Splitting**: React components are code-split automatically
4. **Lighthouse Score**: Target 90+ on all metrics

## SEO Checklist

- [x] Meta tags configured in `index.html`
- [x] Open Graph tags for social sharing
- [x] Canonical URL set
- [x] Descriptive page title
- [ ] Add `sitemap.xml` (optional)
- [ ] Add `robots.txt` (optional)
- [ ] Add Google Analytics (optional)

## Customization Guide

### Changing Fonts

Edit the Google Fonts import in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
```

Then update `tailwind.config.js`:
```javascript
fontFamily: {
  poppins: ['YourFont', 'sans-serif'],
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/App.tsx`
3. Add navigation link in `src/components/Navbar.tsx`

### Modifying Animations

All animations use Framer Motion. Edit animation settings in component files:
```javascript
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
```

## Troubleshooting

### Images not loading

- Check file paths match exactly (case-sensitive)
- Ensure images are in `public/` directory
- Verify image file extensions

### CV download not working

- Confirm PDF is at `public/cv/SamirCaizapastoCV.pdf`
- Check file name spelling matches exactly

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run lint`
- Clear cache: `rm -rf node_modules dist && npm install`

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Vercel**: Deployment platform

## License

This project is open source and available for personal use.

## Contact

Samir Leonardo Caizapasto Hernández
- Email: samir.leonardo.caizapasto04@gmail.com
- LinkedIn: [samircaizapasto](https://www.linkedin.com/in/samircaizapasto/)
- GitHub: [Sam-24-dev](https://github.com/Sam-24-dev)

---

Built with React + TypeScript + Tailwind CSS
