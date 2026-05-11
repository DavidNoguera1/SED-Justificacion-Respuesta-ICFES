<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Análisis de Pregunta</title>
  <link rel="preconnect" href="https://cdn.tailwindcss.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link rel="stylesheet" href="../shared/css/variables.css?v=20260428_perf_1">
  <link rel="stylesheet" href="css/justification.css?v=20260428_perf_1">
  <link rel="stylesheet" href="../shared/css/backgrounds.css?v=20260428_perf_1">
  <style>
    body { position: relative; }
    .bg-canvas { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
    .hero-bg-item { position: absolute; opacity: 0.06; color: var(--area-accent); font-family: var(--font-display); font-weight: 700; animation: float-icon 15s ease-in-out infinite; user-select: none; }
    @keyframes float-icon { 0% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-16px) rotate(4deg); } 66% { transform: translateY(-6px) rotate(-3deg); } 100% { transform: translateY(0px) rotate(0deg); } }
    #mainContent { position: relative; z-index: 1; }
    /* Critical inline styles for fast first paint */
    #questionContent { min-height: 50vh; }
    .loading-skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    .area-pill { padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; transition: all 0.2s ease; cursor: pointer; }
    .area-pill:hover { transform: scale(1.05); }
    .area-pill.active { box-shadow: 0 0 0 2px white, 0 0 0 4px currentColor; }
  </style>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            mat: { light: '#e8eef5', DEFAULT: '#1a3a5c', dark: '#1a3a5c' },
            lc: { light: '#ede8ff', DEFAULT: '#5b3fa0', dark: '#5b3fa0' },
            cn: { light: '#d4f0e2', DEFAULT: '#1e8a4a', dark: '#1e8a4a' },
            ing: { light: '#fde8e6', DEFAULT: '#c0392b', dark: '#c0392b' },
            cc: { light: '#fef3d7', DEFAULT: '#e8a020', dark: '#e8a020' },
            soc: { light: '#fef3d7', DEFAULT: '#e8a020', dark: '#e8a020' },
          }
        }
      }
    }
  </script>
</head>
<body class="bg-gray-100 text-gray-800 font-sans antialiased" data-area="mat">
  <div class="bg-canvas" aria-hidden="true"></div>

  <!-- Sidebar de navegación izquierda -->
  <aside id="questionSidebar" class="fixed top-0 left-0 h-full w-72 flex flex-col z-30 transition-all duration-300">
    <div class="flex flex-col h-full">
      <!-- Header de área -->
      <div id="sidebarHeader" class="p-5 text-white bg-mat-dark transition-colors duration-300">
        <div class="flex items-start justify-between">
          <div id="sidebarFull" class="transition-all duration-300">
            <i id="sidebarIcon" class="fas fa-calculator text-3xl opacity-90 mb-3 block"></i>
            <span id="sidebarAreaName" class="text-xs font-bold uppercase tracking-wider opacity-80">Matemáticas</span>
            <h2 class="text-lg font-extrabold mt-1">Análisis ICFES</h2>
          </div>
          <div class="flex flex-col items-end gap-4">
            <i id="sidebarIconCollapsed" class="fas fa-calculator text-2xl opacity-90 hidden"></i>
            <button id="toggleCollapse" class="p-2 rounded-lg hover:bg-white/20 transition text-white/80 hover:text-white" title="Colapsar">
              <i class="fas fa-chevron-left"></i>
            </button>
          </div>
        </div>
        <div class="space-y-2 mt-4">
          <a href="../index.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/20 transition text-sm font-medium">
            <i class="fas fa-home w-5 text-center"></i>
            <span class="sidebar-text">Inicio</span>
          </a>
          <a id="navArea" href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/20 transition text-sm font-medium">
            <i class="fas fa-folder w-5 text-center"></i>
            <span class="sidebar-text">Ver Área</span>
          </a>
        </div>
      </div>
      
      <!-- Selector de áreas -->
      <div class="p-2 border-b border-gray-200 bg-gray-50 sidebar-text">
        <div class="flex flex-wrap gap-1" id="areaSelector">
          <button class="area-pill bg-mat text-white active" data-area="mat">MAT</button>
          <button class="area-pill bg-lc text-white" data-area="lc">LC</button>
          <button class="area-pill bg-cn text-white" data-area="cn">CN</button>
          <button class="area-pill bg-cc text-white" data-area="soc">CC</button>
          <button class="area-pill bg-ing text-white" data-area="ing">ING</button>
        </div>
      </div>
      
      <!-- Lista de preguntas -->
      <div id="sidebarQuestionsWrapper" class="flex-1 overflow-y-auto bg-gray-50 p-3 transition-all duration-300">
        <div class="sidebar-full-content transition-all duration-300">
          <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            <i class="fas fa-list-ol mr-1"></i> <span class="sidebar-text">Preguntas</span>
          </div>
          <div class="px-2 mb-3">
            <input type="text" id="sidebarSearch" class="w-full text-xs px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Buscar...">
          </div>
        </div>
        <div id="sidebarQuestions" class="space-y-1">
        </div>
      </div>
    </div>
  </aside>

  <!-- Sidebar de información derecha (ocultable) -->
  <aside id="infoSidebar" class="fixed top-0 right-0 h-full w-80 flex flex-col z-30 transition-all duration-300">
    <div class="flex flex-col h-full bg-gray-50 border-l border-gray-200">
      <div id="infoSidebarHeader" class="p-4 bg-mat-dark text-white transition-colors duration-300">
        <div class="flex items-start justify-between">
          <div id="infoSidebarFull" class="transition-all duration-300">
            <span class="text-xs font-bold uppercase tracking-wider opacity-80">Información</span>
            <h2 class="text-lg font-extrabold mt-1">Recursos</h2>
          </div>
          <div class="flex flex-col items-end gap-4">
            <i id="infoSidebarIconCollapsed" class="fas fa-info-circle text-2xl opacity-90 hidden"></i>
            <button id="toggleInfoCollapse" class="p-2 rounded-lg hover:bg-white/20 transition text-white/80 hover:text-white" title="Ocultar panel">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Iconos de elementos (visible cuando está colapsado) -->
      <div id="infoSidebarIcons" class="info-sidebar-icons">
        <button class="info-sidebar-icon-btn" data-target="tech-spec" data-tooltip="Ficha técnica">
          <i class="fas fa-clipboard-list"></i>
        </button>
        <button class="info-sidebar-icon-btn" data-target="media-section" data-tooltip="Media">
          <i class="fas fa-play-circle"></i>
        </button>
        <button class="info-sidebar-icon-btn" data-target="glossary-section" data-tooltip="Glosario">
          <i class="fas fa-spell-check"></i>
        </button>
        <button class="info-sidebar-icon-btn" data-target="curious-section" data-tooltip="Dato curioso">
          <i class="fas fa-lightbulb"></i>
        </button>
        <button class="info-sidebar-icon-btn" data-target="error-section" data-tooltip="Error común">
          <i class="fas fa-bug"></i>
        </button>
      </div>
      
      <div id="infoSidebarContent" class="flex-1 overflow-y-auto p-4 space-y-4 transition-all duration-300">
        <div class="side-card loading-skeleton h-32"></div>
        <div class="side-card loading-skeleton h-32"></div>
        <div class="side-card loading-skeleton h-32"></div>
        <div class="side-card loading-skeleton h-32"></div>
      </div>
    </div>
  </aside>

  <!-- Contenido principal -->
  <div id="mainContent" class="ml-72 mr-80 transition-all duration-300">
    <!-- Header dinámico según área -->
    <header id="headerArea" class="bg-mat-dark text-white py-6 shadow-md transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-8">
        <div class="flex items-center justify-between">
          <div>
            <span id="areaBadge" class="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Matemáticas - ID: 0</span>
            <h1 id="mainTitle" class="text-3xl font-extrabold mt-2">Análisis de Pregunta</h1>
          </div>
          <div class="flex items-center gap-3">
            <span id="cacheStatus" class="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-200 hidden">
              <i class="fas fa-database mr-1"></i>En caché
            </span>
            <i id="areaIcon" class="fas fa-calculator text-4xl opacity-80"></i>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-8 py-8 mb-16" id="questionContent">
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
    </main>
  </div>


