var API_QUESTION = '../api/questions.php';
var API_JUSTIFICACIONES = '../api/justificaciones.php';
var IMG_BASE_PATH = '../shared/img/questions/';

function get(id) {
  return document.getElementById(id);
}

function setVal(id, val) {
  var el = get(id);
  if (el) el.value = (val === null || val === undefined) ? '' : val;
}

function getVal(id) {
  var el = get(id);
  return el ? el.value : '';
}

function getIdFromUrl() {
  var params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function setIdInUrl(id, area) {
  var url = new URL(window.location.href);
  url.searchParams.set('id', id);
  if (area) {
    url.searchParams.set('area', area);
  }
  window.history.replaceState({}, '', url);
}

function reloadWithId(id) {
  setIdInUrl(id);
  window.location.reload();
}

function processHtmlImages(html) {
  if (!html) return '';
  return html.replace(/src=["']([^"']+\.png)["']/gi, function(match, src) {
    if (src.startsWith('http') || src.startsWith('/') || src.startsWith('../')) {
      return match;
    }
    return 'src="' + IMG_BASE_PATH + src + '"';
  });
}

function extractImages(html) {
  if (!html) return [];
  var imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  var images = [];
  var match;
  while ((match = imgRegex.exec(html)) !== null) {
    var src = match[1];
    if (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith('../')) {
      src = IMG_BASE_PATH + src;
    }
    images.push(src);
  }
  return images;
}

function renderizarReferencia(q) {
  var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var options = q.options || [];
  var optionsImg = q.optionsImg || [];
  var correctIdx = q.correct !== undefined ? q.correct : q.correct_index;
  var hasOptionsImg = optionsImg && optionsImg.length > 0;
  var html = '';
  
  html += '<div class="bg-white rounded-xl shadow-sm p-4 border-l-4 border-gray-300 mb-4">';
  html += '<div class="flex items-center justify-between">';
  html += '<span class="text-sm font-bold text-gray-600">Contenido de Pregunta ID: ' + q.id + '</span>';
  html += '<button onclick="toggleMainRefCollapse(this)" class="text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium">';
  html += '<i class="fas fa-eye"></i><span>Click para abrir</span><i class="fas fa-chevron-down"></i></button>';
  html += '</div></div>';
  
  html += '<div id="mainRefContent" class="hidden space-y-4">';
  
  html += '<section class="bg-white rounded-xl shadow-sm collapse-section border-l-4 border-gray-400 p-6 mb-4" data-opened="false">';
  html += '<div class="flex items-center justify-between mb-4">';
  html += '<h2 class="text-lg font-bold text-gray-700 flex items-center"><i class="fas fa-book-reader mr-2"></i>Contenido de la Pregunta</h2>';
  html += '<button onclick="toggleRefCollapse(this)" class="text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium">';
  html += '<i class="fas fa-eye"></i><span>Click para abrir</span><i class="fas fa-chevron-down"></i></button>';
  html += '</div>';
  html += '<div class="collapse-content hidden space-y-4">';
  
  if (q.context) {
    var contextHtml = processHtmlImages(q.context);
    html += '<div class="bg-gray-50 rounded-lg p-4 border border-gray-200">';
    html += '<h4 class="text-gray-700 font-semibold text-sm mb-2 flex items-center"><i class="fas fa-book-open mr-2"></i> Contexto</h4>';
    html += '<div class="prose prose-sm max-w-none">' + contextHtml + '</div>';
    html += '</div>';
  }
  
  if (q.text_content || q.text) {
    var questionHtml = processHtmlImages(q.text_content || q.text);
    html += '<div class="bg-gray-50 rounded-lg p-4 border border-gray-200">';
    html += '<h4 class="text-gray-700 font-semibold text-sm mb-2 flex items-center"><i class="fas fa-question-circle mr-2"></i> Pregunta</h4>';
    html += '<div class="prose prose-sm max-w-none">' + questionHtml + '</div>';
    html += '</div>';
  }
  
  html += '</div></section>';
  
  if (options.length > 0) {
    var correctOption = options[correctIdx] || '';
    var correctImg = optionsImg[correctIdx] ? IMG_BASE_PATH + optionsImg[correctIdx] + '.png' : '';
    
    html += '<section class="bg-white rounded-xl shadow-sm collapse-section p-6 border-l-4 border-green-500 mb-4" data-opened="false">';
    html += '<div class="flex items-center justify-between mb-4">';
    html += '<h2 class="text-lg font-bold text-green-700 flex items-center"><i class="fas fa-check-circle mr-2"></i>Respuesta Correcta + Justificacion</h2>';
    html += '<button onclick="toggleRefCollapse(this)" class="text-sm text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium">';
    html += '<i class="fas fa-eye"></i><span>Click para abrir</span><i class="fas fa-chevron-down"></i></button>';
    html += '</div>';
    html += '<div class="collapse-content hidden">';
    html += '<div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">';
    html += '<span class="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block">RESPUESTA CORRECTA</span>';
    html += '<div class="flex items-start flex-wrap gap-3 mt-2">';
    html += '<div class="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold shrink-0">' + letters[correctIdx] + '</div>';
    html += '<div class="flex-1">';
    html += '<p class="text-gray-900 font-medium">' + correctOption + '</p>';
    if (hasOptionsImg && correctImg) {
      html += '<img src="' + correctImg + '" alt="Opción ' + letters[correctIdx] + '" class="mt-2 max-w-[150px] rounded">';
    }
    html += '</div></div></div>';
    
    if (q.justification) {
      var justHtml = processHtmlImages(q.justification);
      html += '<div class="bg-white border border-green-200 rounded-lg p-4">';
      html += '<h4 class="text-green-600 font-bold text-sm mb-2 uppercase tracking-wide flex items-center"><i class="fas fa-check-circle mr-1"></i> Justificación</h4>';
      html += '<p class="text-gray-700 text-sm">' + justHtml + '</p>';
      html += '</div>';
    }
    html += '</div></section>';
  }
  
  var hasInvalidText = q.invalidOptions || q.invalid_options;
  var wrongOptions = options.filter(function(_, idx) { return idx !== correctIdx; });
  
  if (hasInvalidText || wrongOptions.length > 0) {
    html += '<section class="bg-white rounded-xl shadow-sm collapse-section border-l-4 border-red-400 p-6 mb-4" data-opened="false">';
    html += '<div class="flex items-center justify-between mb-4">';
    html += '<h3 class="text-lg font-bold text-red-700 flex items-center"><i class="fas fa-times-circle mr-2"></i>Opciones Incorrectas';
    if (hasInvalidText && wrongOptions.length > 0) {
      html += '<span class="ml-2 text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded-full">(razones + lista)</span>';
    }
    html += '</h3>';
    html += '<button onclick="toggleRefCollapse(this)" class="text-sm text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition flex items-center gap-2 font-medium shadow-sm">';
    html += '<i class="fas fa-eye"></i><span>Click para abrir</span><i class="fas fa-chevron-down"></i></button>';
    html += '</div>';
    html += '<div class="collapse-content hidden space-y-4">';
    
    if (hasInvalidText) {
      var invalidText = q.invalidOptions || q.invalid_options;
      var invalidHtml = processHtmlImages(invalidText);
      html += '<div class="bg-red-50 rounded-lg p-4 border border-red-200">';
      html += '<h4 class="text-red-700 font-semibold text-sm mb-2 flex items-center"><i class="fas fa-question-circle mr-2"></i> ¿Por qué son incorrectas?</h4>';
      html += '<p class="text-gray-700 text-sm">' + invalidHtml + '</p>';
      html += '</div>';
    }
    
    if (wrongOptions.length > 0) {
      html += '<div class="border border-red-200 rounded-lg overflow-hidden">';
      html += '<h4 class="text-red-700 font-semibold text-sm bg-red-50 px-4 py-2 border-b border-red-200 flex items-center"><i class="fas fa-list mr-2"></i>Lista de opciones</h4>';
      html += '<ul class="divide-y divide-red-100">';
      
      options.forEach(function(opt, idx) {
        if (idx !== correctIdx) {
          var optLetter = letters[idx];
          var optImg = optionsImg[idx] ? IMG_BASE_PATH + optionsImg[idx] + '.png' : '';
          
          html += '<li class="bg-white p-3 flex items-start gap-3 hover:bg-red-50 transition">';
          html += '<span class="bg-red-100 text-red-600 rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shrink-0">' + optLetter + '</span>';
          html += '<div class="flex-1">';
          html += '<p class="text-gray-700 text-sm">' + opt + '</p>';
          if (hasOptionsImg && optImg) {
            html += '<img src="' + optImg + '" alt="Opción ' + optLetter + '" class="mt-2 max-w-[150px] rounded">';
          }
          html += '</div></li>';
        }
      });
      
      html += '</ul></div>';
    }
    
    html += '</div></section>';
  }
  
  html += '</div>';
  
  return html;
}

function toggleMainRefCollapse(btn) {
  var header = btn.closest('.bg-white.rounded-xl');
  var content = document.getElementById('mainRefContent');
  var isOpen = content && !content.classList.contains('hidden');
  var icons = btn.querySelectorAll('i');
  var span = btn.querySelector('span');
  
  if (isOpen) {
    content.classList.add('hidden');
    if (icons[0]) icons[0].className = 'fas fa-eye';
    if (span) span.textContent = 'Click para abrir';
    if (icons[1]) icons[1].className = 'fas fa-chevron-down';
  } else {
    content.classList.remove('hidden');
    if (icons[0]) icons[0].className = 'fas fa-eye-slash';
    if (span) span.textContent = 'Click para ocultar';
    if (icons[1]) icons[1].className = 'fas fa-chevron-up';
  }
}

function toggleRefCollapse(btn) {
  var section = btn.closest('.collapse-section');
  var content = section.querySelector('.collapse-content');
  var isOpen = section.getAttribute('data-opened') === 'true';
  var icons = btn.querySelectorAll('i');
  var span = btn.querySelector('span');
  
  if (isOpen) {
    content.classList.add('hidden');
    section.setAttribute('data-opened', 'false');
    if (icons[0]) icons[0].className = 'fas fa-eye';
    if (span) span.textContent = 'Click para abrir';
    if (icons[1]) icons[1].className = 'fas fa-chevron-down';
  } else {
    content.classList.remove('hidden');
    section.setAttribute('data-opened', 'true');
    if (icons[0]) icons[0].className = 'fas fa-eye-slash';
    if (span) span.textContent = 'Click para ocultar';
    if (icons[1]) icons[1].className = 'fas fa-chevron-up';
  }
}

function showToast(message, isError) {
  var toast = get('toast');
  toast.textContent = message;
  toast.className = 'fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 z-50';
  
  if (isError) {
    toast.classList.add('bg-red-600', 'text-white');
  } else {
    toast.classList.add('bg-green-600', 'text-white');
  }
  
  toast.classList.remove('translate-y-20', 'opacity-0');
  
  setTimeout(function() {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, isError ? 6500 : 3000);
}

async function parseJsonResponse(response) {
  var text = await response.text();
  var data = null;

  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    throw new Error('Respuesta invalida del servidor.');
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.error || 'Error al guardar cambios');
  }

  return data;
}

