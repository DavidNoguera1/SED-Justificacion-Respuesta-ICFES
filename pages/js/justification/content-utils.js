/*
 * content-utils.js
 * Helpers de contenido, imagenes, texto y datos.
 */

// ============================================================
// DETECTAR TIPO DE CONTENIDO
// ============================================================

function detectContentConfig(q) {
  const hasContextImg = q.context && q.context.includes('<img');
  const hasQuestionImg = q.text && q.text.includes('<img');
  const hasOptionsImg = q.optionsImg && q.optionsImg.length > 0;

  return {
    hasContextImg,
    hasQuestionImg,
    hasOptionsImg,
    contextText: q.context ? q.context.replace(/<[^>]+>/g, '').trim() : '',
    questionText: q.text ? q.text.replace(/<[^>]+>/g, '').trim() : ''
  };
}

// ============================================================
  // EXTRAER IMÁGENES DE HTML
  // ============================================================

  const IMG_BASE_PATH = '../shared/img/questions/';

  function getOptionImgSrc(imgName) {
    if (!imgName) return '';
    if (/^(https?:)?\/\//i.test(imgName) || imgName.startsWith('/') || imgName.startsWith('../')) return imgName;
    if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(imgName)) return IMG_BASE_PATH + imgName;
    return IMG_BASE_PATH + imgName + '.png';
  }

  function convertPlainTableToHtml(text) {
    if (!text || text.includes('<table')) return text;
    
    const tablePattern = /Especie\s*Nombre\s*cient[\wáéíóú]+\s*Ciclo\s*\(\s*d[ií]as\s*\)\s*Número\s*de\s*ciclos\s*al\s*año/i;
    if (!tablePattern.test(text)) return text;
    
    const dataPattern = /(\d+)([A-Z][a-záéíóú]+(?:\s+[a-záéíóú]+)+)\s*(\d+\s*-\s*\d+)\s*(\d+)/g;
    const rows = [];
    let match;
    while ((match = dataPattern.exec(text)) !== null) {
      rows.push([match[1], match[2].trim(), match[3], match[4]]);
    }
    
    if (rows.length < 2) return text;
    
    const headers = ['Especie', 'Nombre científico', 'Ciclo (días)', 'Número de ciclos al año'];
    
    let tableHtml = '<table border="1" style="width:100%; border-collapse:collapse; text-align:center;">';
    tableHtml += '<tr>';
    headers.forEach(h => tableHtml += `<th>${h}</th>`);
    tableHtml += '</tr>';
    
    rows.forEach(row => {
      tableHtml += '<tr>';
      row.forEach(cell => tableHtml += `<td>${cell}</td>`);
      tableHtml += '</tr>';
    });
    tableHtml += '</table>';
    
    const startIdx = text.indexOf('Especie');
    const endMatch = text.match(/Con base en la información anterior/i);
    const endIdx = endMatch ? endMatch.index : text.length;
    
    const tableSection = text.substring(startIdx, endIdx);
    return text.replace(tableSection, tableHtml);
  }

  function processHtmlImages(html) {
    if (!html) return '';
    const withTable = convertPlainTableToHtml(html);
    return withTable.replace(/src=["']([^"']+\.png)["']/gi, (match, src) => {
      if (src.startsWith('http') || src.startsWith('/') || src.startsWith('../')) {
        return match;
      }
      return 'src="' + IMG_BASE_PATH + src + '"';
    });
  }

  function extractImages(html) {
    if (!html) return [];
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const images = [];
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      let src = match[1];
      if (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith('../')) {
        src = IMG_BASE_PATH + src;
      }
      images.push(src);
    }
    return images;
  }

// ============================================================
// PARSEAR INVALID OPTIONS
// ============================================================

function parseInvalidOptions(invalidText, optionsCount) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const result = {};

  if (!invalidText) return result;

  let parts = invalidText.split(/<br\s*\/?\s*/i);

  if (parts.length <= 1) {
    parts = invalidText.split(/\.\s+(?=La\s+opci|Opci|[A-H][\)\s])/i);
  }

  let allParts = [];
  parts.forEach(part => {
    if (!part.trim()) return;
    const subParts = part.split(/\s+y\s+la\s+opci[oón]+\s*/i);
    if (subParts.length > 1) {
      allParts = allParts.concat(subParts);
    } else {
      allParts.push(part);
    }
  });

  allParts.forEach(part => {
    if (!part.trim()) return;

    let foundLetter = null;
    const cleanPart = part.trim();

    const laMatch = cleanPart.match(/^La\s+opci[oón]+\s+([A-H])/i);
    const opMatch = cleanPart.match(/^Opci[oón]+\s+([A-H])/i);
    const parenMatch = cleanPart.match(/^([A-H])[\)\.]/);

    if (laMatch) foundLetter = laMatch[1].toUpperCase();
    else if (opMatch) foundLetter = opMatch[1].toUpperCase();
    else if (parenMatch) foundLetter = parenMatch[1].toUpperCase();

    if (!foundLetter) {
      const anywhereMatch = cleanPart.match(/La\s+opci[oón]+\s+([A-H])/i) || cleanPart.match(/Opci[oón]+\s+([A-H])/i);
      if (anywhereMatch) foundLetter = anywhereMatch[1].toUpperCase();
    }

    if (!foundLetter && cleanPart.length > 0) {
      const firstChar = cleanPart[0].toUpperCase();
      if (letters.includes(firstChar)) foundLetter = firstChar;
    }

    if (foundLetter) {
      const idx = letters.indexOf(foundLetter);
      if (idx >= 0 && idx < optionsCount) {
        let cleanText = cleanPart
          .replace(/^La\s+opci[oón]+\s+[A-H][\s\)\.]*/i, '')
          .replace(/^Opci[oón]+\s+[A-H][\s\)\.]*/i, '')
          .replace(/^[A-H][\)\.\s,:;]*/, '')
          .trim();
        if (!cleanText || cleanText.length < 5) cleanText = cleanPart;
        result[idx] = cleanText;
      }
    }
  });

  return result;
}
// ============================================================
// RENDER ENRIQUECIDO - Sobrescribe la vista generica anterior
// ============================================================

function hasValue(value) {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const WORD_LIMIT = 180;

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function countWords(text) {
  const clean = stripHtml(text);
  return clean.split(/\s+/).filter(w => w.length > 0).length;
}

function truncateText(html, wordLimit = WORD_LIMIT) {
  if (!html) return { truncated: '', full: '', needsTruncation: false };
  
  const words = stripHtml(html).split(/\s+/).filter(w => w.length > 0);
  
  if (words.length <= wordLimit) {
    return { truncated: html, full: html, needsTruncation: false };
  }
  
  const limitedWords = words.slice(0, wordLimit).join(' ');
  const truncated = limitedWords + '...';
  
  return { 
    truncated: truncated, 
    full: html, 
    needsTruncation: true 
  };
}
function fieldValue(source, keys) {
  if (!source) return '';
  for (const key of keys) {
    if (hasValue(source[key])) return source[key];
  }
  return '';
}
function resolveQuestionImage(src) {
  if (!hasValue(src)) return '';
  const cleanSrc = String(src).trim();
  if (/^(https?:)?\/\//i.test(cleanSrc) || cleanSrc.startsWith('/') || cleanSrc.startsWith('../')) {
    return cleanSrc;
  }
  if (/\.(png|jpg|jpeg|gif|webp|svg|mp4|webm|ogg|html|htm)$/i.test(cleanSrc)) {
    return IMG_BASE_PATH + cleanSrc;
  }
  return IMG_BASE_PATH + cleanSrc + '.png';
}
