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