async function cargarPregunta() {
  var inp = get('inputId');
  if (!inp) return;
  var id = parseInt(inp.value);
  if (!id || id < 1) return;

  get('idPregunta').value = id;
  get('currentQuestionId').textContent = 'ID: ' + id;

  var area = 'mat';
  try {
    var rQ = await fetch(API_QUESTION + '?id=' + id);
    var q = await rQ.json();
    if (q && q.subject) {
      area = q.subject;
    }
  } catch (e) {}
  
  get('linkVerPregunta').href = 'justification.php?id=' + id + '&area=' + area;
  setIdInUrl(id, area);

  try {
    var r = await fetch(API_QUESTION + '?id=' + id);
    var q = await r.json();
    if (q.error) {
      get('questionRef').innerHTML = '<p class="text-red-600 p-4">Pregunta no encontrada</p>';
    } else {
      get('questionRef').innerHTML = renderizarReferencia(q);
    }
  } catch (e) {
    get('questionRef').innerHTML = '<p class="text-red-600 p-4">Error al cargar pregunta: ' + e.message + '</p>';
  }

  try {
    var r2 = await fetch(API_JUSTIFICACIONES + '?id=' + id);
    var j = await r2.json();

    setVal('nombrePregunta', j.nombrePregunta || '');
    setVal('descripcionExtendida', j.descripcionExtendida || '');
    setVal('mediaInteractiva', j.mediaInteractiva || '');
    setVal('glosarioItems', j.glosario_items || '');
    setVal('datoCurioso', j.datoCurioso || '');
    setVal('errorComunFeedback', j.errorComunFeedback || '');
  } catch (e) {
  }
}

