/*
 * sidebar.js
 * Busqueda y navegacion lateral de preguntas - optimizado con paginacion y SPA.
 */

const ITEMS_PER_PAGE = 50;
let sidebarQuestions = [];
let sidebarFiltered = [];
let sidebarCollapsed = false;
let visibleCount = ITEMS_PER_PAGE;
let currentQuestionId = null;
let isSearchActive = false;

function normalizeText(str) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function ensureQuestionVisible(questionId) {
  const idx = sidebarFiltered.findIndex(q => q.id === questionId);
  if (idx === -1) return;
  const pagePosition = Math.floor(idx / ITEMS_PER_PAGE) + 1;
  const requiredVisible = pagePosition * ITEMS_PER_PAGE;
  if (requiredVisible > visibleCount) {
    visibleCount = requiredVisible;
    renderSidebar(sidebarFiltered, currentQuestionId, window._currentArea || 'mat');
  }
  setTimeout(function() {
    const container = document.getElementById('sidebarQuestions');
    const activeLink = container.querySelector('a[data-question-id="' + questionId + '"]');
    if (activeLink) {
      activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

function filterSidebarQuestions(searchTerm) {
  const term = normalizeText(searchTerm.trim());
  isSearchActive = !!term;
  
  if (!term) {
    sidebarFiltered = [...sidebarQuestions];
  } else {
    sidebarFiltered = sidebarQuestions.filter(q => {
      const searchFields = [
        q.text || '',
        ...(q.options || [])
      ].join(' ');
      return normalizeText(searchFields).includes(term);
    });
  }
  
  visibleCount = ITEMS_PER_PAGE;
  renderSidebar(sidebarFiltered, currentQuestionId, window._currentArea || 'mat');
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
  const toRender = questions.slice(0, visibleCount);
  
  container.innerHTML = toRender.map(q => {
    const isActive = q.id === currentId;
    const preview = q.text ? q.text.replace(/<[^>]+>/g, '').trim().substring(0, 70) : 'Sin texto';
    const truncated = preview.length >= 70 ? preview + '...' : preview;
    return `
      <a href="justification.php?area=${area}&id=${q.id}" 
         data-question-id="${q.id}"
         data-question-area="${area}"
         class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-sm ${isActive ? 'bg-' + areaColor + ' text-white font-semibold shadow-sm' : 'text-gray-700 hover:bg-' + areaColor + '/10 hover:text-' + areaColor}">
        <span class="text-xs ${isActive ? 'opacity-80' : 'text-gray-400'} font-mono">#${q.id}</span>
        <span class="line-clamp-2 text-xs sidebar-full-content">${truncated}</span>
      </a>
    `;
  }).join('');
  
  const loadMoreContainer = document.getElementById('sidebarLoadMore');
  const showLoadMore = !isSearchActive && questions.length > visibleCount;
  if (showLoadMore) {
    if (!loadMoreContainer) {
      const wrapper = document.createElement('div');
      wrapper.id = 'sidebarLoadMore';
      wrapper.innerHTML = `
        <button onclick="loadMoreSidebar()" class="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition">
          <i class="fas fa-chevron-down mr-1"></i> Cargar más (${questions.length - visibleCount} restantes)
        </button>
      `;
      container.appendChild(wrapper);
    } else {
      loadMoreContainer.querySelector('button').innerHTML = `
        <i class="fas fa-chevron-down mr-1"></i> Cargar más (${questions.length - visibleCount} restantes)
      `;
    }
  } else if (loadMoreContainer) {
    loadMoreContainer.remove();
  }
}

function updateSidebarActive(id) {
  const links = document.querySelectorAll('#sidebarQuestions a[data-question-id]');
  links.forEach(link => {
    const linkId = parseInt(link.dataset.questionId);
    const area = link.dataset.questionArea || 'mat';
    const areaColor = getAreaColorClass(area);
    if (linkId === id) {
      link.className = `flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-sm bg-${areaColor} text-white font-semibold shadow-sm`;
    } else {
      link.className = `flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-sm text-gray-700 hover:bg-${areaColor}/10 hover:text-${areaColor}`;
    }
  });
}

window.updateSidebarActive = updateSidebarActive;

function loadMoreSidebar() {
  visibleCount += ITEMS_PER_PAGE;
  renderSidebar(sidebarFiltered, currentQuestionId, window._currentArea || 'mat');
}

window.loadMoreSidebar = loadMoreSidebar;

window.ensureQuestionVisible = ensureQuestionVisible;

function getAreaColorClass(area) {
  const colorMap = { mat: 'mat', lc: 'lc', cn: 'cn', cc: 'soc', soc: 'soc', en: 'ing' };
  return colorMap[area] || 'mat';
}

function setupNavigation(area, currentId, subject, questionsList, useCache) {
  window._currentArea = area;
  currentQuestionId = currentId;
  isSearchActive = false;
  
  try {
    if (questionsList && Array.isArray(questionsList)) {
      sidebarQuestions = questionsList;
      sidebarFiltered = [...questionsList];
    } else {
      console.warn('No hay listado de preguntas');
      return;
    }
    
    visibleCount = ITEMS_PER_PAGE;
    
    const navArea = document.getElementById('navArea');
    if (navArea) {
      navArea.href = 'area.php?area=' + area;
    }
    
    renderSidebar(sidebarFiltered, currentId, area);
    ensureQuestionVisible(currentId);
    
    const searchInput = document.getElementById('sidebarSearch');
    if (searchInput) {
      searchInput.oninput = function() {
        filterSidebarQuestions(this.value);
      };
    }

    const sidebarContainer = document.getElementById('sidebarQuestions');
    if (sidebarContainer && !sidebarContainer.dataset.listenersAttached) {
      sidebarContainer.addEventListener('click', async function(e) {
        const link = e.target.closest('a[data-question-id]');
        if (!link) return;
        e.preventDefault();
        const newId = parseInt(link.dataset.questionId);
        const newArea = link.dataset.questionArea || area;
        if (newId === currentQuestionId) return;
        
        currentQuestionId = newId;
        window.ensureQuestionVisible(newId);
        
        history.pushState({id: newId, area: newArea}, '', 'justification.php?id=' + newId + '&area=' + newArea);
        await window.loadQuestion(newId, newArea, false);
      });

      sidebarContainer.addEventListener('mouseenter', function(e) {
        const link = e.target.closest('a[data-question-id]');
        if (!link) return;
        const preloadId = parseInt(link.dataset.questionId);
        const preloadArea = link.dataset.questionArea || area;
        if (preloadId === currentQuestionId) return;
        if (window._preloadCache && window._preloadCache.id === preloadId) return;
        fetch('../api/question_complete.php?id=' + preloadId + '&area=' + encodeURIComponent(preloadArea), {cache: 'force-cache'})
          .then(r => r.json())
          .then(d => {
            window._preloadCache = {id: preloadId, data: d};
          })
          .catch(() => {});
      }, true);

      sidebarContainer.dataset.listenersAttached = 'true';
    }
  } catch (e) {
    console.error('Navigation error:', e);
  }
}

window.addEventListener('popstate', function(e) {
  if (e.state && e.state.id) {
    currentQuestionId = e.state.id;
    window.ensureQuestionVisible(e.state.id);
    window.loadQuestion(e.state.id, e.state.area || 'mat', false);
  }
});

window.setupNavigation = setupNavigation;
