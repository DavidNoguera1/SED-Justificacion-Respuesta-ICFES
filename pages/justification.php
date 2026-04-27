<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Análisis de Pregunta</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../shared/css/variables.css">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            mat: { light: '#e8eef5', DEFAULT: '#1a3a5c', dark: '#1a3a5c' },
            lc: { light: '#ede8ff', DEFAULT: '#5b3fa0', dark: '#5b3fa0' },
            cn: { light: '#d4f0e2', DEFAULT: '#1e8a4a', dark: '#1e8a4a' },
            soc: { light: '#fef3d7', DEFAULT: '#e8a020', dark: '#e8a020' },
            ing: { light: '#fde8e6', DEFAULT: '#c0392b', dark: '#c0392b' }
          }
        }
      }
    }
  </script>
  <link rel="stylesheet" href="css/justification.css">
  <link rel="stylesheet" href="../shared/css/backgrounds.css">
  <style>
    body { position: relative; }
    .bg-canvas { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
    .hero-bg-item {
      position: absolute;
      opacity: 0.06;
      color: var(--area-accent);
      font-family: var(--font-display);
      font-weight: 700;
      animation: float-icon 15s ease-in-out infinite;
      user-select: none;
    }
    @keyframes float-icon {
      0%   { transform: translateY(0px)   rotate(0deg);  }
      33%  { transform: translateY(-16px) rotate(4deg);  }
      66%  { transform: translateY(-6px)  rotate(-3deg); }
      100% { transform: translateY(0px)   rotate(0deg);  }
    }
    #mainContent { position: relative; z-index: 1; }
  </style>
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

  <!-- Contenido principal -->
  <div id="mainContent" class="ml-72 transition-all duration-300">
    <!-- Header dinámico según área -->
    <header id="headerArea" class="bg-mat-dark text-white py-6 shadow-md transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-8">
        <div class="flex items-center justify-between">
          <div>
            <span id="areaBadge" class="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Matemáticas - ID: 0</span>
            <h1 id="mainTitle" class="text-3xl font-extrabold mt-2">Análisis de Pregunta</h1>
          </div>
          <i id="areaIcon" class="fas fa-calculator text-4xl opacity-80"></i>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-8 py-8 mb-16" id="questionContent">
      <!-- Contenido se carga dinámicamente aquí -->
    </main>
  </div>

<script src="js/justification.js"></script>
</body>
</html>
