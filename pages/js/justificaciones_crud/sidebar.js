const ITEMS_PER_PAGE = 15;
let sidebarQuestions = [];
let sidebarFiltered = [];
let currentArea = 'mat';
let visibleCount = ITEMS_PER_PAGE;
let currentQuestionId = null;
let isSearchActive = false;

const AREA_CONFIG = {
  mat: { name: 'Matemáticas', icon: 'fa-calculator', color: 'bg-mat', colorLight: 'bg-mat-light', text: 'text-mat' },
  lc: { name: 'Lenguaje', icon: 'fa-book', color: 'bg-lc', colorLight: 'bg-lc-light', text: 'text-lc' },
  cn: { name: 'Ciencias Naturales', icon: 'fa-flask', color: 'bg-cn', colorLight: 'bg-cn-light', text: 'text-cn' },
  soc: { name: 'Ciencias Sociales', icon: 'fa-globe', color: 'bg-cc', colorLight: 'bg-cc-light', text: 'text-cc' },
  ing: { name: 'Inglés', icon: 'fa-language', color: 'bg-ing', colorLight: 'bg-ing-light', text: 'text-ing' }
};

function normalizeText(str) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function getAreaColorClass(area) {
  return AREA_CONFIG[area] ? area : 'mat';
}

function getAreaTextClass(area) {
  const config = AREA_CONFIG[area];
  return config ? config.text : 'text-mat';
}

async function loadQuestionsForArea(area) {
  currentArea = area;
  visibleCount = ITEMS_PER_PAGE;
  isSearchActive = false;
  
  updateAreaUI(area);
  document.getElementById('sidebarQuestions').innerHTML = '<p class="text-xs text-gray-400 text-center py-4">Cargando preguntas...</p>';
  
  try {
    const response = await fetch(API_QUESTION + '?subject=' + area + '&summary=true');
    const data = await response.json();
    
    if (Array.isArray(data)) {
      sidebarQuestions = data;
      sidebarFiltered = [...data];
    } else if (data.questions) {
      sidebarQuestions = data.questions;
      sidebarFiltered = [...data.questions];
    } else {
      sidebarQuestions = [];
      sidebarFiltered = [];
    }
    
    renderSidebar();
  } catch (e) {
    console.error('Error loading questions:', e);
    document.getElementById('sidebarQuestions').innerHTML = '<p class="text-xs text-red-400 text-center py-4">Error al cargar</p>';
  }
}

function updateAreaUI(area) {
  const config = AREA_CONFIG[area] || AREA_CONFIG.mat;
  const header = document.getElementById('sidebarHeader');
  const icon = document.getElementById('sidebarIcon');
  const iconCollapsed = document.getElementById('sidebarIconCollapsed');
  
  header.className = 'p-5 text-white ' + config.color + ' transition-colors duration-300';
  icon.className = 'fas ' + config.icon + ' text-3xl opacity-90 mb-3 block';
  iconCollapsed.className = 'fas ' + config.icon + ' text-2xl opacity-90 hidden';
  
  document.querySelectorAll('#areaSelector .area-pill').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.area === area) {
      btn.classList.add('active');
    }
  });
  
  document.body.setAttribute('data-area', area);
}

function filterSidebarQuestions(searchTerm) {
  const term = normalizeText(searchTerm.trim());
  isSearchActive = !!term;
  
  if (!term) {
    sidebarFiltered = [...sidebarQuestions];
  } else {
    sidebarFiltered = sidebarQuestions.filter(q => {
      const searchFields = [q.text || '', q.context || ''].join(' ');
      return normalizeText(searchFields).includes(term);
    });
  }
  
  visibleCount = ITEMS_PER_PAGE;
  renderSidebar();
}

function renderSidebar() {
  const container = document.getElementById('sidebarQuestions');
  if (!container) return;
  
  const toRender = sidebarFiltered.slice(0, visibleCount);
  
  if (toRender.length === 0) {
    container.innerHTML = '<p class="text-xs text-gray-400 text-center py-4">No hay preguntas</p>';
    return;
  }
  
  container.innerHTML = toRender.map(q => {
    const isActive = q.id === currentQuestionId;
    const preview = q.text ? q.text.replace(/<[^>]+>/g, '').trim().substring(0, 60) : 'Sin texto';
    const truncated = preview.length >= 60 ? preview + '...' : preview;
    const areaConfig = AREA_CONFIG[currentArea] || AREA_CONFIG.mat;
    const activeClass = isActive 
      ? areaConfig.color + ' text-white font-semibold shadow-sm border-l-4 border-white' 
      : 'text-gray-700 hover:' + areaConfig.colorLight + ' ' + areaConfig.text;
    
    return `
      <a href="#" data-question-id="${q.id}" class="question-item flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${activeClass}">
        <span class="text-xs ${isActive ? 'opacity-90' : 'text-gray-400'} font-mono">#${q.id}</span>
        <span class="line-clamp-2 text-xs sidebar-full-content">${truncated}</span>
      </a>
    `;
  }).join('');
  
  const loadMoreContainer = document.getElementById('sidebarLoadMore');
  const showLoadMore = !isSearchActive && sidebarFiltered.length > visibleCount;
  
  if (showLoadMore) {
    if (!loadMoreContainer) {
      const wrapper = document.createElement('div');
      wrapper.id = 'sidebarLoadMore';
      wrapper.innerHTML = `
        <button onclick="loadMoreSidebar()" class="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition">
          <i class="fas fa-chevron-down mr-1"></i> Cargar más (${sidebarFiltered.length - visibleCount} restantes)
        </button>
      `;
      container.appendChild(wrapper);
    } else {
      loadMoreContainer.querySelector('button').innerHTML = `
        <i class="fas fa-chevron-down mr-1"></i> Cargar más (${sidebarFiltered.length - visibleCount} restantes)
      `;
    }
  } else if (loadMoreContainer) {
    loadMoreContainer.remove();
  }
}

function loadMoreSidebar() {
  visibleCount += ITEMS_PER_PAGE;
  renderSidebar();
}

window.loadMoreSidebar = loadMoreSidebar;

function selectQuestionFromSidebar(questionId) {
  currentQuestionId = questionId;
  setVal('inputId', questionId);
  cargarPregunta();
  renderSidebar();
}

window.selectQuestionFromSidebar = selectQuestionFromSidebar;

function initSidebar() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlArea = urlParams.get('area');
  const initialArea = urlArea && AREA_CONFIG[urlArea] ? urlArea : 'mat';
  
  const areaButtons = document.querySelectorAll('#areaSelector .area-pill');
  areaButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const area = this.dataset.area;
      if (area !== currentArea) {
        loadQuestionsForArea(area);
      }
    });
  });
  
  const searchInput = document.getElementById('sidebarSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterSidebarQuestions(this.value);
    });
  }
  
  const questionsContainer = document.getElementById('sidebarQuestions');
  if (questionsContainer) {
    questionsContainer.addEventListener('click', function(e) {
      const link = e.target.closest('a[data-question-id]');
      if (link) {
        e.preventDefault();
        const id = parseInt(link.dataset.questionId);
        selectQuestionFromSidebar(id);
      }
    });
  }
  
  loadQuestionsForArea(initialArea);
}

function updateSidebarSelection(questionId, area) {
  currentQuestionId = questionId;
  if (area && area !== currentArea) {
    loadQuestionsForArea(area).then(function() {
      renderSidebar();
    });
  } else {
    renderSidebar();
  }
}

window.updateSidebarSelection = updateSidebarSelection;

window.addEventListener('DOMContentLoaded', initSidebar);