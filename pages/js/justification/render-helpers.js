/*
 * render-helpers.js
 * Renderizadores pequenos reutilizados por la vista principal.
 */

function renderTruncatedText(html, wordLimit = WORD_LIMIT, label = 'Ver más') {
  if (!hasValue(html)) {
    return `
      <div class="placeholder-box">
        <span class="chip"><i class="fas fa-hourglass-half"></i> Placeholder</span>
        <p class="empty-note mt-2">No hay contenido disponible</p>
      </div>
    `;
  }
  
  const words = stripHtml(html).split(/\s+/).filter(w => w.length > 0);
  
  if (words.length <= wordLimit) {
    return `<div class="learning-prose">${processHtmlImages(html)}</div>`;
  }
  
  const limitedWords = words.slice(0, wordLimit).join(' ');
  const truncated = limitedWords + '...';
  
  return `
    <div class="truncated-content" data-full="${escapeHtml(html)}">
      <div class="truncated-preview learning-prose">${processHtmlImages(truncated)}<div class="truncate-fade"></div></div>
      <button class="truncate-toggle" data-label="${label}" onclick="toggleTruncate(this)">
        <i class="fas fa-chevron-down"></i> ${label}
      </button>
    </div>
  `;
}

window.toggleTruncate = function(btn) {
  const container = btn.closest('.truncated-content');
  const preview = container.querySelector('.truncated-preview');
  const fullContent = container.dataset.full;
  const originalLabel = btn.dataset.label || 'Ver más';
  const isExpanded = container.classList.contains('truncated-expanded');
  
  if (isExpanded) {
    const result = truncateText(fullContent, WORD_LIMIT);
    if (result.needsTruncation) {
      preview.innerHTML = processHtmlImages(result.truncated) + '<div class="truncate-fade"></div>';
    } else {
      preview.innerHTML = processHtmlImages(result.truncated);
    }
    container.classList.remove('truncated-expanded');
    btn.innerHTML = '<i class="fas fa-chevron-down"></i> ' + originalLabel;
  } else {
    preview.innerHTML = processHtmlImages(fullContent);
    container.classList.add('truncated-expanded');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos';
  }
};

function renderTruncatedProse(html, wordLimit = WORD_LIMIT, label = 'Ver más') {
  if (!hasValue(html)) {
    return placeholder('Sin contenido', 'No hay contenido disponible.');
  }
  
  const words = stripHtml(html).split(/\s+/).filter(w => w.length > 0);
  
  if (words.length <= wordLimit) {
    return `<div class="learning-prose">${processHtmlImages(html)}</div>`;
  }
  
  const limitedWords = words.slice(0, wordLimit).join(' ');
  const truncated = limitedWords + '...';
  
  return `
    <div class="truncated-content learning-prose" data-full="${escapeHtml(html)}">
      <div class="truncated-preview">${processHtmlImages(truncated)}<div class="truncate-fade"></div></div>
      <button class="truncate-toggle" data-label="${label}" onclick="toggleTruncate(this)">
        <i class="fas fa-chevron-down"></i> ${label}
      </button>
    </div>
  `;
}
function placeholder(label, description) {
  return `
    <div class="placeholder-box">
      <span class="chip mb-3"><i class="fas fa-hourglass-half"></i> Placeholder</span>
      <p class="font-semibold text-slate-700">${label}</p>
      <p class="empty-note mt-1">${description}</p>
    </div>
  `;
}

function renderHtmlOrPlaceholder(value, label, description, extraClass) {
  if (!hasValue(value)) return placeholder(label, description);
  return `<div class="${extraClass || 'learning-prose'}">${processHtmlImages(value)}</div>`;
}

function renderQuestionImage(src, altText) {
  const imageSrc = resolveQuestionImage(src);
  if (!imageSrc) return '';
  return `<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(altText)}" class="mt-4 rounded-xl border border-slate-200 shadow-sm mx-auto max-w-full h-auto">`;
}

