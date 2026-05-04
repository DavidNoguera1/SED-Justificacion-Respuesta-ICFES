/*
 * question-renderer.js
 * Render principal de la vista enriquecida de pregunta.
 */

function renderQuestion(q, area, expanded) {
  const config = AREA_CONFIG[area] || AREA_CONFIG.mat;
  const content = document.getElementById('questionContent');
  const badge = document.getElementById('areaBadge');
  const title = document.getElementById('mainTitle');

  const questionName = fieldValue(expanded, ['nombrePregunta', 'nombreDePreguntas', 'nombre_pregunta']);
  const displayTitle = hasValue(questionName) ? questionName : 'Pregunta #' + q.id;

  badge.textContent = config.name + ' - ID: ' + q.id;
  title.textContent = displayTitle;

  const conf = detectContentConfig(q);
  const options = q.options || [];
  const optionsImg = q.optionsImg || [];
  const correctIdx = q.correct !== undefined ? q.correct : 0;
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const correctOption = options[correctIdx] || '';
  const correctImg = optionsImg[correctIdx] || '';
  const extendedDescription = fieldValue(expanded, ['descripcionExtendida', 'descripcion_extendida']);
  const mediaInteractiva = fieldValue(expanded, ['mediaInteractiva', 'media_interactiva']);
  const glossaryItems = fieldValue(expanded, ['glosario_items', 'glosarioItems']);
  const datoCurioso = fieldValue(expanded, ['datoCurioso', 'dato_curioso']);
  const errorComun = fieldValue(expanded, ['errorComunFeedback', 'error_comun_feedback']);
  const hasWrongOptions = options.filter((_, idx) => idx !== correctIdx).length > 0;

  // Guardar contenido para los modales
  window._modalContent = {
    guide: `<div class="modal-prose">${processHtmlImages(extendedDescription || 'No hay guia teorica extendida disponible.')}</div>`,
    wrong: `
      <div class="modal-prose mb-6">
        ${hasValue(q.invalidOptions) ? processHtmlImages(q.invalidOptions) : '<p>No hay justificacion detallada para los distractores.</p>'}
      </div>
      ${hasWrongOptions ? `
        <h4 class="text-lg font-bold mt-6 mb-3"><i class="fas fa-list mr-2"></i> Lista de opciones</h4>
        <div class="answer-list">
          ${options.map((opt, idx) => {
            if (idx === correctIdx) return '';
            const optImg = optionsImg[idx] || '';
            return `
              <div class="answer-option answer-option--wrong">
                <span class="answer-letter">${letters[idx]}</span>
                <div class="flex-1">
                  <div class="learning-prose">${processHtmlImages(opt || '')}</div>
                  ${conf.hasOptionsImg && optImg ? `<img src="${escapeHtml(getOptionImgSrc(optImg))}" alt="Opcion ${letters[idx]}" class="mt-3 max-w-[170px] rounded-lg border border-slate-200">` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}
    `
  };

  // Render main content immediately
  const hasEvaluationCriteria = hasValue(q.evaluationCriteria);
  
  content.innerHTML = `
    <div class="learning-shell">
      <div class="learning-main">
        ${hasEvaluationCriteria ? `
        <section class="learning-card learning-card--soft">
          <div class="objective-card">
            <span class="objective-icon"><i class="fas fa-bullseye"></i></span>
            <div>
              <p class="learning-eyebrow mb-1">¿Qué evalúa la pregunta?</p>
              ${renderHtmlOrPlaceholder(
                q.evaluationCriteria,
                'Criterio de evaluacion pendiente',
                'Cuando este campo venga de la base de datos, aqui se resumira la habilidad que mide la pregunta.',
                'learning-prose'
              )}
            </div>
          </div>
        </section>
        ` : ''}

        <section class="learning-card">
          <h2 class="learning-section-title flex items-center gap-2 mb-4">
            <i class="fas fa-book-open"></i> Contexto de la pregunta
          </h2>
          ${renderTruncatedText(
            q.context,
            180,
            'Ver contexto completo'
          )}
          ${renderQuestionImage(q.contextImg, 'Imagen del contexto')}
        </section>

        <section class="learning-card learning-card--question">
          <span class="chip bg-white/15 border-white/20 text-white">Pregunta</span>
          <div class="text-lg md:text-xl font-semibold leading-relaxed mt-4">
            ${processHtmlImages(q.text || '') || '<p>Enunciado pendiente.</p>'}
          </div>
          ${renderQuestionImage(q.questionImg, 'Imagen de la pregunta')}
        </section>

        <section class="learning-card">
          <h2 class="learning-section-title flex items-center gap-2 mb-4">
            <i class="fas fa-list-check"></i> Opciones de respuesta
          </h2>
          ${renderOptions(options, optionsImg, correctIdx, conf.hasOptionsImg, letters)}
        </section>

        <section class="learning-card learning-card--success">
          <h2 class="learning-section-title text-green-700 flex items-center gap-2 mb-4">
            <i class="fas fa-graduation-cap"></i> Analisis de la respuesta correcta
          </h2>
          <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <span class="chip bg-green-100 border-green-200 text-green-700">Respuesta correcta</span>
            <div class="flex items-start flex-wrap gap-3 mt-3">
              <span class="answer-letter answer-letter--correct">${letters[correctIdx]}</span>
              <div class="flex-1 learning-prose font-semibold text-slate-900">
                ${processHtmlImages(correctOption || 'Opcion correcta no disponible.')}
                ${conf.hasOptionsImg && correctImg ? `<img src="${escapeHtml(getOptionImgSrc(correctImg))}" alt="Opcion ${letters[correctIdx]}" class="mt-3 max-w-[170px] rounded-lg">` : ''}
              </div>
            </div>
          </div>
          ${renderTruncatedText(
            q.justification,
            180,
            'Ver justificacion completa'
          )}
        </section>

        ${hasValue(q.invalidOptions) || hasWrongOptions ? `
        <div class="info-bubble" onclick="openModal('wrong')">
          <div class="info-bubble__icon">
            <i class="fas fa-times-circle"></i>
          </div>
          <div class="info-bubble__content">
            <div class="info-bubble__title">Opciones Incorrectas</div>
            <div class="info-bubble__preview">${hasValue(q.invalidOptions) ? escapeHtml(q.invalidOptions.substring(0, 60)) + '...' : 'Ver analisis de distractores'}</div>
            <div class="info-bubble__cta"><i class="fas fa-arrow-right"></i> Ver detalles</div>
          </div>
        </div>
        ` : ''}
      </div>

      <aside class="learning-aside" id="learningAside">
        <!-- Aside content loaded lazily -->
        <div class="loading-skeleton h-32 side-card"></div>
        <div class="loading-skeleton h-32 side-card"></div>
        <div class="loading-skeleton h-32 side-card"></div>
        <div class="loading-skeleton h-32 side-card"></div>
      </aside>
    </div>
  `;

  // Lazy render aside content
  const asideData = {
    extendedDescription, mediaInteractiva, glossaryItems, datoCurioso, errorComun,
    hasWrongOptions, q, options, optionsImg, correctIdx, conf, letters, hasValue
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => renderAsideContent(asideData), { timeout: 1000 });
  } else {
    setTimeout(() => renderAsideContent(asideData), 100);
  }
}

function renderAsideContent(data) {
  const aside = document.getElementById('learningAside');
  if (!aside) return;

  const { extendedDescription, mediaInteractiva, glossaryItems, datoCurioso, errorComun,
          hasWrongOptions, q, options, optionsImg, correctIdx, conf, letters } = data;

  const technicalFields = [];
  if (q.competency && q.competency.trim() !== '') technicalFields.push({ label: 'Competencia', value: q.competency });
  if (q.component && q.component.trim() !== '') technicalFields.push({ label: 'Componente', value: q.component });
  if (q.level && q.level.trim() !== '') technicalFields.push({ label: 'Nivel', value: q.level });
  if (q.skill && q.skill.trim() !== '') technicalFields.push({ label: 'Habilidad', value: q.skill });
  if (q.assertion && q.assertion.trim() !== '') technicalFields.push({ label: 'Afirmación', value: q.assertion });
  if (q.evidence && q.evidence.trim() !== '') technicalFields.push({ label: 'Evidencia', value: q.evidence });
  if (q.standard && q.standard.trim() !== '') technicalFields.push({ label: 'Estándar', value: q.standard });

  const hasTechnicalFields = technicalFields.length > 0;

  aside.innerHTML = `
    ${hasTechnicalFields ? `
    <div class="collapsible-section" data-collapsed="false">
      <section class="side-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="learning-eyebrow mb-0">Ficha tecnica</h3>
          <button type="button" class="collapsible-btn" onclick="toggleCollapsible(this)">
            <span class="collapsible-text">Ocultar</span>
            <i class="fas fa-chevron-up collapsible-icon"></i>
          </button>
        </div>
        <dl class="space-y-2 text-sm collapsible-content">
          ${technicalFields.map(f => `
            <div class="border-b border-slate-100 pb-2 last:border-0">
              <dt class="font-bold text-slate-700 text-xs uppercase tracking-wide">${f.label}</dt>
              <dd class="text-slate-600 mt-1 leading-relaxed">${escapeHtml(f.value)}</dd>
            </div>
          `).join('')}
        </dl>
      </section>
    </div>
    ` : ''}

    ${hasValue(mediaInteractiva) ? `
    <section class="side-card">
      <h3 class="learning-eyebrow mb-4">Media interactiva</h3>
      <div class="media-frame media-frame--small">${renderMedia(mediaInteractiva)}</div>
    </section>
    ` : ''}

    <section class="side-card">
      <div class="flex items-center gap-3 mb-4">
        <span class="aside-icon"><i class="fas fa-spell-check"></i></span>
        <h3 class="font-bold text-slate-800">Glosario de palabras</h3>
      </div>
      ${renderGlossary(glossaryItems)}
    </section>

    <section class="side-card">
      <div class="flex items-center gap-3 mb-3">
        <span class="aside-icon"><i class="fas fa-lightbulb"></i></span>
        <h3 class="font-bold text-slate-800">Dato curioso</h3>
      </div>
      ${renderHtmlOrPlaceholder(
        datoCurioso,
        'Dato curioso pendiente',
        'Aqui se mostrara una conexion cultural, cientifica o historica relacionada con el tema.',
        'learning-prose text-sm'
      )}
    </section>

    <section class="side-card learning-card--danger">
      <div class="flex items-center gap-3 mb-3">
        <span class="aside-icon"><i class="fas fa-bug"></i></span>
        <h3 class="font-bold text-slate-800">Error comun</h3>
      </div>
      ${renderHtmlOrPlaceholder(
        errorComun,
        'Feedback de distractores pendiente',
        'Este campo explicara la estrategia de las opciones trampa y como evitarlas.',
        'learning-prose text-sm'
      )}
    </section>

    <!-- Burbujas interactivas para Guia Teorica y Opciones Incorrectas -->
    <div class="bubbles-grid">
      ${hasValue(extendedDescription) ? `
        <div class="info-bubble" onclick="openModal('guide')">
          <div class="info-bubble__icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="info-bubble__content">
            <div class="info-bubble__title">Guia Teorica</div>
            <div class="info-bubble__preview">${stripHtml(extendedDescription).substring(0, 60)}...</div>
            <div class="info-bubble__cta"><i class="fas fa-arrow-right"></i> Ver guia completa</div>
          </div>
        </div>
      ` : `
        <div class="info-bubble info-bubble--empty">
          <div class="info-bubble__icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="info-bubble__content">
            <div class="info-bubble__title">Guia Teorica</div>
            <div class="info-bubble__preview">Sin contenido disponible</div>
          </div>
        </div>
      `}
    </div>
  `;
}
