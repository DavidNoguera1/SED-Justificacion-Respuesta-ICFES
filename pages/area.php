<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Área — Apoyo ICFES</title>
  <link rel="stylesheet" href="../shared/css/variables.css?v=20260428_perf_1">
  <link rel="stylesheet" href="../shared/css/base.css?v=20260428_perf_1">
  <link rel="stylesheet" href="../shared/css/layout.css?v=20260428_perf_1">
  <link rel="stylesheet" href="../shared/css/components.css?v=20260428_perf_1">
  <link rel="stylesheet" href="../shared/css/backgrounds.css?v=20260428_perf_1">
  <link rel="stylesheet" href="css/area.css?v=20260428_perf_1">
</head>
<body>

  <div class="bg-canvas" aria-hidden="true"></div>

  <header class="site-header">
    <div class="container">
<a href="../index.php" style="text-decoration:none;">
        <h1 class="site-title">Apoyo ICFES</h1>
      </a>
      <p class="site-subtitle">Entiende el <em>por qué</em> de cada respuesta</p>
    </div>
  </header>

  <nav class="breadcrumb container" aria-label="Navegación">
    <a href="../index.php">Inicio</a>
    <span aria-hidden="true">›</span>
    <span id="breadcrumb-area">Área</span>
  </nav>

  <main class="container" style="position:relative; z-index:1;">
    <section class="area-list">
      <h2 class="section-title" id="area-title">Preguntas</h2>
      <div class="filter-bar" id="filter-bar" style="display:none;">
        <span class="filter-bar__label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filtrar por
        </span>
        <div class="filter-group" id="fg-search">
          <label for="filter-search">Buscar</label>
          <input type="text" id="filter-search" class="filter-input" placeholder="Texto de pregunta...">
        </div>
        <div class="filter-group" id="fg-competency" style="display:none;">
          <label for="filter-competency">Competencia</label>
          <select id="filter-competency" class="filter-select">
            <option value="">Todas</option>
          </select>
        </div>
        <div class="filter-group" id="fg-level" style="display:none;">
          <label for="filter-level">Nivel</label>
          <select id="filter-level" class="filter-select">
            <option value="">Todos</option>
          </select>
        </div>
        <div class="filter-group" id="fg-component" style="display:none;">
          <label for="filter-component">Componente</label>
          <select id="filter-component" class="filter-select">
            <option value="">Todos</option>
          </select>
        </div>
        <button id="clear-filters" class="filter-clear-btn" style="display:none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Limpiar
        </button>
      </div>
      <div class="pagination" id="pagination-top" style="display:none;">
        <span id="page-info-top" class="pagination-info">Página 1 de 1</span>
        <div class="pagination-controls">
          <button id="prev-page-top" class="pagination-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Anterior
          </button>
          <div id="page-numbers-top" class="page-numbers"></div>
          <button id="next-page-top" class="pagination-btn" disabled>
            Siguiente
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
      <div class="question-list" id="question-list">
        <p class="text-soft">Cargando...</p>
      </div>
      <div class="pagination" id="pagination-bottom" style="display:none;">
        <span id="page-info-bottom" class="pagination-info">Página 1 de 1</span>
        <div class="pagination-controls">
          <button id="prev-page-bottom" class="pagination-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Anterior
          </button>
          <div id="page-numbers-bottom" class="page-numbers"></div>
          <button id="next-page-bottom" class="pagination-btn" disabled>
            Siguiente
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>Material de apoyo pedagógico — No oficial</p>
  </footer>

  <script>
    const ITEMS_PER_PAGE = 15;
    let currentPage = 1;
    let totalPages = 1;
    let filteredQuestions = [];
    const APP_VERSION = '20260428_perf_1';
    const AREA_CACHE_PREFIX = 'area_summary_v2_';
    const AREA_CACHE_TTL = 1000 * 60 * 5;
    
    const AREA_NAMES = {
      mat: 'Matemáticas',
      lc: 'Lectura Crítica',
      cn: 'Ciencias Naturales',
      cc: 'Competencias Ciudadanas',
      soc: 'Competencias Ciudadanas',
      en: 'Inglés',
      ing: 'Inglés'
    };
    
    const AREA_SUBJECT = {
      mat: 'mat',
      lc: 'lc',
      cn: 'cn',
      cc: 'soc',
      soc: 'soc',
      en: 'ing',
      ing: 'ing'
    };
    
    const AREA_ICONS = {
      mat: ['∑', '∫', 'π', '√', '≈', 'Δ', 'Ω', 'λ', '∞'],
      lc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      cn: ['⚛', '🧬', '🔬', '🧪', '🌿', '⚡', '🔥', '💧', '🌊'],
      cc: ['⚖️', '🤝', '🗳️', '🗣️', '📢', '👥', '👤', '🏛️', '🛡️'],
      en: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      ing: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    };
    
    function truncate(str, len) {
      if (!str || str.length <= len) return str;
      return str.substring(0, len).trim() + '...';
    }
    
    function removeAccents(str) {
      if (!str) return '';
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    
    function normalizeText(str) {
      if (!str) return '';
      return removeAccents(str).toLowerCase();
    }
    
    function spawnBackgroundIcons(area) {
      const canvas = document.querySelector('.bg-canvas');
      if (!canvas) return;
      const cached = sessionStorage.getItem('bg_icons_' + area);
      if (cached) {
        canvas.innerHTML = cached;
        return;
      }
      canvas.innerHTML = '';
      const icons = AREA_ICONS[area] || AREA_ICONS.mat;
      for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.className = 'hero-bg-item';
        el.textContent = icons[i % icons.length];
        el.style.cssText = 'top: ' + (Math.random() * 90 + 5) + '%; left: ' + (Math.random() * 90 + 5) + '%; font-size: ' + (35 + Math.random() * 55) + 'px; animation-delay: ' + (Math.random() * 5) + 's; animation-duration: ' + (12 + Math.random() * 12) + 's;';
        canvas.appendChild(el);
      }
      try { sessionStorage.setItem('bg_icons_' + area, canvas.innerHTML); } catch(e) {}
    }
    
    async function fetchFromAPI(url) {
      try {
        const separator = url.includes('?') ? '&' : '?';
        const response = await fetch(url + separator + 'v=' + encodeURIComponent(APP_VERSION), { cache: 'no-cache' });
        if (!response.ok) throw new Error('API Error');
        return await response.json();
      } catch (e) {
        console.error('Error fetching:', e);
        return null;
      }
    }
    
    function populateSelect(id, values) {
      const select = document.getElementById(id);
      select.innerHTML = '<option value="">Todos</option>';
      values.forEach(val => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        select.appendChild(opt);
      });
    }

    function getAreaCacheKey(subject) {
      return AREA_CACHE_PREFIX + subject;
    }

    function getCachedAreaData(subject) {
      try {
        const raw = localStorage.getItem(getAreaCacheKey(subject));
        if (!raw) return null;
        const cached = JSON.parse(raw);
        if (!cached.expiry || Date.now() > cached.expiry) {
          localStorage.removeItem(getAreaCacheKey(subject));
          return null;
        }
        return cached.payload;
      } catch (e) {
        localStorage.removeItem(getAreaCacheKey(subject));
        return null;
      }
    }

    function setCachedAreaData(subject, payload) {
      try {
        localStorage.setItem(getAreaCacheKey(subject), JSON.stringify({
          payload,
          expiry: Date.now() + AREA_CACHE_TTL
        }));
      } catch (e) {}
    }

    function normalizeAreaPayload(data) {
      if (!data) {
        return { questions: [], uniqueFields: null };
      }
      if (Array.isArray(data)) {
        return { questions: data, uniqueFields: null };
      }
      return {
        questions: Array.isArray(data.questions) ? data.questions : [],
        uniqueFields: data.uniqueFields || null
      };
    }
    
    function renderQuestions(page, onComplete) {
      const list = document.getElementById('question-list');
      
      if (filteredQuestions.length === 0) {
        list.innerHTML = '<p class="text-soft">No hay preguntas para esta área.</p>';
        updatePagination();
        if (onComplete) onComplete();
        return;
      }
      
      filteredQuestions.sort((a, b) => a.id - b.id);
      totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE) || 1;
      currentPage = Math.min(page, totalPages);
      
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const pageQuestions = filteredQuestions.slice(start, end);
      
      const fragment = document.createDocumentFragment();
      
      pageQuestions.forEach(function(q) {
        const item = document.createElement('a');
        item.href = 'justification.php?id=' + q.id + '&area=' + currentArea;
        item.className = 'question-list-item';
        const qtext = q.text || 'Pregunta #' + q.id;
        item.innerHTML = '<span class="qli-id">#' + q.id + '</span><p class="qli-text">' + truncate(qtext, 80) + '</p><span class="qli-arrow">→</span>';
        fragment.appendChild(item);
      });
      
      list.innerHTML = '';
      list.appendChild(fragment);
      
      updatePagination();
      if (onComplete) onComplete();
    }
    
    function updatePagination() {
      const paginations = [
        { top: true, bottom: false },
        { top: false, bottom: true }
      ];
      
      if (totalPages <= 1) {
        document.getElementById('pagination-top').style.display = 'none';
        document.getElementById('pagination-bottom').style.display = 'none';
        return;
      }
      
      const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
      const end = Math.min(currentPage * ITEMS_PER_PAGE, filteredQuestions.length);
      const infoText = 'Página ' + currentPage + ' de ' + totalPages + ' (' + start + '-' + end + ' de ' + filteredQuestions.length + ' preguntas)';
      
      paginations.forEach(function(p) {
        const prefix = p.top ? 'top' : 'bottom';
        const pagination = document.getElementById('pagination-' + prefix);
        const prevBtn = document.getElementById('prev-page-' + prefix);
        const nextBtn = document.getElementById('next-page-' + prefix);
        const pageInfo = document.getElementById('page-info-' + prefix);
        const pageNumbers = document.getElementById('page-numbers-' + prefix);
        
        pagination.style.display = 'flex';
        pageInfo.textContent = infoText;
        prevBtn.disabled = currentPage <= 1;
        nextBtn.disabled = currentPage >= totalPages;
        
        renderPageNumbers(pageNumbers, prefix);
      });
    }
    
    function renderPageNumbers(container, prefix) {
      container.innerHTML = '';
      const maxVisible = 7;
      const pages = [];
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        if (currentPage > 3) pages.push('...');
        
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = start; i <= end; i++) pages.push(i);
        
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
      }
      
      pages.forEach(function(p) {
        if (p === '...') {
          const ellipsis = document.createElement('span');
          ellipsis.className = 'page-ellipsis';
          ellipsis.textContent = '...';
          container.appendChild(ellipsis);
        } else {
          const btn = document.createElement('button');
          btn.className = 'page-number' + (p === currentPage ? ' active' : '');
          btn.textContent = p;
          btn.addEventListener('click', function() { goToPage(p); });
          container.appendChild(btn);
        }
      });
    }
    
    function goToPage(page) {
      currentPage = page;
      renderQuestions(currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    window.goToPage = goToPage;
    
    let currentArea = 'mat';
    let currentSubject = 'mat';
    let allQuestions = [];
    
    function applyFilters() {
      const competency = document.getElementById('filter-competency').value;
      const level = document.getElementById('filter-level').value;
      const component = document.getElementById('filter-component').value;
      
      const searchTerm = normalizeText(document.getElementById('filter-search').value.trim());
      
      filteredQuestions = allQuestions.filter(q => {
        const searchFields = q.searchText || [q.text || '', q.context || '', ...(q.options || [])].join(' ');
        if (searchTerm && !normalizeText(searchFields).includes(searchTerm)) {
          return false;
        }
        if (competency && q.competency !== competency) return false;
        if (level && q.level !== level) return false;
        if (component && q.component !== component) return false;
        return true;
      });
      
      currentPage = 1;
      renderQuestions(currentPage);
    }
    
    async function loadUniqueValues(uniqueFields) {
      const data = uniqueFields || await fetchFromAPI('../api/questions.php?subject=' + currentSubject + '&uniqueFields=1');
      if (!data) return;
      
      const fields = ['competency', 'level', 'component'];
      let hasFilters = false;
      
      fields.forEach(field => {
        const group = document.getElementById('fg-' + field);
        if (data[field] && data[field].length > 0) {
          populateSelect('filter-' + field, data[field]);
          group.style.display = '';
          hasFilters = true;
        } else {
          group.style.display = 'none';
        }
      });
      
      document.getElementById('fg-search').style.display = '';
      document.getElementById('filter-bar').style.display = hasFilters ? '' : 'none';
      document.getElementById('clear-filters').style.display = hasFilters ? '' : 'none';
    }

    async function hydrateAreaData(payload, fromCache) {
      allQuestions = payload.questions;
      filteredQuestions = allQuestions;
      
      renderQuestions(currentPage, function() {
        if (payload.uniqueFields) {
          loadUniqueValues(payload.uniqueFields);
        } else if (!fromCache) {
          loadUniqueValues();
        }
      });
    }
    
    (async function() {
      const params = new URLSearchParams(location.search);
      currentArea = params.get('area') || 'mat';
      currentSubject = AREA_SUBJECT[currentArea] || currentArea;
      
      document.body.dataset.area = currentArea;
      document.getElementById('breadcrumb-area').textContent = AREA_NAMES[currentArea] || currentArea;
      document.getElementById('area-title').textContent = 'Preguntas de ' + (AREA_NAMES[currentArea] || currentArea);
      
      spawnBackgroundIcons(currentArea);
      
      const cachedAreaData = getCachedAreaData(currentSubject);
      if (cachedAreaData) {
        await hydrateAreaData(cachedAreaData, true);
      }

      const apiPayload = normalizeAreaPayload(await fetchFromAPI('../api/questions.php?subject=' + currentSubject + '&summary=1&withFields=1'));
      if (apiPayload.questions.length > 0 || cachedAreaData) {
        if (apiPayload.questions.length > 0) {
          setCachedAreaData(currentSubject, apiPayload);
          await hydrateAreaData(apiPayload, false);
        }
      } else {
        document.getElementById('question-list').innerHTML = '<p class="text-soft">Error al cargar preguntas.</p>';
      }
      
      document.getElementById('filter-competency').addEventListener('change', applyFilters);
      document.getElementById('filter-level').addEventListener('change', applyFilters);
      document.getElementById('filter-component').addEventListener('change', applyFilters);
      document.getElementById('filter-search').addEventListener('input', applyFilters);
      
      document.getElementById('prev-page-top').addEventListener('click', function() {
        if (currentPage > 1) goToPage(currentPage - 1);
      });
      document.getElementById('next-page-top').addEventListener('click', function() {
        if (currentPage < totalPages) goToPage(currentPage + 1);
      });
      document.getElementById('prev-page-bottom').addEventListener('click', function() {
        if (currentPage > 1) goToPage(currentPage - 1);
      });
      document.getElementById('next-page-bottom').addEventListener('click', function() {
        if (currentPage < totalPages) goToPage(currentPage + 1);
      });
      
      document.getElementById('clear-filters').addEventListener('click', function() {
        document.getElementById('filter-competency').value = '';
        document.getElementById('filter-level').value = '';
        document.getElementById('filter-component').value = '';
        document.getElementById('filter-search').value = '';
        applyFilters();
      });
    })();
  </script>
</body>
</html>
