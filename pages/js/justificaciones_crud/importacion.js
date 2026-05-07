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