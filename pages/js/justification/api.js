/*
 * api.js
 * Carga unificada de pregunta con cache inmediato y refresco en segundo plano.
 */

const CACHE_PREFIX = 'qc_v3_';
const LEGACY_CACHE_PREFIX = 'qc_v2_';
const CACHE_EXPIRY = 1000 * 60 * 5;

function getCacheKey(id) {
  return CACHE_PREFIX + id;
}

function getStoredVersion() {
  try {
    const v = sessionStorage.getItem('question_data_version');
    return v ? JSON.parse(v) : null;
  } catch (e) {
    return null;
  }
}

function storeVersion(version) {
  try {
    sessionStorage.setItem('question_data_version', JSON.stringify(version || {}));
  } catch (e) {}
}

function isCacheValid(version) {
  if (!version) return false;
  const stored = getStoredVersion();
  if (!stored) return false;
  return stored.question === version.question &&
         stored.justificacion === version.justificacion;
}

function getCachedQuestion(id) {
  const keys = [getCacheKey(id), LEGACY_CACHE_PREFIX + id];

  for (const key of keys) {
    const cached = localStorage.getItem(key);
    if (!cached) continue;

    try {
      const data = JSON.parse(cached);
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem(key);
        continue;
      }
      return data.payload;
    } catch (e) {
      localStorage.removeItem(key);
    }
  }

  return null;
}

function setCachedQuestion(id, payload, version) {
  const key = getCacheKey(id);
  const expiry = Date.now() + CACHE_EXPIRY;

  try {
    localStorage.setItem(key, JSON.stringify({
      payload,
      version,
      expiry
    }));
    storeVersion(version);
  } catch (e) {}
}

function showCacheStatus(show) {
  const status = document.getElementById('cacheStatus');
  if (status) {
    status.classList.toggle('hidden', !show);
  }
}

function clearQuestionCache(id) {
  if (id) {
    localStorage.removeItem(getCacheKey(id));
    localStorage.removeItem(LEGACY_CACHE_PREFIX + id);
  } else {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_PREFIX) || key.startsWith(LEGACY_CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
  sessionStorage.removeItem('question_data_version');
}

window.clearQuestionCache = clearQuestionCache;

function normalizeQuestionPayload(apiData) {
  return {
    question: apiData.question,
    expanded: apiData.expanded,
    version: apiData.version,
    questionsList: apiData.questionsList || []
  };
}

function renderQuestionPayload(payload, areaUrl, id, useCache) {
  configureArea(areaUrl);
  spawnBackgroundIcons(areaUrl);
  renderQuestion(payload.question, areaUrl, payload.expanded);
  setupNavigation(areaUrl, id, payload.question.subject, payload.questionsList, useCache);
  showCacheStatus(useCache);
}

async function fetchQuestionPayload(id, areaUrl, forceRefresh) {
  const url = '../api/question_complete.php?id=' + id +
    '&area=' + encodeURIComponent(areaUrl) +
    (forceRefresh ? '&refresh=1' : '');
  const response = await fetch(url, { cache: forceRefresh ? 'reload' : 'no-cache' });
  if (!response.ok) throw new Error('API Error');
  return await response.json();
}

function shouldRenderFresh(cached, fresh) {
  if (!cached) return true;
  if (!cached.questionsList || cached.questionsList.length === 0) return true;
  if (!cached.version || !fresh.version) return true;
  return cached.version.question !== fresh.version.question ||
         cached.version.justificacion !== fresh.version.justificacion;
}

async function loadQuestion(id, areaUrl, isPreload) {
  const content = document.getElementById('questionContent');
  const forceRefresh = !isPreload && (new URLSearchParams(location.search).get('refresh') === '1');

  if (!isPreload && window.configureArea) {
    window.configureArea(areaUrl);
  }
  if (!isPreload) {
    content.innerHTML = `
      <div class="learning-shell">
        <div class="learning-main space-y-4">
          <div class="learning-card learning-card--soft loading-skeleton h-20"></div>
          <div class="learning-card loading-skeleton h-32"></div>
          <div class="learning-card learning-card--question loading-skeleton h-40"></div>
          <div class="learning-card loading-skeleton h-64"></div>
        </div>
        <aside class="learning-aside space-y-4">
          <div class="side-card loading-skeleton h-32"></div>
          <div class="side-card loading-skeleton h-32"></div>
          <div class="side-card loading-skeleton h-32"></div>
          <div class="side-card loading-skeleton h-32"></div>
        </aside>
      </div>
    `;
  }

  let renderedFromCache = false;
  const cached = !forceRefresh ? getCachedQuestion(id) : null;

  try {
    if (cached && cached.question && !forceRefresh) {
      renderQuestionPayload(cached, areaUrl, id, true);
      renderedFromCache = true;
    }

    let apiData;
    if (window._preloadCache && window._preloadCache.id === id && !forceRefresh) {
      apiData = window._preloadCache.data;
      window._preloadCache = null;
    } else {
      apiData = await fetchQuestionPayload(id, areaUrl, forceRefresh);
    }

    if (apiData.error) {
      if (!renderedFromCache) {
        content.innerHTML = '<p class="text-center text-red-600 p-8">Pregunta no encontrada.</p>';
      }
      return false;
    }

    const freshPayload = normalizeQuestionPayload(apiData);

    if (!forceRefresh) {
      setCachedQuestion(id, freshPayload, freshPayload.version);
    }

    if (forceRefresh || shouldRenderFresh(cached, freshPayload)) {
      renderQuestionPayload(freshPayload, areaUrl, id, false);
    } else {
      showCacheStatus(false);
    }

    return true;
  } catch (e) {
    console.error('Error:', e);
    if (!renderedFromCache) {
      content.innerHTML = '<p class="text-center text-red-600 p-8">Error al cargar la pregunta.</p>';
    }
    return false;
  }
}

window.loadQuestion = loadQuestion;

async function initJustification() {
  // Clean up old caches that don't have customName
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('qc_v2_') || key.startsWith('qc_'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch (e) {}
  
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const areaUrl = params.get('area') || 'mat';

  if (!id) {
    document.getElementById('questionContent').innerHTML =
      '<p class="text-center text-red-600 p-8">Falta ID de pregunta. URL: ' + location.href + '</p>';
    return;
  }

  await loadQuestion(id, areaUrl, false);
  if (window.ensureQuestionVisible) {
    window.ensureQuestionVisible(id);
  }
}
