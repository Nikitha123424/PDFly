# PDFly - Text-to-PDF Generator

Transform your text into professional PDF documents in seconds. A modern, web-based application for converting text content into beautifully formatted PDFs.

**Tagline:** Turn your text into a polished PDF.

## Features

- ✍️ **Easy Text Editor** - Type or paste any content directly into the editor
- 📄 **Professional PDF Generation** - Create real, text-based PDFs (not screenshots)
- 🎨 **Customization** - Control fonts, sizes, margins, alignment, and more
- 📑 **Multi-Page Support** - Automatically handles long documents with proper pagination
- 📤 **File Upload** - Import .txt and .md files directly
- 🌙 **Dark Mode** - Comfortable viewing in any lighting condition
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🔒 **100% Private** - All PDF generation happens in your browser; no server uploads
- 🚀 **Lightning Fast** - Instant PDF creation and download
- ⚡ **Markdown Support** - Recognize and format Markdown syntax
- 📊 **Real-time Preview** - See how your PDF will look before downloading

## Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **jsPDF** - PDF generation library
- **html2canvas** - HTML to canvas conversion (optional)
- **Lucide React** - Beautiful, consistent icons

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. Clone or download the PDFly project
2. Navigate to the project directory:
   ```bash
   cd PDFly
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The application will automatically open in your default browser at `http://localhost:5173`.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The compiled files will be in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
PDFly/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── TextEditor.tsx
│   │   ├── FormattingToolbar.tsx
│   │   ├── DocumentSettings.tsx
│   │   ├── PDFPreview.tsx
│   │   ├── PDFPage.tsx
│   │   ├── ActionButtons.tsx
│   │   ├── HeroPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── EditorPage.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── pdfGenerator.ts  # Core PDF generation logic
│   │   ├── markdownParser.ts # Markdown parsing
│   │   └── textFormatter.ts  # Text formatting utilities
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Usage Guide

### Creating a PDF

1. **Enter Content**: Type or paste your text in the editor
2. **Customize Settings**: 
   - Choose page size (A4 or Letter)
   - Set orientation (Portrait or Landscape)
   - Adjust margins, fonts, and spacing
   - Add title, author, and footer text
3. **Preview**: Check the real-time PDF preview on the right
4. **Generate**: Click "Generate PDF" to create and download your document

### Formatting Options

#### Document Settings
- **Page Size**: A4 (210×297mm) or Letter (215.9×279.4mm)
- **Orientation**: Portrait or Landscape
- **Margins**: Small (10mm), Normal (15mm), or Large (20mm)

#### Typography
- **Font Family**: Helvetica, Times, Courier, Arial, Verdana, Georgia, and more
- **Font Size**: 8pt to 24pt
- **Line Spacing**: 1.0, 1.15, 1.5, or 2.0
- **Text Alignment**: Left, Center, Right, or Justify

#### Document Metadata
- **Title**: Appears at the top of the PDF
- **Author**: Embedded in PDF properties
- **Footer Text**: Displayed at the bottom of each page
- **Page Numbers**: Optional page numbering

### Markdown Support

PDFly recognizes common Markdown syntax:

```markdown
# Main Heading
## Section Heading
### Subsection

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet point
- Another point

1. Numbered item
2. Another item
```

### Uploading Files

1. Click the upload area or drag and drop
2. Select a `.txt` or `.md` file
3. The content automatically loads into the editor
4. Customize and generate your PDF

## Deployment to Vercel

PDFly is ready to deploy to Vercel with zero configuration!

### Steps

