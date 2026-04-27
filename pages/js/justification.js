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
  cc: { name: 'Competencias Ciudadanas', icon: 'fa-users', color: 'soc' },
  soc: { name: 'Competencias Ciudadanas', icon: 'fa-users', color: 'soc' },
  en: { name: 'Inglés', icon: 'fa-language', color: 'ing' }
};

const API_JUSTIFICACIONES = '../api/justificaciones.php';

const AREA_ICONS = {
  mat: 'fa-calculator',
  lc: 'fa-book-reader',
  cn: 'fa-flask',
  cc: 'fa-users',
  soc: 'fa-users',
  ing: 'fa-language'
};

const BG_AREA_ICONS = {
  mat: ['∑', '∫', 'π', '√', '≈', 'Δ', 'Ω', 'λ', '∞', '∂', '∇', '∉', '⊕', '⊖', '⊗'],
  lc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
  cn: ['⚛', '🧬', '🔬', '🧪', '🌿', '⚡', '🔥', '💧', '🌊', '☀️', '🌙', '⭐', '🧠', '🦴', '🩸'],
  cc: ['⚖️', '🤝', '🗳️', '🗣️', '📢', '👥', '👤', '🏛️', '🛡️', '❤️', '🤲', '✊', '✋', '👋', '💪'],
  soc: ['⚖️', '🤝', '🗳️', '🗣️', '📢', '👥', '👤', '🏛️', '🛡️', '❤️', '🤲', '✊', '✋', '👋', '💪'],
  en: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
};

function spawnBackgroundIcons(area) {
  const canvas = document.querySelector('.bg-canvas');
  if (!canvas) return;
  canvas.innerHTML = '';
  const icons = BG_AREA_ICONS[area] || BG_AREA_ICONS.mat;
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'hero-bg-item';
    el.textContent = icons[i % icons.length];
    el.style.cssText = 'top: ' + (Math.random() * 90 + 5) + '%; left: ' + (Math.random() * 90 + 5) + '%; font-size: ' + (35 + Math.random() * 55) + 'px; animation-delay: ' + (Math.random() * 5) + 's; animation-duration: ' + (12 + Math.random() * 12) + 's;';
    canvas.appendChild(el);
  }
}

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

    const expanded = await loadExpandedJustification(id);

    configureArea(areaUrl);
    spawnBackgroundIcons(areaUrl);
    renderQuestion(q, areaUrl, expanded);
    setupNavigation(areaUrl, id, q.subject);
  } catch (e) {
    console.error('Error:', e);
    document.getElementById('questionContent').innerHTML = 
      '<p class="text-center text-red-600 p-8">Error al cargar la pregunta.</p>';
  }
}

async function loadExpandedJustification(id) {
  try {
    const response = await fetch(API_JUSTIFICACIONES + '?id=' + id);
    if (!response.ok) return {};
    const data = await response.json();
    return data && data.existe === false ? {} : data;
  } catch (e) {
    console.warn('No se pudo cargar la justificacion expandida:', e);
    return {};
  }
}

// ============================================================
// CONFIGURAR COLORES SEGÚN ÁREA
// ============================================================

