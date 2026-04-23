<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRUD - Justificaciones Expandidas</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <style>
    .bg-primary { background-color: #2F6EB5 !important; }
    .bg-primary-dark { background-color: #1a4a7a !important; }
    .text-primary { color: #2F6EB5 !important; }
    .ring-primary { --tw-ring-color: #2F6EB5 !important; }
  </style>
</head>
<body class="bg-gray-100 text-gray-800 font-sans antialiased">

  <header class="bg-primary text-white py-4 shadow-md">
    <div class="max-w-5xl mx-auto px-6">
      <h1 class="text-2xl font-bold"><i class="fas fa-edit mr-2"></i>CRUD - Justificaciones Expandidas</h1>
    </div>
  </header>

  <nav class="bg-gray-50 border-b border-gray-200 py-3 mt-4">
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex items-center gap-4">
        <a href="../index.php" class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm font-medium">
          <i class="fas fa-home"></i> Inicio
        </a>
        <a id="linkVerPregunta" href="justification.php?area=mat&id=1" class="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium">
          <i class="fas fa-question-circle"></i> Ver Pregunta
        </a>
      </div>
    </div>
  </nav>

  <main class="max-w-5xl mx-auto px-6 mt-6 space-y-6">

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

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <button onclick="toggleRef()" class="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 transition flex items-center justify-between text-left">
        <span class="font-bold text-gray-700"><i class="fas fa-eye mr-2"></i>Ver contenido de la pregunta (referencia)</span>
        <i id="iconToggle" class="fas fa-chevron-down"></i>
      </button>
      <div id="refContent" class="hidden px-6 pb-6">
        <div id="questionRef" class="text-sm text-gray-600"></div>
      </div>
    </div>

    <form id="formEdit" class="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <input type="hidden" id="idPregunta" value="1">

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Nombre de pregunta</label>
        <input type="text" id="nombrePregunta"
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

  <div id="toast" class="fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg transform translate-y-20 opacity-0 transition-all duration-300 z-50"></div>

  <script src="js/justificaciones_crud.js"></script>
</body>
</html>