1. **Create a Vercel Account**: Visit [vercel.com](https://vercel.com) and sign up

2. **Connect Your Repository**:
   - Push your PDFly code to GitHub, GitLab, or Bitbucket
   - Or deploy using `vercel` CLI

3. **Deploy via CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```
   Follow the prompts to connect and deploy

4. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - Framework: Select "Vite"
   - Deploy

5. **Custom Domain** (Optional):
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain and DNS configuration

### Environment Variables

No environment variables are required for PDFly. All processing happens client-side.

### Deployment Checklist

- ✅ No backend required
- ✅ No database needed
- ✅ No API keys or secrets
- ✅ All PDF generation is client-side
- ✅ Fully deployable as static site

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features Explained

### Real-Time Preview
The preview updates instantly as you type, showing exactly how your PDF will appear.

### Automatic Page Breaking
PDFly intelligently handles content that spans multiple pages, automatically creating new pages and maintaining proper formatting.

### Markdown Recognition
Simple Markdown syntax is automatically detected and converted to proper document elements:
- Headings are sized appropriately
- Lists are properly formatted
- Text styling is preserved

### Dark Mode
Toggle dark mode for comfortable editing in any environment. The PDF output remains professionally formatted with a white background.

### Responsive Design
- **Desktop**: Two-column layout (editor + preview side-by-side)
- **Tablet**: Responsive two-column layout
- **Mobile**: Stacked single-column layout with toggle for preview

## API Reference

### PDFSettings Interface

```typescript
interface PDFSettings {
  pageSize: 'a4' | 'letter';
  orientation: 'portrait' | 'landscape';
  margins: 'small' | 'normal' | 'large';
  fontFamily: string;
  fontSize: number;
  lineSpacing: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  title?: string;
  author?: string;
  includePageNumbers: boolean;
  footerText?: string;
}
```

### Main Functions

#### `generatePDF(content: string, settings: PDFSettings): void`
Generates and downloads a PDF file based on the content and settings.

## Keyboard Shortcuts

- `Ctrl+B` / `Cmd+B` - Bold
- `Ctrl+I` / `Cmd+I` - Italic
- `Ctrl+U` / `Cmd+U` - Underline
- `Ctrl+S` / `Cmd+S` - Save/Download

## Performance

- Average PDF generation time: < 1 second
- Works with documents up to 10,000+ words
- Optimized for modern browsers
- Minimal dependencies for faster loading

## Troubleshooting

### PDF Download Not Working
- Check your browser's download settings
- Ensure pop-ups are not blocked
- Try a different browser

### Formatting Not Preserved
- Verify the font family is supported by jsPDF
- Check line spacing and margin settings
- Ensure content is properly formatted in the editor

### Page Breaks Not Working Correctly
- Verify margins are set appropriately
- Check if content exceeds page height
- Try adjusting font size or line spacing

## Privacy & Security

- ✅ No data collection
- ✅ No analytics tracking
- ✅ No third-party services
- ✅ All processing is local
- ✅ No server uploads
- ✅ Open-source codebase

## Contributing

Contributions are welcome! Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## License

PDFly is open-source and available for personal and commercial use.

## Support & Feedback

For issues, questions, or suggestions:
- Check existing issues and discussions
- Create a new issue with detailed information
- Share your feedback and feature requests

## Changelog

### Version 1.0.0
- Initial release
- Core PDF generation
- Full customization options
- Dark mode support
- Responsive design
- Markdown support

## FAQ

**Q: Is PDFly free?**
A: Yes, PDFly is completely free and open-source.

**Q: Do you store my documents?**
A: No. All PDF generation happens in your browser. Nothing is uploaded to any server.

**Q: Can I use PDFly offline?**
A: Once loaded, PDFly works offline. You can download the entire application and run it locally.

**Q: What file formats can I import?**
A: Currently supports .txt and .md (Markdown) files.

**Q: Can I export to other formats?**
A: PDFly currently exports to PDF format only. Other formats may be added in future versions.

**Q: How large can documents be?**
A: PDFly can handle documents with 10,000+ words without issues. Larger documents may require more browser memory.

**Q: Which fonts are supported?**
A: Standard PDF fonts like Helvetica, Times, Courier, Arial, Verdana, Georgia, and more.

## Future Roadmap

- [ ] Multiple language support
- [ ] Table support in Markdown
- [ ] Advanced text styling options
- [ ] Template library
- [ ] Export to DOCX format
- [ ] Collaborative editing
- [ ] Cloud storage integration (optional)
- [ ] Mobile native apps

## Made with ❤️

PDFly is created with passion for making document generation simple and accessible to everyone.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Active Development