function parseGlossaryItems(raw) {
  if (!hasValue(raw)) return [];

  if (Array.isArray(raw)) {
    return raw.map(item => ({
      term: item.term || item.termino || item.titulo || '',
      definition: item.definition || item.definicion || item.descripcion || ''
    })).filter(item => hasValue(item.term) || hasValue(item.definition));
  }

  const text = String(raw).trim();
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parseGlossaryItems(parsed);
    if (parsed && typeof parsed === 'object') {
      return Object.keys(parsed).map(key => ({ term: key, definition: parsed[key] }));
    }
  } catch (e) {
  }

  return text.split(/\r?\n+/).map(line => {
    const parts = line.split(/\s*[:\-]\s*/);
    return {
      term: (parts.shift() || '').trim(),
      definition: parts.join(': ').trim()
    };
  }).filter(item => hasValue(item.term) || hasValue(item.definition));
}

function renderGlossary(raw) {
  const items = parseGlossaryItems(raw);
  if (!items.length) {
    return placeholder(
      'Glosario pendiente',
      'Aqui apareceran terminos tecnicos de la pregunta con definiciones breves para apoyar la lectura.'
    );
  }

  return `
    <div class="glossary-list">
      ${items.map(item => `
        <div>
          <span class="glossary-term glossary-tooltip">
            ${escapeHtml(item.term || 'Termino')}
            <span class="glossary-tooltip__content">${escapeHtml(item.definition || 'Definicion pendiente.')}</span>
          </span>
          <span class="empty-note">${escapeHtml(item.definition || 'Definicion pendiente.')}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderMedia(value) {
  if (!hasValue(value)) {
    return `
      <div class="media-frame items-center justify-center">
        <div class="text-center px-5">
          <i class="fas fa-play-circle text-4xl mb-3" style="color: var(--area-accent);"></i>
          <p class="font-bold text-slate-700">Recurso interactivo pendiente</p>
          <p class="empty-note">Aqui podra vivir un simulador, video, imagen o enlace externo.</p>
        </div>
      </div>
    `;
  }

  const media = String(value).trim();
  if (/<(iframe|video|img|audio)\b/i.test(media)) {
    return `<div class="media-frame">${processHtmlImages(media)}</div>`;
  }

  const resolved = resolveQuestionImage(media);
  if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(media)) {
    return `<div class="media-frame"><img src="${escapeHtml(resolved)}" alt="Recurso multimedia"></div>`;
  }
  if (/\.(mp4|webm|ogg)$/i.test(media)) {
    return `<div class="media-frame"><video src="${escapeHtml(resolved)}" controls></video></div>`;
  }
  if (/^https?:\/\//i.test(media)) {
    return `
      <div class="media-frame"><iframe src="${escapeHtml(media)}" title="Recurso interactivo" loading="lazy"></iframe></div>
      <a href="${escapeHtml(media)}" target="_blank" rel="noopener" class="inline-flex mt-3 text-sm font-bold" style="color: var(--area-accent);">
        Abrir recurso <i class="fas fa-arrow-up-right-from-square ml-2 mt-0.5"></i>
      </a>
    `;
  }

  return `<div class="learning-prose">${processHtmlImages(media)}</div>`;
}

function renderOptions(options, optionsImg, correctIdx, hasOptionsImg, letters) {
  if (!options.length) {
    return placeholder('Opciones no disponibles', 'La pregunta no trae opciones de respuesta en la API actual.');
  }

  return `
    <div class="answer-list">
      ${options.map((opt, idx) => {
        const isCorrect = idx === correctIdx;
        const optImg = optionsImg[idx] || '';
        return `
          <div class="answer-option ${isCorrect ? 'answer-option--correct' : 'answer-option--wrong'}">
            <span class="answer-letter">${letters[idx]}</span>
            <div class="flex-1">
              <div class="learning-prose">${processHtmlImages(opt || '')}</div>
              ${hasOptionsImg && optImg ? `<img src="${escapeHtml(getOptionImgSrc(optImg))}" alt="Opcion ${letters[idx]}" class="mt-3 max-w-[170px] rounded-lg border border-slate-200">` : ''}
            </div>
            <i class="fas ${isCorrect ? 'fa-check-circle text-green-600' : 'fa-circle-xmark text-red-500'} mt-1"></i>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