<!-- Modal para Guía Teórica y Opciones Incorrectas -->
<div id="infoModal" class="fixed inset-0 z-50 hidden">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeModal()"></div>
  <div class="absolute inset-4 md:inset-12 lg:inset-20 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-h-full flex flex-col overflow-hidden">
      <div class="flex items-center justify-between p-5 border-b border-gray-200">
        <h3 id="modalTitle" class="text-xl font-bold text-gray-800 flex items-center gap-3">
          <i id="modalIcon" class="fas"></i>
          <span id="modalTitleText"></span>
        </h3>
        <button onclick="closeModal()" class="p-2 hover:bg-gray-100 rounded-lg transition">
          <i class="fas fa-times text-gray-500"></i>
        </button>
      </div>
      <div id="modalContent" class="flex-1 overflow-y-auto p-6"></div>
    </div>
  </div>
</div>
<script src="js/justification/config.js?v=20260511_v1"></script>
<script src="js/justification/area.js?v=20260511_v1"></script>
<script src="js/justification/content-utils.js?v=20260511_v1"></script>
<script src="js/justification/render-helpers.js?v=20260511_v1"></script>
<script src="js/justification/question-renderer.js?v=20260511_v1"></script>
<script src="js/justification/sidebar.js?v=20260511_v1"></script>
<script src="js/justification/api.js?v=20260511_v1"></script>
<script src="js/justification/interactions.js?v=20260511_v1"></script>
<script>
  let infoSidebarCollapsed = false;
  
  function toggleInfoSidebar(targetId) {
    const toggleBtn = document.getElementById('toggleInfoCollapse');
    
    infoSidebarCollapsed = false;
    
    document.body.classList.remove('info-sidebar-collapsed');
    toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    toggleBtn.title = 'Ocultar panel';
    
    if (targetId) {
      setTimeout(function() {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }
  
  document.getElementById('toggleInfoCollapse').addEventListener('click', function() {
    const toggleBtn = document.getElementById('toggleInfoCollapse');
    
    if (infoSidebarCollapsed) {
      toggleInfoSidebar(null);
    } else {
      infoSidebarCollapsed = true;
      document.body.classList.add('info-sidebar-collapsed');
      toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      toggleBtn.title = 'Mostrar panel';
    }
  });
  
  document.getElementById('infoSidebarIcons').addEventListener('click', function(e) {
    const btn = e.target.closest('.info-sidebar-icon-btn');
    if (btn) {
      const targetId = btn.dataset.target;
      toggleInfoSidebar(targetId);
    }
  });
</script>
</body>
</html>
