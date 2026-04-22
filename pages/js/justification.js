/*
 * justification.js
 * Lógica JavaScript para la página de análisis de pregunta.
 * 
 * Dependencias:
 * - API: ../api/questions.php
 * - Configuración de áreas declarada globalmente
 */

// ============================================================
// CONFIGURACIÓN DE ÁREAS
// ============================================================

const AREA_CONFIG = {
  mat: { name: 'Matemáticas', icon: 'fa-calculator', color: 'mat' },
  lc: { name: 'Lectura Crítica', icon: 'fa-book-reader', color: 'lc' },
  cn: { name: 'Ciencias Naturales', icon: 'fa-flask', color: 'cn' },
  cc: { name: 'Competencias Ciudadanas', icon: 'fa-users', color: 'cc' },
  soc: { name: 'Competencias Ciudadanas', icon: 'fa-users', color: 'cc' },
  en: { name: 'Inglés', icon: 'fa-language', color: 'en' }
};

const AREA_ICONS = {
  mat: 'fa-calculator',
  lc: 'fa-book-reader',
  cn: 'fa-flask',
  cc: 'fa-users',
  soc: 'fa-users',
  en: 'fa-language'
};

// ============================================================
// CARGAR PREGUNTA DESDE URL
// ============================================================

async function initJustification() {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'));
  const areaUrl = params.get('area') || 'mat';

  if (!id) {
    document.getElementById('questionContent').innerHTML = 
      '<p class="text-center text-red-600 p-8">Falta ID de pregunta. URL: ' + location.href + '</p>';
    return;
  }

  try {
    const response = await fetch('../api/questions.php?id=' + id);
    if (!response.ok) throw new Error('API Error');
    const q = await response.json();

    if (q.error) {
      document.getElementById('questionContent').innerHTML = 
        '<p class="text-center text-red-600 p-8">Pregunta no encontrada.</p>';
      return;
    }

    configureArea(areaUrl);
    renderQuestion(q, areaUrl);
    setupNavigation(areaUrl, id, q.subject);
  } catch (e) {
    console.error('Error:', e);
    document.getElementById('questionContent').innerHTML = 
      '<p class="text-center text-red-600 p-8">Error al cargar la pregunta.</p>';
  }
}

// ============================================================
// CONFIGURAR COLORES SEGÚN ÁREA
// ============================================================

function configureArea(area) {
  var configArea = area;
  if (area === 'cc' || area === 'soc') configArea = 'cc';
  else if (area === 'ing') configArea = 'en';

  const config = AREA_CONFIG[configArea] || AREA_CONFIG.mat;
  const header = document.getElementById('headerArea');
  const badge = document.getElementById('areaBadge');
  const icon = document.getElementById('areaIcon');

  // Actualizar clases del header
  header.className = 'bg-' + config.color + '-dark text-white py-6 shadow-md transition-colors duration-300';
  badge.textContent = config.name + ' - ID: 0';
  icon.className = 'fas ' + config.icon + ' text-4xl opacity-80';

  document.body.dataset.area = area;
}

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
// RENDERIZAR OPCIÓN CORRECTA
// ============================================================

function renderCorrectOption(letter, text, textImg, justification, hasImg) {
  const justText = justification || 'Esta es la respuesta correcta.';
  return `
    <div class="option-card bg-white rounded-xl border-2 border-green-500 shadow-md overflow-hidden flex flex-col relative">
      <div class="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RESPUESTA CORRECTA</div>
      <div class="bg-green-50 p-4 border-b border-green-200 flex items-start flex-wrap gap-4 pt-6">
        <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0 shadow">${letter}</div>
        <div class="flex-1">
          <p class="text-gray-900 font-semibold">${text}</p>
          ${hasImg && textImg ? `<img src="/shared/img/questions/${textImg}.png" alt="Opción ${letter}" class="mt-2 max-w-[150px] rounded">` : ''}
        </div>
      </div>
      <div class="p-5 bg-white flex-grow">
        <h4 class="text-green-600 font-bold text-sm mb-2 uppercase tracking-wide flex items-center"><i class="fas fa-check-circle mr-1"></i> Justificación</h4>
        <p class="text-gray-700 text-sm">${justText}</p>
      </div>
    </div>
  `;
}

