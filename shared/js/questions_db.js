const API_BASE = '/SED-Justificacion-Respuesta-ICFES/api/questions.php';
let PREGUNTAS = [];
let loaded = false;

async function loadQuestions() {
  if (loaded) return PREGUNTAS;
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    PREGUNTAS = await res.json();
    loaded = true;
    return PREGUNTAS;
  } catch (e) {
    console.error('Error cargando preguntas:', e);
    return [];
  }
}

async function getQuestionsByArea(subject) {
  await loadQuestions();
  return PREGUNTAS.filter(q => q.subject === subject);
}

async function getQuestionById(id, subject) {
  await loadQuestions();
  return PREGUNTAS.find(q => q.id === id && q.subject === subject);
}

async function getTotalByArea(subject) {
  await loadQuestions();
  return PREGUNTAS.filter(q => q.subject === subject).length;
}

async function initDB() {
  return loadQuestions();
}

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