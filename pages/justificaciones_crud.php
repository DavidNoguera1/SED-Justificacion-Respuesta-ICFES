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
    
    <!-- Selector de pregunta -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <label class="block text-sm font-bold text-gray-700 mb-2">
        <i class="fas fa-hashtag mr-1"></i>ID de pregunta a editar:
      </label>
      <div class="flex gap-3">
        <input type="number" id="inputId" value="1" min="1" 
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-32"
          onkeypress="if(event.key==='Enter')cargarPregunta()">
        <button onclick="cargarPregunta()" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium">
          <i class="fas fa-search mr-1"></i>Cargar
        </button>
      </div>
    </div>

    <!-- Referencia de pregunta (ocultable) -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <button onclick="toggleRef()" class="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 transition flex items-center justify-between text-left">
        <span class="font-bold text-gray-700"><i class="fas fa-eye mr-2"></i>Ver contenido de la pregunta (referencia)</span>
        <i id="iconToggle" class="fas fa-chevron-down"></i>
      </button>
      <div id="refContent" class="hidden px-6 pb-6">
        <div id="questionRef" class="text-sm text-gray-600"></div>
      </div>
    </div>

    <!-- Formulario de edición -->
    <form id="formEdit" class="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <input type="hidden" id="idPregunta" value="1">
      
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Nombre de pregunta</label>
        <input type="text" id="nombrePregunta" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Título descriptivo...">
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Descripción extendida</label>
        <textarea id="descripcionExtendida" rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Explicación detallada..."></textarea>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Media interactiva (código HTML)</label>
        <textarea id="mediaInteractiva" rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
          placeholder="<iframe>...</textarea>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Glosario de términos (JSON)</label>
        <textarea id="glosarioItems" rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm !visible"
          style="display:block !important; visibility:visible !important; opacity:1 !important;"
          placeholder='{"término": "definición", ...}'></textarea>
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

      <div class="flex gap-3 pt-4 border-t border-gray-200">
        <button type="button" onclick="guardarCambios()" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
          <i class="fas fa-save mr-1"></i>Guardar cambios
        </button>
      </div>

      <div id="mensaje" class="hidden p-4 rounded-lg"></div>
    </form>

  </main>

  <script>
    const API_QUESTION = '../api/questions.php';
    const API_JUSTIFICACIONES = '../api/justificaciones.php';

    function $(id) {
      return document.getElementById(id);
    }

    function setValue(id, val) {
      var el = $(id);
      if (el) el.value = val || '';
    }

    function getValue(id) {
      var el = $(id);
      return el ? el.value : '';
    }

    async function cargarPregunta() {
      var inputEl = $('inputId');
      if (!inputEl) return alert('inputId not found');
      
      var id = parseInt(inputEl.value);
      if (!id || id < 1) return;

      $('idPregunta').value = id;
      $('linkVerPregunta').href = 'justification.php?area=mat&id=' + id;

      // Cargar pregunta original
      try {
        var res = await fetch(API_QUESTION + '?id=' + id);
        var q = await res.json();
        
        if (q.error) {
          $('questionRef').innerHTML = '<p class="text-red-600">Pregunta no encontrada</p>';
        } else {
          $('questionRef').innerHTML = 
            '<div class="space-y-3">' +
            '<div><strong>Área:</strong> ' + (q.subject || '') + '</div>' +
            '<div><strong>Contexto:</strong> ' + (q.context || 'Sin contexto') + '</div>' +
            '<div><strong>Pregunta:</strong> ' + (q.text || '') + '</div>' +
            '<div><strong>Respuesta correcta:</strong> ' + (q.options ? q.options[q.correct] : '') + '</div>' +
            '<div><strong>Justificación:</strong> ' + (q.justification || 'Sin justificación') + '</div>' +
            '</div>';
        }
      } catch (e) {
        $('questionRef').innerHTML = '<p class="text-red-600">Error al cargar pregunta</p>';
      }

// Cargar justificación expandida
      try {
        var res = await fetch(API_JUSTIFICACIONES + '?id=' + id);
        var j = await res.json();
        console.log('API response:', JSON.stringify(j));

        if (j && j.existe === false) {
          setValue('nombrePregunta', '');
          setValue('descripcionExtendida', '');
          setValue('mediaInteractiva', '');
          setValue('glosarioItems', '');
          setValue('datoCurioso', '');
          setValue('errorComunFeedback', '');
        } else if (j) {
          setValue('nombrePregunta', j.nombrePregunta || '');
          setValue('descripcionExtendida', j.descripcionExtendida || '');
          setValue('mediaInteractiva', j.mediaInteractiva || '');
          setValue('glosarioItems', j.glosario_items || '');
          setValue('datoCurioso', j.datoCurioso || '');
          setValue('errorComunFeedback', j.errorComunFeedback || '');
        }
      } catch (e) {
        console.error('Error loading:', e);
      }
    }

    async function guardarCambios() {
      var id = parseInt($('idPregunta').value);
      if (!id) return alert('ID no válido');

      var data = {
        idPregunta: id,
        nombrePregunta: getValue('nombrePregunta'),
        descripcionExtendida: getValue('descripcionExtendida'),
        mediaInteractiva: getValue('mediaInteractiva'),
        glosarioItems: getValue('glosarioItems'),
        datoCurioso: getValue('datoCurioso'),
        errorComunFeedback: getValue('errorComunFeedback')
      };

      try {
        var res = await fetch(API_JUSTIFICACIONES, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        var result = await res.json();

        var msg = $('mensaje');
        msg.classList.remove('hidden');
        
        if (result.success) {
          msg.className = 'p-4 rounded-lg bg-green-100 text-green-700 border border-green-300';
          msg.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Cambios guardados correctamente';
        } else {
          msg.className = 'p-4 rounded-lg bg-red-100 text-red-700 border border-red-300';
          msg.innerHTML = '<i class="fas fa-times-circle mr-1"></i>Error al guardar cambios';
        }
      } catch (e) {
        var msg = $('mensaje');
        msg.classList.remove('hidden');
        msg.className = 'p-4 rounded-lg bg-red-100 text-red-700 border border-red-300';
        msg.innerHTML = '<i class="fas fa-times-circle mr-1"></i>Error de conexión';
      }
    }

    function toggleRef() {
      var el = $('refContent');
      var icon = $('iconToggle');
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        icon.className = 'fas fa-chevron-up';
      } else {
        el.classList.add('hidden');
        icon.className = 'fas fa-chevron-down';
      }
    }

    window.addEventListener('DOMContentLoaded', cargarPregunta);
  </script>
</body>
</html>