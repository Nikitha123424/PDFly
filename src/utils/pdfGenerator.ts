import { jsPDF } from 'jspdf';

export interface PDFSettings {
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

interface PageDimensions {
  width: number;
  height: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}

const PAGE_SIZES: Record<'a4' | 'letter', [number, number]> = {
  a4: [210, 297],
  letter: [215.9, 279.4],
};

const MARGIN_VALUES: Record<'small' | 'normal' | 'large', number> = {
  small: 10,
  normal: 15,
  large: 20,
};

function getPageDimensions(settings: PDFSettings): PageDimensions {
  const [widthMM, heightMM] = PAGE_SIZES[settings.pageSize];
  const marginMM = MARGIN_VALUES[settings.margins];
  
  const actualWidth = settings.orientation === 'portrait' ? widthMM : heightMM;
  const actualHeight = settings.orientation === 'portrait' ? heightMM : widthMM;
  
  return {
    width: actualWidth,
    height: actualHeight,
    marginTop: marginMM + (settings.title ? 10 : 0),
    marginBottom: marginMM + (settings.includePageNumbers ? 8 : 0),
    marginLeft: marginMM,
    marginRight: marginMM,
  };
}

function parseMarkdown(text: string): { type: string; content: string; level?: number }[] {
  const lines = text.split('\n');
  const parsed: { type: string; content: string; level?: number }[] = [];
  
  for (const line of lines) {
    if (!line.trim()) {
      parsed.push({ type: 'paragraph', content: '' });
      continue;
    }
    
    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      parsed.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2],
      });
      continue;
    }
    
    // Bullet points
    if (line.match(/^\s*[-*]\s+/)) {
      const content = line.replace(/^\s*[-*]\s+/, '');
      parsed.push({ type: 'bullet', content });
      continue;
    }
    
    // Numbered lists
    if (line.match(/^\s*\d+\.\s+/)) {
      const content = line.replace(/^\s*\d+\.\s+/, '');
      parsed.push({ type: 'numbered', content });
      continue;
    }
    
    // Regular paragraph
    parsed.push({ type: 'paragraph', content: line });
  }
  
  return parsed;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/~~(.*?)~~/g, '$1');
}

