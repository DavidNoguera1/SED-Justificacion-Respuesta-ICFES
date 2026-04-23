<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apoyo ICFES — Refuerzo Pedagógico</title>
  <link rel="stylesheet" href="shared/css/variables.css">
  <link rel="stylesheet" href="shared/css/base.css">
  <link rel="stylesheet" href="shared/css/layout.css">
  <link rel="stylesheet" href="shared/css/components.css">
  <link rel="stylesheet" href="shared/css/index.css">
</head>
<body>

  <nav class="navbar">
    <div class="navbar-brand">
      <span class="navbar-logo">📚</span>
      <span class="navbar-title">SED Nariño</span>
    </div>
    <div class="navbar-links">
      <a href="#heroHeader" class="nav-link">Inicio</a>
      <a href="#areasSection" class="nav-link">Áreas</a>
      <a href="pages/justificaciones_crud.php" class="nav-link">CRUD</a>
    </div>
  </nav>

  <header class="hero-header" id="heroHeader" data-area="mat">
    <div class="hero-bg" id="heroBg"></div>
    <div class="hero-content">
      <div class="hero-badge">PREPARACIÓN SABER 11</div>
      <h1 class="hero-title">Refuerzo Pedagógico<br>Interactivo</h1>
      <p class="hero-subtitle">Domina cada concepto, entiende cada respuesta. Más que memorizar — comprende el <em>por qué</em> detrás de cada pregunta del ICFES.</p>
      
      <div class="tips-carousel">
        <span class="tips-label">💡 Consejo del día:</span>
        <span class="tip-current" id="tipCurrent"></span>
      </div>
    </div>
  </header>

  <main class="container">
    <section class="areas-section" id="areasSection">
      <h2 class="section-title">Selecciona un área para comenzar</h2>
      <p class="section-subtitle">Cada área contiene explicaciones detalladas para que entiendas la lógica detrás de cada respuesta.</p>
      
      <div class="areas-grid">
        <a class="area-card" href="pages/area.php?area=mat" data-area="mat">
          <div class="area-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6h16M4 12h16M4 18h10"/>
            </svg>
          </div>
          <h3 class="area-card__name">Matemáticas</h3>
          <p class="area-card__desc">Álgebra, geometría, estadística y razonamiento cuantitativo</p>
          <span class="area-card__cta">Explorar →</span>
        </a>

        <a class="area-card" href="pages/area.php?area=lc" data-area="lc">
          <div class="area-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <h3 class="area-card__name">Lectura Crítica</h3>
          <p class="area-card__desc">Comprensión, inferencia y análisis de textos</p>
          <span class="area-card__cta">Explorar →</span>
        </a>

        <a class="area-card" href="pages/area.php?area=cn" data-area="cn">
          <div class="area-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
          <h3 class="area-card__name">Ciencias Naturales</h3>
          <p class="area-card__desc">Física, química, biología y método científico</p>
          <span class="area-card__cta">Explorar →</span>
        </a>

        <a class="area-card" href="pages/area.php?area=cc" data-area="cc">
          <div class="area-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H8m8 0v-2a3 3 0 00-5.356-1.857M17 20H8m8 0v-2a3 3 0 00-5.356-1.857M12 9a3 3 0 00-3 3v1m0 0V9a3 3 0 013-3m0 3c1.657 0 3-1.343 3-3s-1.343-3-3-3m0 3v1m0 0V9c1.657 0 3-1.343 3-3s-1.343-3-3-3m-3 9h.01"/>
            </svg>
          </div>
          <h3 class="area-card__name">Competencias Ciudadanas</h3>
          <p class="area-card__desc">Pensamiento social, participación y convivencia</p>
          <span class="area-card__cta">Explorar →</span>
        </a>

        <a class="area-card" href="pages/area.php?area=en" data-area="en">
          <div class="area-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 5h12M4 9h9M5 13h7M3 17h12M4 21h9"/>
            </svg>
          </div>
          <h3 class="area-card__name">Inglés</h3>
          <p class="area-card__desc">Comprensión lectora, gramática y vocabulario</p>
          <span class="area-card__cta">Explorar →</span>
        </a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>Material de apoyo pedagógico para la prueba Saber 11 — No oficial</p>
  </footer>

  <script>
    const AREA_ICONS = {
      mat: ['∑', '∫', 'π', '√', '≈', 'Δ', 'Ω', 'λ', '∞', '∂', '∇', '∉', '⊕', '⊖', '⊗'],
      lc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
      cn: ['⚛', '🧬', '🔬', '🧪', '🌿', '⚡', '🔥', '💧', '🌊', '☀️', '🌙', '⭐', '🧠', '🦴', '🩸'],
      cc: ['⚖️', '🤝', '🗳️', '🗣️', '📢', '👥', '👤', '🏛️', '🛡️', '❤️', '🤲', '✊', '✋', '👋', '💪'],
      en: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
    };

    const tips = [
      "No memorices las respuestas. Entiende el proceso lógico detrás de cada solución.",
      "Lee todo el enunciado antes de responder. La clave siempre está en los detalles.",
      "Practica con timer. En el examen real tendrás 5 minutos por pregunta.",
      "Si no sabes, usa la eliminación. Descarta las opciones que seguro están mal.",
      "Revisa los términos del glosario. Entender el vocabulario técnico es clave.",
      "Practica regularmente. La constancia supera al talento."
    ];

    let currentTip = 0;
    function updateTip() {
      const tipEl = document.getElementById('tipCurrent');
      tipEl.style.opacity = 0;
      setTimeout(() => {
        tipEl.textContent = tips[currentTip];
        tipEl.style.opacity = 1;
      }, 300);
    }

    function spawnBackgroundIcons(area) {
      const canvas = document.getElementById('heroBg');
      if (!canvas) return;
      canvas.innerHTML = '';
      const icons = AREA_ICONS[area] || AREA_ICONS.mat;
      
      for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.className = 'hero-bg-item';
        el.textContent = icons[i % icons.length];
        el.style.cssText = `
          top: ${Math.random() * 90 + 5}%;
          left: ${Math.random() * 90 + 5}%;
          font-size: ${35 + Math.random() * 55}px;
          animation-delay: ${Math.random() * 5}s;
          animation-duration: ${12 + Math.random() * 12}s;
        `;
        canvas.appendChild(el);
      }
    }

    function updateArea(area) {
      const header = document.getElementById('heroHeader');
      header.dataset.area = area;
      spawnBackgroundIcons(area);
    }

    document.querySelectorAll('.area-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const area = card.dataset.area;
        updateArea(area);
      });
    });

    updateTip();
    spawnBackgroundIcons('mat');

    setInterval(() => {
      currentTip = (currentTip + 1) % tips.length;
      updateTip();
    }, 6000);
  </script>
</body>
</html>