async function guardarCambios() {
  var id = parseInt(get('idPregunta').value);
  if (!id) {
    showToast('ID no válido', true);
    return;
  }

  var data = {
    idPregunta: id,
    nombrePregunta: getVal('nombrePregunta'),
    descripcionExtendida: getVal('descripcionExtendida'),
    mediaInteractiva: getVal('mediaInteractiva'),
    glosarioItems: getVal('glosarioItems'),
    datoCurioso: getVal('datoCurioso'),
    errorComunFeedback: getVal('errorComunFeedback')
  };

  try {
    var r = await fetch(API_JUSTIFICACIONES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    var result = await parseJsonResponse(r);

    if (result.success) {
      showToast('Cambios guardados correctamente', false);
      setTimeout(function() { reloadWithId(id); }, 1500);
    } else {
      showToast(result.error || 'Error al guardar cambios', true);
    }
  } catch (e) {
    showToast(e.message || 'Error de conexion', true);
  }
}

function toggleImportPanel() {
  var el = get('importPanel');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
}

function descargarPlantilla() {
  var plantilla = `/**
 * Plantilla de Importación de Justificaciones ICFES
 * 
 * Instrucciones:
 * 1. Completa los datos de cada pregunta
 * 2. Guarda este archivo con un nombre descriptivo (ej: mis_justificaciones.js)
 * 3. Desde la página CRUD, usa "Importar JS" para cargar el archivo
 * 
 * Estructura por pregunta:
 * {
 *   idPregunta: número,
 *   nombrePregunta: "Título descriptivo",
 *   descripcionExtendida: "Explicación detallada...",
 *   mediaInteractiva: "<iframe>...",
 *   glosarioItems: "Término: definición (uno por línea)...",
 *   datoCurioso: "Dato interesante...",
 *   errorComunFeedback: "Errores frecuentes..."
 * }
 */

var JUSTIFICACIONES_IMPORT = [
  {
    idPregunta: 1,
    nombrePregunta: "",
    descripcionExtendida: "",
    mediaInteractiva: "",
    glosarioItems: "",
    datoCurioso: "",
    errorComunFeedback: ""
  },
  {
    idPregunta: 2,
    nombrePregunta: "",
    descripcionExtendida: "",
    mediaInteractiva: "",
    glosarioItems: "",
    datoCurioso: "",
    errorComunFeedback: ""
  }
];`;

  var blob = new Blob([plantilla], { type: 'text/javascript' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'plantilla_justificaciones.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleFileImport(input) {
  var file = input.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = async function(e) {
    try {
      var script = document.createElement('script');
      script.textContent = e.target.result;
      document.head.appendChild(script);

      var data = window.JUSTIFICACIONES_IMPORT;
      if (!data || !Array.isArray(data) || data.length === 0) {
        alert('El archivo no contiene datos válidos. Asegúrate de definir JUSTIFICACIONES_IMPORT.');
        document.head.removeChild(script);
        return;
      }

      await procesarImportacion(data, script);
    } catch (err) {
      alert('Error al procesar el archivo: ' + err.message);
    }
  };
  reader.readAsText(file);
  input.value = '';
}

async function procesarImportacion(data, scriptEl) {
  var idsExistentes = [];
  var idsVerificados = {};

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (!item.idPregunta || idsVerificados[item.idPregunta]) continue;
    idsVerificados[item.idPregunta] = true;

    try {
      var r = await fetch(API_JUSTIFICACIONES + '?id=' + item.idPregunta);
      var j = await r.json();
      if (j && j.existe === false) {
      } else {
        idsExistentes.push(item.idPregunta);
      }
    } catch (e) {
    }
  }

  if (idsExistentes.length > 0) {
    var listaIds = idsExistentes.length > 10 
      ? idsExistentes.slice(0, 10).join(', ') + '... (' + idsExistentes.length + ' total)'
      : idsExistentes.join(', ');
    var confirmar = confirm(
      'Se cargará información a las preguntas con ID: [' + listaIds + ']\n\n' +
      '¿Desea proseguir? Se reescribirá toda información previamente existente.'
    );
    if (!confirmar) {
      document.head.removeChild(scriptEl);
      return;
    }
  }

  var exitos = 0;
  var errores = [];

  for (var item of data) {
    if (!item.idPregunta) continue;

    var payload = {
      idPregunta: item.idPregunta,
      nombrePregunta: item.nombrePregunta || '',
      descripcionExtendida: item.descripcionExtendida || '',
      mediaInteractiva: item.mediaInteractiva || '',
      glosarioItems: item.glosarioItems || '',
      datoCurioso: item.datoCurioso || '',
      errorComunFeedback: item.errorComunFeedback || ''
    };

    try {
      var r = await fetch(API_JUSTIFICACIONES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      var result = await parseJsonResponse(r);
      if (result.success) {
        exitos++;
      } else {
        errores.push(item.idPregunta);
      }
    } catch (e) {
      errores.push(item.idPregunta);
    }
  }

  document.head.removeChild(scriptEl);

  var currentId = getVal('idPregunta');
  if (currentId) {
    setIdInUrl(currentId);
  }

  if (errores.length === 0) {
    showToast('Importación exitosa: ' + exitos + ' pregunta(s) procesada(s)', false);
  } else {
    showToast('Importación parcial: ' + exitos + ' OK, ' + errores.length + ' errores (IDs: ' + errores.join(', ') + ')', true);
  }

  if (currentId) {
    setTimeout(function() {
      cargarPregunta();
    }, 1500);
  }
}

window.addEventListener('DOMContentLoaded', function() {
  var urlId = getIdFromUrl();
  if (urlId) {
    setVal('inputId', urlId);
  }
  cargarPregunta();
});
