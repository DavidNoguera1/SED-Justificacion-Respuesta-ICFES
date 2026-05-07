<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRUD - Justificaciones Expandidas</title>
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
            cc: { light: '#fef3d7', DEFAULT: '#e8a020', dark: '#e8a020' }
          }
        }
      }
    }
  </script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/justificaciones_crud.css">
  <style>
    body.sidebar-collapsed #mainContent { margin-left: 4rem; }
    body:not(.sidebar-collapsed) #mainContent { margin-left: 18rem; }
    body.sidebar-collapsed #questionSidebar { width: 4rem; }
    body:not(.sidebar-collapsed) #questionSidebar { width: 18rem; }
    .sidebar-collapsed .sidebar-text, .sidebar-collapsed .sidebar-full-content { display: none; }
    .sidebar-collapsed #sidebarFull { display: none; }
    .sidebar-collapsed #sidebarIconCollapsed { display: block !important; }
    .sidebar-collapsed #toggleCollapse { padding: 0.5rem; }
    #questionSidebar { position: fixed; top: 0; left: 0; height: 100%; z-index: 30; transition: width 0.3s ease; background: white; }
    #questionSidebar::-webkit-scrollbar { width: 4px; }
    #questionSidebar::-webkit-scrollbar-track { background: transparent; }
    #questionSidebar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
    .area-pill { padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; transition: all 0.2s ease; cursor: pointer; }
    .area-pill:hover { transform: scale(1.05); }
    .area-pill.active { box-shadow: 0 0 0 2px white, 0 0 0 4px currentColor; }
  </style>
