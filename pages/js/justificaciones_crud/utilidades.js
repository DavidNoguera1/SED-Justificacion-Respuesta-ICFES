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