function configureArea(area) {
  var configArea = area;
  if (area === 'cc' || area === 'soc') configArea = 'soc';
  else if (area === 'en') configArea = 'en';

  const config = AREA_CONFIG[configArea] || AREA_CONFIG.mat;
  const header = document.getElementById('headerArea');
  const sidebar = document.getElementById('questionSidebar');
  const sidebarHeader = document.getElementById('sidebarHeader');
  const badge = document.getElementById('areaBadge');
  const icon = document.getElementById('areaIcon');
  const sidebarIcon = document.getElementById('sidebarIcon');
  const sidebarAreaName = document.getElementById('sidebarAreaName');

  header.className = 'bg-' + config.color + '-dark text-white py-6 shadow-md transition-colors duration-300';
  sidebarHeader.className = 'p-5 text-white bg-' + config.color + '-dark transition-colors duration-300';
  badge.textContent = config.name + ' - ID: 0';
  icon.className = 'fas ' + config.icon + ' text-4xl opacity-80';
  sidebarIcon.className = 'fas ' + config.icon + ' text-3xl opacity-90 mb-3 block';
  sidebarAreaName.textContent = config.name;

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
  // EXTRAER IMÁGENES DE HTML
  // ============================================================

  const IMG_BASE_PATH = '../shared/img/questions/';

  function getOptionImgSrc(imgName) {
    if (!imgName) return '';
    if (/^(https?:)?\/\//i.test(imgName) || imgName.startsWith('/') || imgName.startsWith('../')) return imgName;
    if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(imgName)) return IMG_BASE_PATH + imgName;
    return IMG_BASE_PATH + imgName + '.png';
  }

  function processHtmlImages(html) {
    if (!html) return '';
    return html.replace(/src=["']([^"']+\.png)["']/gi, (match, src) => {
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
  // RENDERIZAR PREGUNTA
  // ============================================================

  function renderQuestionLegacy(q, area) {
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
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    let html = '';

    // SECCIÓN 0: CRITERIO DE EVALUACIÓN (antes del contexto, color amarillo/ámbar)
    if (q.evaluationCriteria) {
      html += `
        <section class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500 mb-6 collapse-section" data-opened="true">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-amber-700 flex items-center">
              <i class="fas fa-clipboard-check mr-2"></i> ¿Qué evalúa esta pregunta?
            </h2>
            <button class="collapse-btn text-sm text-amber-600 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium" onclick="toggleCollapse(this)">
              <i class="fas fa-eye-slash"></i> <span>Click para ocultar</span> <i class="fas fa-chevron-up"></i>
            </button>
          </div>
          <div class="collapse-content">
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p class="text-gray-800">${q.evaluationCriteria}</p>
            </div>
          </div>
        </section>
      `;
    }

    // SECCIÓN 1: CONTEXTO (abierta por defecto)
    if (q.context) {
      html += `
        <section class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-${config.color} collapse-section" data-opened="true">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-${config.color}-dark flex items-center">
              <i class="fas fa-book-open mr-2"></i> Contexto
            </h2>
            <button class="collapse-btn text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium" onclick="toggleCollapse(this)">
              <i class="fas fa-eye-slash"></i> <span>Click para ocultar</span> <i class="fas fa-chevron-up"></i>
            </button>
          </div>
          <div class="collapse-content prose text-gray-700 max-w-none">${processHtmlImages(q.context)}</div>
        </section>
      `;
    }

    // SECCIÓN 2: PREGUNTA (abierta por defecto)
    if (conf.hasQuestionImg) {
      html += `
        <section class="bg-white rounded-xl shadow-sm p-8 border-l-4 border-${config.color}-light collapse-section" data-opened="true">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="fas fa-question-circle mr-2 text-${config.color}"></i> Pregunta
            </h2>
            <button class="collapse-btn text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium" onclick="toggleCollapse(this)">
              <i class="fas fa-eye-slash"></i> <span>Click para ocultar</span> <i class="fas fa-chevron-up"></i>
            </button>
          </div>
          <div class="collapse-content">
            <div class="prose text-gray-700 mb-4">${processHtmlImages(q.text || '')}</div>
            <div class="flex justify-center">${extractImages(q.text).map(src => `<img src="${src}" alt="Pregunta" class="max-w-full h-auto rounded-lg">`).join('')}</div>
          </div>
        </section>
      `;
    } else {
      html += `
        <section class="bg-white rounded-xl shadow-sm p-8 border-l-4 border-${config.color} collapse-section" data-opened="true">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center">
              <i class="fas fa-question-circle mr-2 text-${config.color}"></i> Pregunta
            </h2>
            <button class="collapse-btn text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium" onclick="toggleCollapse(this)">
              <i class="fas fa-eye-slash"></i> <span>Click para ocultar</span> <i class="fas fa-chevron-up"></i>
            </button>
          </div>
          <div class="collapse-content">
            <p class="text-lg text-gray-700 font-medium">${processHtmlImages(q.text || '')}</p>
          </div>
        </section>
      `;
    }

    // SECCIÓN 3: RESPUESTA CORRECTA (abierta por defecto, con título dentro)
    const correctOption = options[correctIdx] || '';
    const correctImg = optionsImg[correctIdx] || '';

    html += `
      <section class="bg-white rounded-xl shadow-sm collapse-section p-6 border-l-4 border-green-500" data-opened="true">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-green-700 flex items-center">
            <i class="fas fa-check-circle mr-2"></i> Respuesta Correcta
          </h2>
          <button class="collapse-btn text-sm text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium" onclick="toggleCollapse(this)">
            <i class="fas fa-eye-slash"></i> <span>Click para ocultar</span> <i class="fas fa-chevron-up"></i>
          </button>
        </div>
        <div class="collapse-content">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <span class="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block">RESPUESTA CORRECTA</span>
            <div class="flex items-start flex-wrap gap-3 mt-2">
              <div class="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold shrink-0">${letters[correctIdx]}</div>
              <div class="flex-1">
                <p class="text-gray-900 font-medium">${correctOption}</p>
                ${conf.hasOptionsImg && correctImg ? `<img src="${getOptionImgSrc(correctImg)}" alt="Opción ${letters[correctIdx]}" class="mt-2 max-w-[150px] rounded">` : ''}
              </div>
            </div>
          </div>
          <div class="bg-white border border-green-200 rounded-lg p-4">
            <h4 class="text-green-600 font-bold text-sm mb-2 uppercase tracking-wide flex items-center"><i class="fas fa-check-circle mr-1"></i> Justificación</h4>
            <p class="text-gray-700 text-sm">${q.justification || 'Esta es la respuesta correcta.'}</p>
          </div>
        </div>
      </section>
    `;

    // SECCIÓN 3B + 3C: OPCIONES INCORRECTAS (fusionadas)
    const hasInvalidText = q.invalidOptions ? true : false;
    const hasWrongOptions = options.filter((_, idx) => idx !== correctIdx).length > 0;

    if (hasInvalidText || hasWrongOptions) {
      html += `
        <section class="bg-white rounded-xl shadow-sm collapse-section border-l-4 border-red-400 p-6" data-opened="false">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-red-700 flex items-center">
              <i class="fas fa-times-circle mr-2"></i> Opciones Incorrectas
              ${hasInvalidText && hasWrongOptions ? '<span class="ml-2 text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded-full">(razones + lista)</span>' : ''}
            </h3>
            <button class="collapse-btn text-sm text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium shadow-sm" onclick="toggleCollapse(this)">
              <i class="fas fa-eye"></i> <span>Click para abrir</span> <i class="fas fa-chevron-down"></i>
            </button>
          </div>
          <div class="collapse-content hidden space-y-4">
            ${q.invalidOptions ? `
              <div class="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 class="text-red-700 font-semibold text-sm mb-2 flex items-center"><i class="fas fa-question-circle mr-2"></i> ¿Por qué son incorrectas?</h4>
                <p class="text-gray-700 text-sm">${q.invalidOptions}</p>
              </div>
            ` : ''}
            ${hasWrongOptions ? `
              <div class="border border-red-200 rounded-lg overflow-hidden">
                <h4 class="text-red-700 font-semibold text-sm bg-red-50 px-4 py-2 border-b border-red-200 flex items-center">
                  <i class="fas fa-list mr-2"></i> Lista de opciones
                </h4>
                <ul class="divide-y divide-red-100">
                  ${options.map((opt, idx) => {
                    if (idx !== correctIdx) {
                      const optLetter = letters[idx];
                      const optImg = optionsImg[idx] || '';
                      return `
                        <li class="bg-white p-3 flex items-start gap-3 hover:bg-red-50 transition">
                          <span class="bg-red-100 text-red-600 rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shrink-0">${optLetter}</span>
                          <div class="flex-1">
                            <p class="text-gray-700 text-sm">${opt}</p>
                            ${conf.hasOptionsImg && optImg ? `<img src="${getOptionImgSrc(optImg)}" alt="Opción ${optLetter}" class="mt-2 max-w-[150px] rounded">` : ''}
                          </div>
                        </li>`;
                    }
                    return '';
                  }).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </section>
      `;
    }

    // SECCIÓN 5: INFORMACIÓN PEDAGÓGICA (cerrada por defecto)
    html += `
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 collapse-section" data-opened="false">
        <div class="flex items-center justify-between mb-4 md:hidden">
          <h3 class="text-lg font-bold text-indigo-800 flex items-center">
            <i class="fas fa-info-circle mr-2"></i> Información Pedagógica
          </h3>
          <button class="collapse-btn text-sm text-indigo-600 hover:text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium" onclick="toggleCollapse(this)">
            <i class="fas fa-eye"></i> <span>Click para abrir</span> <i class="fas fa-chevron-down"></i>
          </button>
        </div>
        <div class="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm collapse-content hidden">
          <h3 class="text-lg font-bold text-indigo-800 mb-3"><i class="fas fa-microscope mr-2"></i> Concepto Clave</h3>
          <p class="text-sm text-indigo-900">${q.competency || 'Análisis de la pregunta ICFES'}</p>
        </div>
        <div class="bg-gray-800 rounded-xl p-6 text-white shadow-sm flex flex-col justify-between collapse-content hidden">
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

function fieldValue(source, keys) {
  if (!source) return '';
  for (const key of keys) {
    if (hasValue(source[key])) return source[key];
  }
  return '';
}

function placeholder(label, description) {
  return `
    <div class="placeholder-box">
      <span class="chip mb-3"><i class="fas fa-hourglass-half"></i> Placeholder</span>
      <p class="font-semibold text-slate-700">${label}</p>
      <p class="empty-note mt-1">${description}</p>
    </div>
  `;
}

function renderHtmlOrPlaceholder(value, label, description, extraClass) {
  if (!hasValue(value)) return placeholder(label, description);
  return `<div class="${extraClass || 'learning-prose'}">${processHtmlImages(value)}</div>`;
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

function renderQuestionImage(src, altText) {
  const imageSrc = resolveQuestionImage(src);
  if (!imageSrc) return '';
  return `<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(altText)}" class="mt-4 rounded-xl border border-slate-200 shadow-sm mx-auto max-w-full h-auto">`;
}

function parseGlossaryItems(raw) {
  if (!hasValue(raw)) return [];

  if (Array.isArray(raw)) {
    return raw.map(item => ({
      term: item.term || item.termino || item.titulo || '',
      definition: item.definition || item.definicion || item.descripcion || ''
    })).filter(item => hasValue(item.term) || hasValue(item.definition));
  }

  const text = String(raw).trim();
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parseGlossaryItems(parsed);
    if (parsed && typeof parsed === 'object') {
      return Object.keys(parsed).map(key => ({ term: key, definition: parsed[key] }));
    }
  } catch (e) {
  }

  return text.split(/\r?\n+/).map(line => {
    const parts = line.split(/\s*[:\-]\s*/);
    return {
      term: (parts.shift() || '').trim(),
      definition: parts.join(': ').trim()
    };
  }).filter(item => hasValue(item.term) || hasValue(item.definition));
}

function renderGlossary(raw) {
  const items = parseGlossaryItems(raw);
  if (!items.length) {
    return placeholder(
      'Glosario pendiente',
      'Aqui apareceran terminos tecnicos de la pregunta con definiciones breves para apoyar la lectura.'
    );
  }

  return `
    <div class="glossary-list">
      ${items.map(item => `
        <div>
          <span class="glossary-term glossary-tooltip">
            ${escapeHtml(item.term || 'Termino')}
            <span class="glossary-tooltip__content">${escapeHtml(item.definition || 'Definicion pendiente.')}</span>
          </span>
          <span class="empty-note">${escapeHtml(item.definition || 'Definicion pendiente.')}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMedia(value) {
  if (!hasValue(value)) {
    return `
      <div class="media-frame items-center justify-center">
        <div class="text-center px-5">
          <i class="fas fa-play-circle text-4xl mb-3" style="color: var(--area-accent);"></i>
          <p class="font-bold text-slate-700">Recurso interactivo pendiente</p>
          <p class="empty-note">Aqui podra vivir un simulador, video, imagen o enlace externo.</p>
        </div>
      </div>
    `;
  }

  const media = String(value).trim();
  if (/<(iframe|video|img|audio)\b/i.test(media)) {
    return `<div class="media-frame">${processHtmlImages(media)}</div>`;
  }

  const resolved = resolveQuestionImage(media);
  if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(media)) {
    return `<div class="media-frame"><img src="${escapeHtml(resolved)}" alt="Recurso multimedia"></div>`;
  }
  if (/\.(mp4|webm|ogg)$/i.test(media)) {
    return `<div class="media-frame"><video src="${escapeHtml(resolved)}" controls></video></div>`;
  }
  if (/^https?:\/\//i.test(media)) {
    return `
      <div class="media-frame"><iframe src="${escapeHtml(media)}" title="Recurso interactivo" loading="lazy"></iframe></div>
      <a href="${escapeHtml(media)}" target="_blank" rel="noopener" class="inline-flex mt-3 text-sm font-bold" style="color: var(--area-accent);">
        Abrir recurso <i class="fas fa-arrow-up-right-from-square ml-2 mt-0.5"></i>
      </a>
    `;
  }

  return `<div class="learning-prose">${processHtmlImages(media)}</div>`;
}

function renderOptions(options, optionsImg, correctIdx, hasOptionsImg, letters) {
  if (!options.length) {
    return placeholder('Opciones no disponibles', 'La pregunta no trae opciones de respuesta en la API actual.');
  }

  return `
    <div class="answer-list">
      ${options.map((opt, idx) => {
        const isCorrect = idx === correctIdx;
        const optImg = optionsImg[idx] || '';
        return `
          <div class="answer-option ${isCorrect ? 'answer-option--correct' : 'answer-option--wrong'}">
            <span class="answer-letter">${letters[idx]}</span>
            <div class="flex-1">
              <div class="learning-prose">${processHtmlImages(opt || '')}</div>
              ${hasOptionsImg && optImg ? `<img src="${escapeHtml(getOptionImgSrc(optImg))}" alt="Opcion ${letters[idx]}" class="mt-3 max-w-[170px] rounded-lg border border-slate-200">` : ''}
            </div>
            <i class="fas ${isCorrect ? 'fa-check-circle text-green-600' : 'fa-circle-xmark text-red-500'} mt-1"></i>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderQuestion(q, area, expanded) {
  const config = AREA_CONFIG[area] || AREA_CONFIG.mat;
  const content = document.getElementById('questionContent');
  const badge = document.getElementById('areaBadge');
  const title = document.getElementById('mainTitle');

  const questionName = fieldValue(expanded, ['nombrePregunta', 'nombreDePreguntas', 'nombre_pregunta']);
  const displayTitle = hasValue(questionName) ? questionName : 'Pregunta #' + q.id;

  badge.textContent = config.name + ' - ID: ' + q.id;
  title.textContent = displayTitle;

  const conf = detectContentConfig(q);
  const options = q.options || [];
  const optionsImg = q.optionsImg || [];
  const correctIdx = q.correct !== undefined ? q.correct : 0;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const correctOption = options[correctIdx] || '';
  const correctImg = optionsImg[correctIdx] || '';
  const extendedDescription = fieldValue(expanded, ['descripcionExtendida', 'descripcion_extendida']);
  const mediaInteractiva = fieldValue(expanded, ['mediaInteractiva', 'media_interactiva']);
  const glossaryItems = fieldValue(expanded, ['glosario_items', 'glosarioItems']);
  const datoCurioso = fieldValue(expanded, ['datoCurioso', 'dato_curioso']);
  const errorComun = fieldValue(expanded, ['errorComunFeedback', 'error_comun_feedback']);

  content.innerHTML = `
    <div class="learning-shell">
      <div class="learning-main">
        <section class="learning-card learning-card--soft">
          <span class="learning-eyebrow">${config.name} · ID ${q.id}</span>
          <h1 class="learning-title mt-3">${escapeHtml(displayTitle)}</h1>
          ${hasValue(questionName) ? '' : '<span class="chip mt-4"><i class="fas fa-tag"></i> Nombre pedagogico pendiente</span>'}
          <div class="objective-card mt-6">
            <span class="objective-icon"><i class="fas fa-bullseye"></i></span>
            <div>
              <p class="learning-eyebrow mb-1">¿Qué evalúa la pregunta?</p>
              ${renderHtmlOrPlaceholder(
                q.evaluationCriteria,
                'Criterio de evaluacion pendiente',
                'Cuando este campo venga de la base de datos, aqui se resumira la habilidad que mide la pregunta.',
                'learning-prose'
              )}
            </div>
          </div>
        </section>

        <section class="learning-card">
          <h2 class="learning-section-title flex items-center gap-2 mb-4">
            <i class="fas fa-book-open"></i> Contexto de la pregunta
          </h2>
          ${renderHtmlOrPlaceholder(
            q.context,
            'Contexto pendiente',
            'Aqui se mostrara el enunciado contextual, texto fuente, tabla o situacion problema.',
            'learning-prose'
          )}
          ${renderQuestionImage(q.contextImg, 'Imagen del contexto')}
        </section>

        <section class="learning-card learning-card--question">
          <span class="chip bg-white/15 border-white/20 text-white">Pregunta</span>
          <div class="text-lg md:text-xl font-semibold leading-relaxed mt-4">
            ${processHtmlImages(q.text || '') || '<p>Enunciado pendiente.</p>'}
          </div>
          ${renderQuestionImage(q.questionImg, 'Imagen de la pregunta')}
        </section>

        <section class="learning-card">
          <h2 class="learning-section-title flex items-center gap-2 mb-4">
            <i class="fas fa-list-check"></i> Opciones de respuesta
          </h2>
          ${renderOptions(options, optionsImg, correctIdx, conf.hasOptionsImg, letters)}
        </section>

        <section class="learning-card learning-card--success">
          <h2 class="learning-section-title text-green-700 flex items-center gap-2 mb-4">
            <i class="fas fa-graduation-cap"></i> Analisis de la respuesta correcta
          </h2>
          <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <span class="chip bg-green-100 border-green-200 text-green-700">Respuesta correcta</span>
            <div class="flex items-start flex-wrap gap-3 mt-3">
              <span class="answer-letter answer-letter--correct">${letters[correctIdx]}</span>
              <div class="flex-1 learning-prose font-semibold text-slate-900">
                ${processHtmlImages(correctOption || 'Opcion correcta no disponible.')}
                ${conf.hasOptionsImg && correctImg ? `<img src="${escapeHtml(getOptionImgSrc(correctImg))}" alt="Opcion ${letters[correctIdx]}" class="mt-3 max-w-[170px] rounded-lg">` : ''}
              </div>
            </div>
          </div>
          <div class="learning-prose">
            ${processHtmlImages(q.justification || 'Esta es la respuesta correcta.')}
          </div>
        </section>

        <section class="learning-card">
          <h2 class="learning-section-title flex items-center gap-2 mb-4">
            <i class="fas fa-route"></i> Guia teorica extendida
          </h2>
          ${renderHtmlOrPlaceholder(
            extendedDescription,
            'Descripcion extendida pendiente',
            'Este espacio ampliara la justificacion con pasos, conceptos clave, metodos y conexiones tematicas.',
            'learning-prose'
          )}
        </section>

        <section class="learning-card learning-card--danger">
          <h2 class="learning-section-title text-red-700 flex items-center gap-2 mb-4">
            <i class="fas fa-triangle-exclamation"></i> Opciones incorrectas
          </h2>
          <div class="learning-prose mb-4">
            ${processHtmlImages(q.invalidOptions || 'No hay justificacion detallada para los distractores en la base de datos actual.')}
          </div>
          <div class="answer-list">
            ${options.map((opt, idx) => {
              if (idx === correctIdx) return '';
              const optImg = optionsImg[idx] || '';
              return `
                <div class="answer-option answer-option--wrong">
                  <span class="answer-letter">${letters[idx]}</span>
                  <div class="flex-1">
                    <div class="learning-prose">${processHtmlImages(opt || '')}</div>
                    ${conf.hasOptionsImg && optImg ? `<img src="${escapeHtml(getOptionImgSrc(optImg))}" alt="Opcion ${letters[idx]}" class="mt-3 max-w-[170px] rounded-lg border border-slate-200">` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      </div>

      <aside class="learning-aside">
        <section class="side-card">
          <h3 class="learning-eyebrow mb-4">Ficha tecnica</h3>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between gap-4"><dt class="text-slate-500">Competencia</dt><dd class="font-bold text-right">${escapeHtml(q.competency || '-')}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-slate-500">Componente</dt><dd class="font-bold text-right">${escapeHtml(q.component || '-')}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-slate-500">Nivel</dt><dd class="font-bold text-right">${escapeHtml(q.level || '-')}</dd></div>
            <div class="flex justify-between gap-4"><dt class="text-slate-500">Habilidad</dt><dd class="font-bold text-right">${escapeHtml(q.skill || '-')}</dd></div>
          </dl>
        </section>

        <section class="side-card side-card--media">
          <div class="flex items-center gap-3 mb-4">
            <span class="aside-icon"><i class="fas fa-photo-film"></i></span>
            <h3 class="font-bold text-slate-800">Media interactiva</h3>
          </div>
          ${renderMedia(mediaInteractiva)}
        </section>

        <section class="side-card">
          <div class="flex items-center gap-3 mb-4">
            <span class="aside-icon"><i class="fas fa-spell-check"></i></span>
            <h3 class="font-bold text-slate-800">Glosario rapido</h3>
          </div>
          ${renderGlossary(glossaryItems)}
        </section>

        <section class="side-card">
          <div class="flex items-center gap-3 mb-3">
            <span class="aside-icon"><i class="fas fa-lightbulb"></i></span>
            <h3 class="font-bold text-slate-800">Dato curioso</h3>
          </div>
          ${renderHtmlOrPlaceholder(
            datoCurioso,
            'Dato curioso pendiente',
            'Aqui se mostrara una conexion cultural, cientifica o historica relacionada con el tema.',
            'learning-prose text-sm'
          )}
        </section>

        <section class="side-card learning-card--danger">
          <div class="flex items-center gap-3 mb-3">
            <span class="aside-icon"><i class="fas fa-bug"></i></span>
            <h3 class="font-bold text-slate-800">Error comun</h3>
          </div>
          ${renderHtmlOrPlaceholder(
            errorComun,
            'Feedback de distractores pendiente',
            'Este campo explicara la estrategia de las opciones trampa y como evitarlas.',
            'learning-prose text-sm'
          )}
        </section>
      </aside>
    </div>
  `;
}

// ============================================================
// SIDEBAR DE NAVEGACIÓN
// ============================================================

let sidebarQuestions = [];
let sidebarFiltered = [];
let sidebarCollapsed = false;

function normalizeText(str) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filterSidebarQuestions(searchTerm) {
  const term = normalizeText(searchTerm.trim());
  
  if (!term) {
    sidebarFiltered = [...sidebarQuestions];
  } else {
    sidebarFiltered = sidebarQuestions.filter(q => {
      const searchFields = [
        q.text || '',
        q.context || '',
        q.justification || '',
        ...(q.options || [])
      ].join(' ');
      return normalizeText(searchFields).includes(term);
    });
  }
  
  const params = new URLSearchParams(location.search);
  const currentId = parseInt(params.get('id'));
  renderSidebar(sidebarFiltered, currentId, params.get('area') || 'mat');
}

function toggleSidebarCollapse() {
  const sidebar = document.getElementById('questionSidebar');
  const toggleBtn = document.getElementById('toggleCollapse');
  
  sidebarCollapsed = !sidebarCollapsed;
  
  if (sidebarCollapsed) {
    document.body.classList.add('sidebar-collapsed');
    toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    toggleBtn.title = 'Expandir';
  } else {
    document.body.classList.remove('sidebar-collapsed');
    toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    toggleBtn.title = 'Colapsar';
  }
}

document.getElementById('toggleCollapse').addEventListener('click', toggleSidebarCollapse);

function renderSidebar(questions, currentId, area) {
  const container = document.getElementById('sidebarQuestions');
  if (!container) return;
  
  const areaColor = getAreaColorClass(area);
  
  container.innerHTML = questions.map(q => {
    const isActive = q.id === currentId;
    const preview = q.text ? q.text.replace(/<[^>]+>/g, '').trim().substring(0, 70) : 'Sin texto';
    const truncated = preview.length >= 70 ? preview + '...' : preview;
    return `
      <a href="justification.php?area=${area}&id=${q.id}" 
         class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-sm ${isActive ? 'bg-' + areaColor + ' text-white font-semibold shadow-sm' : 'text-gray-700 hover:bg-' + areaColor + '/10 hover:text-' + areaColor}">
        <span class="text-xs ${isActive ? 'opacity-80' : 'text-gray-400'} font-mono">#${q.id}</span>
        <span class="line-clamp-2 text-xs sidebar-full-content">${truncated}</span>
      </a>
    `;
  }).join('');
}

function getAreaColorClass(area) {
  const colorMap = { mat: 'mat', lc: 'lc', cn: 'cn', cc: 'soc', soc: 'soc', en: 'ing' };
  return colorMap[area] || 'mat';
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

    // Botón área
    const navArea = document.getElementById('navArea');
    navArea.href = 'area.php?area=' + area;

    // Renderizar sidebar con todas las preguntas
    sidebarQuestions = questions;
    sidebarFiltered = [...questions];
    renderSidebar(sidebarFiltered, currentId, area);
    
    // Event listener para búsqueda
    const searchInput = document.getElementById('sidebarSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        filterSidebarQuestions(this.value);
      });
    }
  } catch (e) {
    console.error('Navigation error:', e);
  }
}

// ============================================================
  // INICIALIZAR EN DOM READY
  // ============================================================

  document.addEventListener('DOMContentLoaded', initJustification);

  // ============================================================
  // COLLAPSE (PLEGABLE)
  // ============================================================

  function toggleCollapse(btn) {
    const section = btn.closest('.collapse-section');
    const content = section.querySelector('.collapse-content');
    const isOpen = section.getAttribute('data-opened') === 'true';

    if (isOpen) {
      content.classList.add('hidden');
      section.setAttribute('data-opened', 'false');
      btn.querySelector('span').textContent = 'Click para abrir';
      btn.querySelectorAll('i').forEach((icon, i) => {
        if (i === 0) icon.className = 'fas fa-eye';
        if (i === 1) icon.className = 'fas fa-chevron-down';
      });
    } else {
      content.classList.remove('hidden');
      section.setAttribute('data-opened', 'true');
      btn.querySelector('span').textContent = 'Click para ocultar';
      btn.querySelectorAll('i').forEach((icon, i) => {
        if (i === 0) icon.className = 'fas fa-eye-slash';
        if (i === 1) icon.className = 'fas fa-chevron-up';
      });
    }
  }