</head>
<body class="bg-gray-100 text-gray-800 font-sans antialiased" data-area="mat">

  <!-- Sidebar de navegación izquierda -->
  <aside id="questionSidebar" class="fixed top-0 left-0 h-full w-72 flex flex-col z-30 transition-all duration-300 bg-white shadow-xl">
    <div class="flex flex-col h-full">
      <!-- Header de área -->
      <div id="sidebarHeader" class="p-4 text-white bg-mat transition-colors duration-300">
        <div class="flex items-start justify-between">
          <div id="sidebarFull" class="transition-all duration-300">
            <i id="sidebarIcon" class="fas fa-calculator text-2xl opacity-90 mb-2 block"></i>
            <span class="text-xs font-bold uppercase tracking-wider opacity-80 sidebar-text">Editor</span>
            <h2 class="text-base font-bold mt-1 sidebar-text">CRUD Justificaciones</h2>
          </div>
          <div class="flex flex-col items-end">
            <i id="sidebarIconCollapsed" class="fas fa-calculator text-xl opacity-90 hidden"></i>
            <button id="toggleCollapse" class="p-1.5 rounded-lg hover:bg-white/20 transition text-white/80 hover:text-white" title="Colapsar">
              <i class="fas fa-chevron-left text-sm"></i>
            </button>
          </div>
        </div>
        <div class="space-y-1 mt-3 sidebar-text">
          <a href="../index.php" class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/20 transition text-xs font-medium">
            <i class="fas fa-home w-4 text-center"></i>
            <span class="sidebar-text">Inicio</span>
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
      <div id="sidebarQuestionsWrapper" class="flex-1 overflow-y-auto bg-gray-50 p-2 transition-all duration-300">
        <div class="sidebar-full-content transition-all duration-300 mb-2">
          <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
            <i class="fas fa-list-ol mr-1"></i> <span class="sidebar-text">Preguntas</span>
          </div>
          <div class="px-2">
            <input type="text" id="sidebarSearch" class="w-full text-xs px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Buscar...">
          </div>
        </div>
        <div id="sidebarQuestions" class="space-y-1">
          <p class="text-xs text-gray-400 text-center py-4">Cargando preguntas...</p>
        </div>
      </div>
    </div>
  </aside>

  <!-- Contenido principal -->
  <div id="mainContent" class="ml-72 transition-all duration-300 p-6">
    <header class="bg-primary text-white py-4 shadow-md rounded-xl mb-6">
      <div class="max-w-5xl mx-auto px-6">
        <h1 class="text-2xl font-bold"><i class="fas fa-edit mr-2"></i>CRUD - Justificaciones Expandidas</h1>
      </div>
    </header>

    <nav class="bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 mb-6 flex items-center gap-3">
      <a href="../index.php" class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
        <i class="fas fa-home"></i> Inicio
      </a>
      <a id="linkVerPregunta" href="justification.php?area=mat&id=1" class="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium">
        <i class="fas fa-question-circle"></i> Ver Pregunta
      </a>
    </nav>

    <div class="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <label class="block text-sm font-bold text-gray-700">
          <i class="fas fa-file-import mr-1"></i>Importar desde archivo JS:
        </label>
        <div class="flex gap-2">
          <button type="button" onclick="guardarCambios()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
            <i class="fas fa-save mr-1"></i>Guardar cambios
          </button>
          <button onclick="toggleImportPanel()" class="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm font-medium">
            <i class="fas fa-upload mr-1"></i>Importar JS
          </button>
        </div>
      </div>
      
      <div id="importPanel" class="hidden border-t border-gray-200 pt-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <button onclick="descargarPlantilla()" class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium">
            <i class="fas fa-download mr-1"></i>Descargar Plantilla
          </button>
          <div class="flex-1">
            <input type="file" id="fileImport" accept=".js" onchange="handleFileImport(this)" 
              class="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          El archivo debe definir una variable <code class="bg-gray-100 px-1 rounded">JUSTIFICACIONES_IMPORT</code> con un array de objetos.
        </p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <label class="block text-sm font-bold text-gray-700 mb-2">
        <i class="fas fa-hashtag mr-1"></i>ID de pregunta a editar:
      </label>
      <div class="flex gap-3">
        <input type="number" id="inputId" value="" min="1"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-32"
          onkeypress="if(event.key==='Enter')cargarPregunta()">
        <button onclick="cargarPregunta()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium">
          <i class="fas fa-search mr-1"></i>Cargar
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <div id="questionRef" class="text-sm text-gray-600">
        <p class="text-gray-400 text-center py-4">Carga una pregunta para ver su contenido de referencia</p>
      </div>
    </div>

    <form id="formEdit" class="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div class="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 class="text-lg font-bold text-gray-700">Editar Justificación</h2>
        <span id="currentQuestionId" class="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">ID: -</span>
      </div>
      <input type="hidden" id="idPregunta" value="">

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Nombre de pregunta</label>
        <input type="text" id="nombrePregunta" maxlength="50"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Titulo descriptivo...">
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Descripcion extendida</label>
        <textarea id="descripcionExtendida" rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Explicacion detallada..."></textarea>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Media interactiva (codigo HTML)</label>
        <textarea id="mediaInteractiva" rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
          placeholder="<iframe>..."></textarea>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Glosario de terminos</label>
        <textarea id="glosarioItems" rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Termino: definicion (uno por linea)..."></textarea>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Dato curioso</label>
        <textarea id="datoCurioso" rows="2"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Dato interesante relacionado..."></textarea>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Errores comunes y feedback</label>
        <textarea id="errorComunFeedback" rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Errores frecuentes que cometen los estudiantes..."></textarea>
      </div>

    </form>

  </main>

  <div id="toast" class="fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg transform translate-y-20 opacity-0 transition-all duration-300 z-50 bg-green-600 text-white"></div>

  <script src="js/justificaciones_crud/config.js"></script>
  <script src="js/justificaciones_crud/utilidades.js"></script>
  <script src="js/justificaciones_crud/imagenes.js"></script>
  <script src="js/justificaciones_crud/referencia.js"></script>
  <script src="js/justificaciones_crud/carga.js"></script>
  <script src="js/justificaciones_crud/importacion.js"></script>
  <script src="js/justificaciones_crud/sidebar.js"></script>
  <script src="js/justificaciones_crud/inicializacion.js"></script>
  <script>
    document.getElementById('toggleCollapse').addEventListener('click', function() {
      document.body.classList.toggle('sidebar-collapsed');
      var btn = document.getElementById('toggleCollapse');
      if (document.body.classList.contains('sidebar-collapsed')) {
        btn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        btn.title = 'Expandir';
      } else {
        btn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        btn.title = 'Colapsar';
      }
    });
  </script>
</body>
</html>
