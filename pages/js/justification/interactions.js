/*
 * interactions.js
 * Inicializacion, plegables y modal informativo.
 */

// ============================================================
  // INICIALIZAR EN DOM READY
  // ============================================================

  document.addEventListener('DOMContentLoaded', initJustification);

  // ============================================================
  // COLLAPSE (PLEGABLE)
  // ============================================================

  function toggleCollapse(btn) {
    const section = btn.closest('.collapse-section');
    const content = section.querySelector('.collapse-content');
    const isOpen = section.getAttribute('data-opened') === 'true';

    if (isOpen) {
      content.classList.add('hidden');
      section.setAttribute('data-opened', 'false');
      btn.querySelector('span').textContent = 'Click para abrir';
      btn.querySelectorAll('i').forEach((icon, i) => {
        if (i === 0) icon.className = 'fas fa-eye';
        if (i === 1) icon.className = 'fas fa-chevron-down';
      });
    } else {
      content.classList.remove('hidden');
      section.setAttribute('data-opened', 'true');
      btn.querySelector('span').textContent = 'Click para ocultar';
      btn.querySelectorAll('i').forEach((icon, i) => {
        if (i === 0) icon.className = 'fas fa-eye-slash';
        if (i === 1) icon.className = 'fas fa-chevron-up';
      });
    }
  }

  // ============================================================
  // MODAL - Funciones para abrir/cerrar modal
  // ============================================================

  const MODAL_TITLES = {
    guide: { icon: 'fa-book-open', text: 'Guia Teorica Extendida' },
    wrong: { icon: 'fa-times-circle', text: 'Opciones Incorrectas' }
  };

  window.openModal = function(type) {
    const modal = document.getElementById('infoModal');
    const titleConfig = MODAL_TITLES[type];
    const content = window._modalContent && window._modalContent[type];

    if (!modal || !titleConfig || !content) return;

    const icon = document.getElementById('modalIcon');
    const titleText = document.getElementById('modalTitleText');
    const modalContent = document.getElementById('modalContent');

    icon.className = 'fas ' + titleConfig.icon;
    titleText.textContent = titleConfig.text;
    modalContent.innerHTML = content;
    modal.classList.remove('hidden');

    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    const modal = document.getElementById('infoModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