export function generatePDF(content: string, settings: PDFSettings): void {
  try {
    const pageDims = getPageDimensions(settings);
    const doc = new jsPDF({
      orientation: settings.orientation,
      unit: 'mm',
      format: settings.pageSize.toUpperCase(),
    });

    // Set author
    if (settings.author) {
      doc.setProperties({
        author: settings.author,
        title: settings.title || 'Document',
      });
    }

    // Parse markdown content
    const parsedContent = parseMarkdown(content);

    let currentPage = 1;
    let yPosition = pageDims.marginTop;
    const availableWidth = pageDims.width - pageDims.marginLeft - pageDims.marginRight;

    // Add title
    if (settings.title) {
      doc.setFont(settings.fontFamily, 'bold');
      doc.setFontSize(24);
      const titleLines = doc.splitTextToSize(settings.title, availableWidth);
      
      titleLines.forEach((line: string) => {
        if (yPosition + 10 > pageDims.height - pageDims.marginBottom) {
          doc.addPage();
          yPosition = pageDims.marginTop;
          currentPage++;
        }
        doc.text(line, pageDims.marginLeft + availableWidth / 2, yPosition, { align: 'center' });
        yPosition += 8;
      });
      
      yPosition += 5;
    }

    // Add date if included
    if (settings.title) {
      doc.setFont(settings.fontFamily, 'normal');
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      const dateStr = new Date().toLocaleDateString();
      doc.text(dateStr, pageDims.marginLeft + availableWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;
      doc.setTextColor(0, 0, 0);
    }

    yPosition += 5;

    // Add content
    doc.setFont(settings.fontFamily, 'normal');
    doc.setFontSize(settings.fontSize);

    const lineHeightMM = (settings.fontSize * settings.lineSpacing) / 2.834; // Convert points to mm

    for (const item of parsedContent) {
      if (yPosition + lineHeightMM > pageDims.height - pageDims.marginBottom) {
        // Add page number if enabled
        if (settings.includePageNumbers) {
          doc.setFont(settings.fontFamily, 'normal');
          doc.setFontSize(9);
          doc.text(
            `${currentPage}`,
            pageDims.width / 2,
            pageDims.height - 8,
            { align: 'center' }
          );
        }

        // Add footer if provided
        if (settings.footerText) {
          doc.setFont(settings.fontFamily, 'normal');
          doc.setFontSize(8);
          doc.setTextColor(120, 120, 120);
          doc.text(
            settings.footerText,
            pageDims.marginLeft,
            pageDims.height - 10
          );
          doc.setTextColor(0, 0, 0);
        }

        doc.addPage();
        yPosition = pageDims.marginTop;
        currentPage++;
      }

      if (item.type === 'heading') {
        const level = item.level || 1;
        const fontSizes: Record<number, number> = {
          1: settings.fontSize + 8,
          2: settings.fontSize + 6,
          3: settings.fontSize + 4,
          4: settings.fontSize + 2,
          5: settings.fontSize,
          6: settings.fontSize - 2,
        };

        doc.setFont(settings.fontFamily, 'bold');
        doc.setFontSize(fontSizes[level]);
        const headingLines = doc.splitTextToSize(item.content, availableWidth);
        
        headingLines.forEach((line: string) => {
          if (yPosition + lineHeightMM > pageDims.height - pageDims.marginBottom) {
            if (settings.includePageNumbers) {
              doc.setFont(settings.fontFamily, 'normal');
              doc.setFontSize(9);
              doc.text(`${currentPage}`, pageDims.width / 2, pageDims.height - 8, { align: 'center' });
            }
            if (settings.footerText) {
              doc.setFont(settings.fontFamily, 'normal');
              doc.setFontSize(8);
              doc.setTextColor(120, 120, 120);
              doc.text(settings.footerText, pageDims.marginLeft, pageDims.height - 10);
              doc.setTextColor(0, 0, 0);
            }
            doc.addPage();
            yPosition = pageDims.marginTop;
            currentPage++;
            doc.setFont(settings.fontFamily, 'bold');
            doc.setFontSize(fontSizes[level]);
          }
          
          doc.text(line, pageDims.marginLeft, yPosition, { align: 'left' });
          yPosition += lineHeightMM;
        });

        yPosition += 3;
      } else if (item.type === 'bullet' || item.type === 'numbered') {
        doc.setFont(settings.fontFamily, 'normal');
        doc.setFontSize(settings.fontSize);
        
        const prefix = item.type === 'bullet' ? '• ' : '1. ';
        const bulletLines = doc.splitTextToSize(prefix + item.content, availableWidth - 5);
        
        bulletLines.forEach((line: string, idx: number) => {
          if (yPosition + lineHeightMM > pageDims.height - pageDims.marginBottom) {
            if (settings.includePageNumbers) {
              doc.setFont(settings.fontFamily, 'normal');
              doc.setFontSize(9);
              doc.text(`${currentPage}`, pageDims.width / 2, pageDims.height - 8, { align: 'center' });
            }
            if (settings.footerText) {
              doc.setFont(settings.fontFamily, 'normal');
              doc.setFontSize(8);
              doc.setTextColor(120, 120, 120);
              doc.text(settings.footerText, pageDims.marginLeft, pageDims.height - 10);
              doc.setTextColor(0, 0, 0);
            }
            doc.addPage();
            yPosition = pageDims.marginTop;
            currentPage++;
            doc.setFont(settings.fontFamily, 'normal');
            doc.setFontSize(settings.fontSize);
          }
          
          const xOffset = idx === 0 ? pageDims.marginLeft : pageDims.marginLeft + 5;
          doc.text(line, xOffset, yPosition, { align: 'left' });
          yPosition += lineHeightMM;
        });
      } else if (item.type === 'paragraph' && item.content.trim()) {
        doc.setFont(settings.fontFamily, 'normal');
        doc.setFontSize(settings.fontSize);
        doc.setTextColor(0, 0, 0);
        
        const lines = doc.splitTextToSize(item.content, availableWidth);
        
        lines.forEach((line: string) => {
          if (yPosition + lineHeightMM > pageDims.height - pageDims.marginBottom) {
            if (settings.includePageNumbers) {
              doc.setFont(settings.fontFamily, 'normal');
              doc.setFontSize(9);
              doc.text(`${currentPage}`, pageDims.width / 2, pageDims.height - 8, { align: 'center' });
            }
            if (settings.footerText) {
              doc.setFont(settings.fontFamily, 'normal');
              doc.setFontSize(8);
              doc.setTextColor(120, 120, 120);
              doc.text(settings.footerText, pageDims.marginLeft, pageDims.height - 10);
              doc.setTextColor(0, 0, 0);
            }
            doc.addPage();
            yPosition = pageDims.marginTop;
            currentPage++;
            doc.setFont(settings.fontFamily, 'normal');
            doc.setFontSize(settings.fontSize);
            doc.setTextColor(0, 0, 0);
          }
          
          let align: 'left' | 'center' | 'right' | 'justify' = 'left';
          if (settings.textAlign === 'center') align = 'center';
          else if (settings.textAlign === 'right') align = 'right';
          else if (settings.textAlign === 'justify') align = 'justify';
          
          doc.text(line, pageDims.marginLeft + (align === 'center' ? availableWidth / 2 : 0), yPosition, { align });
          yPosition += lineHeightMM;
        });
      } else if (item.type === 'paragraph' && !item.content.trim()) {
        yPosition += lineHeightMM * 0.5;
      }
    }

    // Add final page number and footer
    if (settings.includePageNumbers) {
      doc.setFont(settings.fontFamily, 'normal');
      doc.setFontSize(9);
      doc.text(`${currentPage}`, pageDims.width / 2, pageDims.height - 8, { align: 'center' });
    }

    if (settings.footerText) {
      doc.setFont(settings.fontFamily, 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(settings.footerText, pageDims.marginLeft, pageDims.height - 10);
    }

    // Save PDF
    const filename = settings.title 
      ? `${settings.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`
      : 'pdfly-document.pdf';
    
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export { stripMarkdown };
