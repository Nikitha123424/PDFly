# Quick Start Guide - PDFly

Get PDFly up and running in minutes!

## 1. Install Node.js

If you haven't already, download and install **Node.js** (v16 or higher) from [nodejs.org](https://nodejs.org)

## 2. Install Dependencies

Open a terminal in the PDFly project folder and run:

```bash
npm install
```

This installs all required packages (React, Vite, Tailwind CSS, jsPDF, etc.)

## 3. Start Development Server

```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:5173`

## 4. Try These Features

### Basic Usage
1. Click "Create PDF"
2. Type or paste your content in the editor
3. Adjust settings on the left
4. Watch the preview update in real-time
5. Click "Generate PDF" to download

### Upload a File
1. Click the upload area
2. Select a `.txt` or `.md` file
3. Content automatically loads
4. Generate your PDF

### Customize Your Document
- Change page size (A4/Letter)
- Set orientation (Portrait/Landscape)
- Adjust margins and spacing
- Change fonts and sizes
- Add title, author, footer
- Toggle page numbers

### Dark Mode
- Click the moon/sun icon in top right
- Your preference is saved automatically

## 5. Build for Production

```bash
npm run build
```

Creates optimized files in the `dist/` folder

## 6. Deploy to Vercel (Free!)

### Option A: Command Line
```bash
npm install -g vercel
vercel
```

### Option B: Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your repository
3. Click Deploy
4. That's it! 🚀

## File Structure

```
PDFly/
├── src/
│   ├── components/        # UI components
│   ├── utils/            # Helper functions
│   ├── App.tsx           # Main app
│   └── index.css         # Styles
├── index.html            # HTML file
├── package.json          # Dependencies
├── vite.config.ts        # Build config
├── tailwind.config.js    # Style config
└── README.md             # Full documentation
```

## Troubleshooting

### "npm: command not found"
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart your terminal after installation

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### PDF not downloading
- Check browser console (F12) for errors
- Try a different browser
- Verify firewall settings

### Styles not showing
- Restart dev server
- Clear browser cache (Ctrl+Shift+Delete)
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Next Steps

1. **Customize Colors**: Edit `tailwind.config.js`
2. **Add Features**: Create new components in `src/components/`
3. **Deploy**: Follow deployment section in README.md
4. **Share**: Deploy to Vercel and share the link!

## Learn More

- **README.md** - Full feature documentation
- **DEVELOPMENT.md** - Architecture and development guide
- **src/components/EditorPage.tsx** - Main editor logic
- **src/utils/pdfGenerator.ts** - PDF generation engine

## Support

If you get stuck:
1. Check the README.md
2. Review browser console errors
3. Check Node.js is installed correctly
4. Ensure all files are in the correct location

## Common Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code (optional)
npm run format

# Lint code (optional)
npm run lint
```

## That's It! 🎉

You now have a fully functional, professional text-to-PDF generator.

Enjoy using PDFly!

---

**Need Help?** Check README.md or DEVELOPMENT.md for more detailed information.
