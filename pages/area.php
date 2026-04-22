<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Área — Apoyo ICFES</title>
  <link rel="stylesheet" href="../shared/css/variables.css">
  <link rel="stylesheet" href="../shared/css/base.css">
  <link rel="stylesheet" href="../shared/css/layout.css">
  <link rel="stylesheet" href="../shared/css/components.css?v=3">
  <link rel="stylesheet" href="../shared/css/backgrounds.css">
</head>
<body>

  <div class="bg-canvas" aria-hidden="true"></div>

  <header class="site-header">
    <div class="container">
      <a href="../index.php" style="text-decoration:none;">
        <h1 class="site-title">Apoyo ICFES</h1>
      </a>
      <p class="site-subtitle">Entiende el <em>por qué</em> de cada respuesta</p>
    </div>
  </header>

  <nav class="breadcrumb container" aria-label="Navegación">
    <a href="../index.php">Inicio</a>
    <span aria-hidden="true">›</span>
    <span id="breadcrumb-area">Área</span>
  </nav>

  <main class="container" style="position:relative; z-index:1;">
    <section class="area-list">
      <h2 class="section-title" id="area-title">Preguntas</h2>
      <div class="filter-bar" id="filter-bar" style="display:none;">
        <span class="filter-bar__label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filtrar por
        </span>
        <div class="filter-group" id="fg-competency" style="display:none;">
          <label for="filter-competency">Competencia</label>
          <select id="filter-competency" class="filter-select">
            <option value="">Todas</option>
          </select>
        </div>
        <div class="filter-group" id="fg-level" style="display:none;">
          <label for="filter-level">Nivel</label>
          <select id="filter-level" class="filter-select">
            <option value="">Todos</option>
          </select>
        </div>
        <div class="filter-group" id="fg-component" style="display:none;">
          <label for="filter-component">Componente</label>
          <select id="filter-component" class="filter-select">
            <option value="">Todos</option>
          </select>
        </div>
        <button id="clear-filters" class="filter-clear-btn" style="display:none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Limpiar
        </button>
      </div>
      <div class="question-list" id="question-list">
        <p class="text-soft">Cargando...</p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>Material de apoyo pedagógico — No oficial</p>
  </footer>

  <script>
    const AREA_NAMES = {
      mat: 'Matemáticas',
      lc: 'Lectura Crítica',
      cn: 'Ciencias Naturales',
      cc: 'Competencias Ciudadanas',
      soc: 'Competencias Ciudadanas',
      en: 'Inglés'
    };
    
    const AREA_SUBJECT = {
      mat: 'mat',
      lc: 'lc',
      cn: 'cn',
      cc: 'soc',
      soc: 'soc',
      en: 'ing'
    };
    
    const AREA_ICONS = {
      mat: ['∑', '∫', 'π', '√', '≈', 'Δ', 'Ω', 'λ', '∞'],
      lc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      cn: ['⚛', '🧬', '🔬', '🧪', '🌿', '⚡', '🔥', '💧', '🌊'],
      cc: ['⚖️', '🤝', '🗳️', '🗣️', '📢', '👥', '👤', '🏛️', '🛡️'],
      en: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      ing: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    };
    
    function truncate(str, len) {
      if (!str || str.length <= len) return str;
      return str.substring(0, len).trim() + '...';
    }
    
    function spawnBackgroundIcons(area) {
      const canvas = document.querySelector('.bg-canvas');
      if (!canvas) return;
      canvas.innerHTML = '';
      const icons = AREA_ICONS[area] || AREA_ICONS.mat;
      for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.className = 'hero-bg-item';
        el.textContent = icons[i % icons.length];
        el.style.cssText = 'top: ' + (Math.random() * 90 + 5) + '%; left: ' + (Math.random() * 90 + 5) + '%; font-size: ' + (35 + Math.random() * 55) + 'px; animation-delay: ' + (Math.random() * 5) + 's; animation-duration: ' + (12 + Math.random() * 12) + 's;';
        canvas.appendChild(el);
      }
    }
    
    async function fetchFromAPI(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        return await response.json();
      } catch (e) {
        console.error('Error fetching:', e);
        return null;
      }
    }
    
    function populateSelect(id, values) {
      const select = document.getElementById(id);
      select.innerHTML = '<option value="">Todos</option>';
      values.forEach(val => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        select.appendChild(opt);
      });
    }
    
    function renderQuestions(questions) {
      const list = document.getElementById('question-list');
      list.innerHTML = '';
      
      if (questions.length === 0) {
        list.innerHTML = '<p class="text-soft">No hay preguntas para esta área.</p>';
        return;
      }
      
      questions.sort((a, b) => a.id - b.id);
      const questionsToShow = questions.slice(0, 15);
      
      questionsToShow.forEach(function(q) {
        const item = document.createElement('a');
        item.href = 'justification.php?id=' + q.id + '&area=' + currentArea;
        item.className = 'question-list-item';
        const qtext = q.text || 'Pregunta #' + q.id;
        item.innerHTML = '<span class="qli-id">#' + q.id + '</span><p class="qli-text">' + truncate(qtext, 80) + '</p><span class="qli-arrow">→</span>';
        list.appendChild(item);
      });
    }
    
    let currentArea = 'mat';
    let currentSubject = 'mat';
    let allQuestions = [];
    
    async function applyFilters() {
      const competency = document.getElementById('filter-competency').value;
      const level = document.getElementById('filter-level').value;
      const component = document.getElementById('filter-component').value;
      
      const params = new URLSearchParams();
      params.append('subject', currentSubject);
      if (competency) params.append('competency', competency);
      if (level) params.append('level', level);
      if (component) params.append('component', component);
      
      const filtered = await fetchFromAPI('../api/questions.php?' + params.toString());
      if (filtered !== null) {
        renderQuestions(filtered);
      }
    }
    
    async function loadUniqueValues() {
      const data = await fetchFromAPI('../api/questions.php?subject=' + currentSubject + '&uniqueFields=1');
      if (!data) return;
      
      const fields = ['competency', 'level', 'component'];
      let hasFilters = false;
      
      fields.forEach(field => {
        const group = document.getElementById('fg-' + field);
        if (data[field] && data[field].length > 0) {
          populateSelect('filter-' + field, data[field]);
          group.style.display = '';
          hasFilters = true;
        } else {
          group.style.display = 'none';
        }
      });
      
      document.getElementById('filter-bar').style.display = hasFilters ? '' : 'none';
      document.getElementById('clear-filters').style.display = hasFilters ? '' : 'none';
    }
    
    (async function() {
      const params = new URLSearchParams(location.search);
      currentArea = params.get('area') || 'mat';
      currentSubject = AREA_SUBJECT[currentArea] || currentArea;
      
      document.body.dataset.area = currentArea;
      document.getElementById('breadcrumb-area').textContent = AREA_NAMES[currentArea] || currentArea;
      document.getElementById('area-title').textContent = 'Preguntas de ' + (AREA_NAMES[currentArea] || currentArea);
      
      spawnBackgroundIcons(currentArea);
      
      allQuestions = await fetchFromAPI('../api/questions.php?subject=' + currentSubject);
      if (allQuestions !== null) {
        renderQuestions(allQuestions);
        await loadUniqueValues();
      } else {
        document.getElementById('question-list').innerHTML = '<p class="text-soft">Error al cargar preguntas.</p>';
      }
      
      document.getElementById('filter-competency').addEventListener('change', applyFilters);
      document.getElementById('filter-level').addEventListener('change', applyFilters);
      document.getElementById('filter-component').addEventListener('change', applyFilters);
      
      document.getElementById('clear-filters').addEventListener('click', function() {
        document.getElementById('filter-competency').value = '';
        document.getElementById('filter-level').value = '';
        document.getElementById('filter-component').value = '';
        applyFilters();
      });
    })();
  </script>
</body>
</html>