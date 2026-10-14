# PDFly Development Guide

This guide is for developers who want to contribute to PDFly or understand its architecture.

## Project Architecture

### Directory Structure

```
src/
├── components/          # React components (presentational & container)
├── utils/              # Pure functions and utilities
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

### Component Hierarchy

```
App
├── Navbar
│   └── ThemeToggle
├── HeroPage
├── EditorPage
│   ├── TextEditor
│   ├── FormattingToolbar
│   ├── DocumentSettings
│   ├── PDFPreview
│   │   └── PDFPage (multiple instances)
│   └── ActionButtons
└── AboutPage
```

## Key Technologies

### Frontend Framework
- **React 18**: Component-based UI library
- **React Hooks**: State management (useState, useEffect)

### Build Tool
- **Vite**: Fast module bundler with HMR (Hot Module Replacement)
- **Vite Plugins**: React plugin for JSX transformation

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformations (Autoprefixer, Tailwind)

### PDF Generation
- **jsPDF**: Library for creating PDF documents
- **Custom PDF Logic**: Intelligent text wrapping and page breaking

### Icons
- **Lucide React**: Consistent, beautiful icon library

### Type Safety
- **TypeScript**: Static type checking for JavaScript

## Core Utilities

### `pdfGenerator.ts`
The heart of PDFly. Handles:
- Page layout calculations (page size, orientation, margins)
- Markdown parsing (headings, lists, paragraphs)
- Text wrapping and line breaking
- Multi-page document generation
- PDF export with metadata

Key Functions:
- `generatePDF()` - Main PDF generation function
- `parseMarkdown()` - Parse Markdown syntax
- `getPageDimensions()` - Calculate available space

### `textFormatter.ts`
Text analysis and formatting utilities:
- `getTextStats()` - Count characters, words, paragraphs, lines
- `formatNumber()` - Localized number formatting
- `sanitizeFilename()` - Safe filename generation
- Constants for fonts and line spacing

### `markdownParser.ts`
Optional markdown enhancements:
- `parseMarkdownTable()` - Extract table data
- `extractCodeBlocks()` - Find code blocks
- `stripMarkdownFormatting()` - Remove markdown syntax

## State Management

PDFly uses React's built-in state management:

```typescript
// Editor content
const [content, setContent] = useState('');

// PDF settings
const [settings, setSettings] = useState<PDFSettings>({...});

// UI state
const [isDark, setIsDark] = useState(false);
const [currentPage, setCurrentPage] = useState('home');
```

### Persisting State
- Dark mode preference saved to `localStorage`
- Theme key: `pdfly-theme`

## Styling Strategy

### Tailwind CSS Usage
- Color palette: cream, coral, charcoal + standard colors
- Responsive utilities: `md:`, `lg:` breakpoints
- Dark mode: `isDark` prop + `dark:` prefix utilities

### Dark Mode Implementation
```typescript
{isDark ? 'bg-charcoal-900' : 'bg-cream-50'}
{isDark ? 'dark:bg-charcoal-800' : 'bg-white'}
```

### Custom Colors (tailwind.config.js)
```javascript
colors: {
  cream: { 50: '#fefdf9', 100: '#fffbf0', 200: '#fff8e6' },
  coral: { 500: '#ff6b5b', 600: '#ff5545', 700: '#e6453f' },
  charcoal: { 900: '#1a1a1a', 800: '#2d2d2d' }
}
```

## Adding New Features

### Adding a New Component

1. Create file in `src/components/YourComponent.tsx`
2. Define props interface
3. Implement component with TypeScript
4. Export from `src/components/index.ts`
5. Use in relevant page/parent component

Example:
```typescript
interface YourComponentProps {
  isDark: boolean;
  onAction: () => void;
}