// ============================================================
// RENDERIZAR OPCIÓN INCORRECTA
// ============================================================

function renderWrongOption(letter, text, textImg, hasImg) {
  return `
    <div class="option-card bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden flex flex-col">
      <div class="bg-red-50 p-4 border-b border-red-200 flex items-start flex-wrap gap-4">
        <div class="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">${letter}</div>
        <div class="flex-1">
          <p class="text-gray-800 text-sm font-medium">${text}</p>
          ${hasImg && textImg ? `<img src="/shared/img/questions/${textImg}.png" alt="Opción ${letter}" class="mt-2 max-w-[150px] rounded">` : ''}
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// EXTRAER IMÁGENES DE HTML
// ============================================================

function extractImages(html) {
  if (!html) return [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const images = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[1]);
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
// RENDERIZAR PREGUNTA
// ============================================================

function renderQuestion(q, area) {
  const config = AREA_CONFIG[area] || AREA_CONFIG.mat;
  const content = document.getElementById('questionContent');
  const badge = document.getElementById('areaBadge');
  const title = document.getElementById('mainTitle');

  badge.textContent = config.name + ' - ID: ' + q.id;
  title.textContent = 'Pregunta #' + q.id;

  const conf = detectContentConfig(q);
  const options = q.options || [];
  const optionsImg = q.optionsImg || [];
  const correctIdx = q.correct !== undefined ? q.correct : 0;

  let html = '';

  // SECCIÓN 1: CONTEXTO
  if (q.context) {
    html += `
      <section class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-${config.color}">
        <h2 class="text-xl font-bold text-${config.color}-dark mb-4 flex items-center">
          <i class="fas fa-book-open mr-2"></i> Contexto
        </h2>
        <div class="prose text-gray-700 max-w-none">${q.context}</div>
      </section>
    `;
  }

  // SECCIÓN 2: PREGUNTA
  if (conf.hasQuestionImg) {
    html += `
      <section class="bg-white rounded-xl shadow-sm p-8 border-l-4 border-${config.color}-light">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Pregunta</h2>
        <div class="prose text-gray-700 mb-4">${q.text || ''}</div>
        <div class="flex justify-center">${extractImages(q.text).map(src => `<img src="${src}" alt="Pregunta" class="max-w-full h-auto rounded-lg">`).join('')}</div>
      </section>
    `;
  } else {
    html += `
      <section class="bg-white rounded-xl shadow-sm p-8 border-l-4 border-${config.color}">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Pregunta</h2>
        <p class="text-lg text-gray-700 font-medium">${q.text || ''}</p>
      </section>
    `;
  }

  // SECCIÓN 3: RESPUESTA CORRECTA
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const correctOption = options[correctIdx] || '';
  const correctImg = optionsImg[correctIdx] || '';

  html += `<section>
    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
      <i class="fas fa-check-circle text-green-600 mr-3"></i> Respuesta Correcta
    </h2>
    <div class="mb-6">`;

  html += renderCorrectOption(letters[correctIdx], correctOption, correctImg, q.justification, conf.hasOptionsImg);

  html += '</div></section>';

  // SECCIÓN 3B: ¿POR QUÉ LAS OTRAS SON INCORRECTAS?
  if (q.invalidOptions) {
    html += `
      <section class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-400">
        <h3 class="text-lg font-bold text-red-700 mb-4 flex items-center">
          <i class="fas fa-times-circle mr-2"></i> ¿Por qué las otras opciones son incorrectas?
        </h3>
        <div class="bg-red-50 rounded-lg p-4">
          <p class="text-gray-700 text-sm">${q.invalidOptions}</p>
        </div>
      </section>
    `;
  }

  // SECCIÓN 3C: LISTA DE OPCIONES INCORRECTAS
  const wrongOptions = options.filter((_, idx) => idx !== correctIdx);

  if (wrongOptions.length > 0) {
    html += `
      <section class="mt-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center">
          <i class="fas fa-list mr-2"></i> Opciones Incorrectas
        </h3>
        <ul class="space-y-2">`;

    options.forEach((opt, idx) => {
      if (idx !== correctIdx) {
        const optLetter = letters[idx];
        html += `
          <li class="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
            <span class="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs shrink-0">${optLetter}</span>
            <span class="text-gray-600 text-sm">${opt}</span>
          </li>`;
      }
    });

    html += '</ul></section>';
  }

  // SECCIÓN 4: INFORMACIÓN PEDAGÓGICA
  html += `
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
        <h3 class="text-lg font-bold text-indigo-800 mb-3"><i class="fas fa-microscope mr-2"></i> Concepto Clave</h3>
        <p class="text-sm text-indigo-900">${q.competency || 'Análisis de la pregunta ICFES'}</p>
      </div>
      <div class="bg-gray-800 rounded-xl p-6 text-white shadow-sm flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-100 mb-4 border-b border-gray-600 pb-2"><i class="fas fa-tags mr-2"></i> Ficha Técnica</h3>
          <div class="space-y-3 text-xs">
            <div>
              <span class="text-gray-400 block uppercase tracking-wider">Competencia</span>
              <span class="font-medium text-blue-300">${q.competency || '-'}</span>
            </div>
            <div>
              <span class="text-gray-400 block uppercase tracking-wider">Componente</span>
              <span class="font-medium">${q.component || '-'}</span>
            </div>
            <div>
              <span class="text-gray-400 block uppercase tracking-wider">Criterio</span>
              <span class="font-medium text-gray-300">${q.evaluationCriteria || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  content.innerHTML = html;
}

// ============================================================
// NAVEGACIÓN
// ============================================================

async function setupNavigation(area, currentId, subject) {
  const config = AREA_CONFIG[area] || AREA_CONFIG.mat;

  try {
    const response = await fetch('../api/questions.php?subject=' + subject);
    const questions = await response.json();
    questions.sort((a, b) => a.id - b.id);

    const idx = questions.findIndex(q => q.id === currentId);

    // Botones anterior/siguiente (flechas)
    const prevBtn = document.getElementById('navPrev');
    const nextBtn = document.getElementById('navNext');

    if (idx > 0) {
      prevBtn.href = 'justification.php?area=' + area + '&id=' + questions[idx - 1].id;
    } else {
      prevBtn.classList.add('opacity-40', 'pointer-events-none');
    }

    if (idx < questions.length - 1) {
      nextBtn.href = 'justification.php?area=' + area + '&id=' + questions[idx + 1].id;
    } else {
      nextBtn.classList.add('opacity-40', 'pointer-events-none');
    }

    // Botones anterior/siguiente (texto)
    const prevBtn远 = document.getElementById('navPrev远');
    const nextBtn远 = document.getElementById('navNext远');

    if (idx > 0) {
      prevBtn远.href = 'justification.php?area=' + area + '&id=' + questions[idx - 1].id;
    } else {
      prevBtn远.classList.add('opacity-40', 'pointer-events-none');
    }

    if (idx < questions.length - 1) {
      nextBtn远.href = 'justification.php?area=' + area + '&id=' + questions[idx + 1].id;
    } else {
      nextBtn远.classList.add('opacity-40', 'pointer-events-none');
    }

    // Botón área
    const navArea = document.getElementById('navArea');
    navArea.href = 'area.php?area=' + area;

    // Quick nav pills
    const quickNav = document.getElementById('quickNav');
    const start = Math.max(0, idx - 4);
    const end = Math.min(questions.length, idx + 6);

    let pillsHtml = '';
    for (let i = start; i < end; i++) {
      const q = questions[i];
      const isActive = q.id === currentId;
      pillsHtml +=
        '<a href="justification.php?area=' + area + '&id=' + q.id + '" ' +
        'class="px-2.5 py-1 rounded-lg text-xs font-medium transition ' + (isActive ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100') + '">' +
        q.id +
        '</a>';
    }
    quickNav.innerHTML = pillsHtml;
  } catch (e) {
    console.error('Navigation error:', e);
  }
}

// ============================================================
// INICIALIZAR EN DOM READY
// ============================================================

document.addEventListener('DOMContentLoaded', initJustification);