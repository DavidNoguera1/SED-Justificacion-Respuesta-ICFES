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
  
  setIdInUrl(id, area);
  
  var linkVerPregunta = get('linkVerPregunta');
  if (linkVerPregunta) {
    linkVerPregunta.href = 'justification.php?id=' + id + '&area=' + area;
  }
  
  if (typeof updateSidebarSelection === 'function') {
    updateSidebarSelection(id, area);
  }

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