export const YourComponent: React.FC<YourComponentProps> = ({
  isDark,
  onAction,
}) => {
  return (
    <div className={isDark ? 'bg-charcoal-900' : 'bg-white'}>
      {/* Component JSX */}
    </div>
  );
};
```

### Adding a New Utility Function

1. Create or update file in `src/utils/`
2. Export functions
3. Import in components that need them
4. Add TypeScript types for parameters and return values

### Modifying PDF Generation

Edit `src/utils/pdfGenerator.ts`:
- Adjust page calculations in `getPageDimensions()`
- Modify markdown parsing in `parseMarkdown()`
- Add new formatting options to `PDFSettings` interface
- Update `generatePDF()` to handle new features

## Development Workflow

### Install Dependencies
```bash
npm install
```

### Start Dev Server
```bash
npm run dev
```
- Opens at http://localhost:5173
- Hot Module Replacement enabled
- Changes reflect instantly

### Build for Production
```bash
npm run build
```
- Creates optimized `dist/` directory
- Minified code and CSS
- Ready for deployment

### Preview Production Build
```bash
npm run preview
```
- Serves the `dist/` directory locally
- Test production bundle before deploying

### Linting (Optional)
```bash
npm run lint
```
- Checks code quality
- Reports TypeScript errors

## Testing Checklist

Before considering a feature complete:

### Content Testing
- [ ] Empty content error handling
- [ ] Short single line text
- [ ] Multiple paragraphs
- [ ] Very long text (1000+ words)
- [ ] Special characters and Unicode

### Formatting Testing
- [ ] Headings (h1-h6)
- [ ] Bold, italic, underline
- [ ] Bullet lists
- [ ] Numbered lists
- [ ] Code blocks
- [ ] Different font families
- [ ] Font size range (8-24pt)
- [ ] Line spacing variations

### Layout Testing
- [ ] Page size A4 ✓
- [ ] Page size Letter ✓
- [ ] Orientation Portrait ✓
- [ ] Orientation Landscape ✓
- [ ] Margins Small/Normal/Large ✓
- [ ] Text alignment options ✓
- [ ] Multi-page documents ✓

### Settings Testing
- [ ] Title embedding
- [ ] Author metadata
- [ ] Footer text
- [ ] Page numbers
- [ ] Date inclusion
- [ ] Filename sanitization

### File Upload Testing
- [ ] .txt file import
- [ ] .md file import
- [ ] Invalid file rejection
- [ ] Large file handling

### Responsive Design Testing
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)
- [ ] Touch interactions

### Theme Testing
- [ ] Light mode rendering
- [ ] Dark mode rendering
- [ ] Theme persistence
- [ ] Theme toggle functionality

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Performance Testing
- [ ] Generation speed (< 1s target)
- [ ] Memory usage with large documents
- [ ] Bundle size
- [ ] Load time

## Debugging

### Browser DevTools
1. Press F12 to open DevTools
2. Console: Check for JavaScript errors
3. Network: Verify PDF download
4. React Dev Tools: Inspect component state

### Common Issues

**PDF Not Downloading**
- Check browser console for errors
- Verify PDF generation function completed
- Check browser download settings

**Styles Not Applying**
- Ensure Tailwind classes are spelled correctly
- Check dark mode class presence
- Verify tailwind.config.js includes component paths

**Content Not Rendering**
- Check if content state is updating
- Verify textarea onChange handler
- Check for script errors in console

## Performance Optimization Tips

1. **Lazy Load Components**: Use React.lazy() for pages
2. **Memoize Components**: Use React.memo() for expensive renders
3. **Optimize Re-renders**: Use useCallback() for event handlers
4. **Code Splitting**: Separate utilities into different files
5. **Image Optimization**: Use responsive images if needed

## Browser Support

- Chrome/Chromium: ✅ All features
- Firefox: ✅ All features
- Safari: ✅ All features
- Edge: ✅ All features
- IE 11: ❌ Not supported

Required browser features:
- ES6+ support
- FileReader API
- Blob API
- LocalStorage API
- CSS Grid and Flexbox

## Deployment Considerations

### Vercel Deployment
- No build steps needed (handled automatically)
- Environment: Node.js 18+
- Build output: `dist/`
- No backend required

### Other Platforms
PDFly can deploy to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting

### Optimization for Deployment
1. Source maps disabled in production
2. CSS minification
3. JavaScript minification
4. Tree-shaking of unused code

## Future Enhancements

### Planned Features
- [ ] Table support in Markdown
- [ ] Image embedding
- [ ] Custom CSS themes
- [ ] Template library
- [ ] Export to DOCX
- [ ] Collaborative editing
- [ ] Version history

### Architecture Improvements
- [ ] Global state management (Context API or Zustand)
- [ ] Component storybook
- [ ] E2E testing suite
- [ ] Unit tests
- [ ] Performance monitoring

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
6. Follow code style conventions

### Code Style
- Use TypeScript for type safety
- Follow Prettier formatting (run: `npm run format`)
- Name components with PascalCase
- Name utilities with camelCase
- Use descriptive variable names
- Comment complex logic

### Commit Messages
```
feat: Add new feature
fix: Fix bug or issue
docs: Update documentation
style: Format code
refactor: Restructure code
test: Add tests
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [Lucide React Icons](https://lucide.dev)

## Support

For questions or issues:
1. Check existing issues
2. Review this documentation
3. Create a detailed issue report
4. Submit discussions or questions

---

**Last Updated**: 2024  
**Version**: 1.0.0
