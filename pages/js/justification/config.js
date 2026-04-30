/*
 * config.js
 * Constantes compartidas de la pagina de analisis.
 */

// ============================================================
// CONFIGURACIÓN DE ÁREAS
// ============================================================

const AREA_CONFIG = {
  mat: { name: 'Matemáticas', icon: 'fa-calculator', color: 'mat' },
  lc: { name: 'Lectura Crítica', icon: 'fa-book-reader', color: 'lc' },
  cn: { name: 'Ciencias Naturales', icon: 'fa-flask', color: 'cn' },
  cc: { name: 'Competencias Ciudadanas', icon: 'fa-users', color: 'soc' },
  soc: { name: 'Competencias Ciudadanas', icon: 'fa-users', color: 'soc' },
  ing: { name: 'Inglés', icon: 'fa-language', color: 'ing' }
};

const API_JUSTIFICACIONES = '../api/justificaciones.php';

const AREA_ICONS = {
  mat: 'fa-calculator',
  lc: 'fa-book-reader',
  cn: 'fa-flask',
  cc: 'fa-users',
  soc: 'fa-users',
  ing: 'fa-language'
};

const BG_AREA_ICONS = {
  mat: ['∑', '∫', 'π', '√', '≈', 'Δ', 'Ω', 'λ', '∞', '∂', '∇', '∉', '⊕', '⊖', '⊗'],
  lc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
  cn: ['⚛', '🧬', '🔬', '🧪', '🌿', '⚡', '🔥', '💧', '🌊', '☀️', '🌙', '⭐', '🧠', '🦴', '🩸'],
  cc: ['⚖️', '🤝', '🗳️', '🗣️', '📢', '👥', '👤', '🏛️', '🛡️', '❤️', '🤲', '✊', '✋', '👋', '💪'],
  soc: ['⚖️', '🤝', '🗳️', '🗣️', '📢', '👥', '👤', '🏛️', '🛡️', '❤️', '🤲', '✊', '✋', '👋', '💪'],
  en: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
};
