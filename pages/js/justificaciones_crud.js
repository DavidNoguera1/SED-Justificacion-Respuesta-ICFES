var API_QUESTION = '../api/questions.php';
var API_JUSTIFICACIONES = '../api/justificaciones.php';

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

function showToast(message, isError) {
  var toast = get('toast');
  toast.textContent = message;
  toast.className = 'fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 z-50';
  
  if (isError) {
    toast.className += ' bg-red-600 text-white';
  } else {
    toast.className += ' bg-green-600 text-white';
  }
  
  toast.classList.remove('translate-y-20', 'opacity-0');
  
  setTimeout(function() {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

async function cargarPregunta() {
  var inp = get('inputId');
  if (!inp) return;
  var id = parseInt(inp.value);
  if (!id || id < 1) return;

  get('idPregunta').value = id;
  get('linkVerPregunta').href = 'justification.php?area=mat&id=' + id;

  try {
    var r = await fetch(API_QUESTION + '?id=' + id);
    var q = await r.json();
    if (q.error) {
      get('questionRef').innerHTML = '<p class="text-red-600">Pregunta no encontrada</p>';
    } else {
      get('questionRef').innerHTML =
        '<div class="space-y-3">' +
        '<div><strong>Area:</strong> ' + (q.subject || '') + '</div>' +
        '<div><strong>Contexto:</strong> ' + (q.context || 'Sin contexto') + '</div>' +
        '<div><strong>Pregunta:</strong> ' + (q.text || '') + '</div>' +
        '<div><strong>Respuesta correcta:</strong> ' + (q.options ? q.options[q.correct] : '') + '</div>' +
        '<div><strong>Justificacion:</strong> ' + (q.justification || 'Sin justificacion') + '</div>' +
        '</div>';
    }
  } catch (e) {
    get('questionRef').innerHTML = '<p class="text-red-600">Error al cargar pregunta</p>';
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
    var result = await r.json();

    if (result.success) {
      showToast('Cambios guardados correctamente', false);
    } else {
      showToast('Error al guardar cambios', true);
    }
  } catch (e) {
    showToast('Error de conexión', true);
  }
}

function toggleRef() {
  var el = get('refContent');
  var icon = get('iconToggle');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    icon.className = 'fas fa-chevron-up';
  } else {
    el.classList.add('hidden');
    icon.className = 'fas fa-chevron-down';
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
  var idsNuevos = [];

  for (var item of data) {
    if (!item.idPregunta) continue;

    try {
      var r = await fetch(API_JUSTIFICACIONES + '?id=' + item.idPregunta);
      var j = await r.json();
      if (j && j.existe === false) {
        idsNuevos.push(item.idPregunta);
      } else {
        idsExistentes.push(item.idPregunta);
      }
    } catch (e) {
      idsNuevos.push(item.idPregunta);
    }
  }

  if (idsExistentes.length > 0) {
    var confirmar = confirm(
      'Se cargará información a las preguntas con ID: [' + idsExistentes.join(', ') + ']\n\n' +
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
      var result = await r.json();
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

  if (errores.length === 0) {
    showToast('Importación exitosa: ' + exitos + ' pregunta(s) procesada(s)', false);
  } else {
    showToast('Importación parcial: ' + exitos + ' OK, ' + errores.length + ' errores (IDs: ' + errores.join(', ') + ')', true);
  }
}

window.addEventListener('DOMContentLoaded', cargarPregunta);