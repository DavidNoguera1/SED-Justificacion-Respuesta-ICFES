<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Área — Apoyo ICFES</title>
  <link rel="stylesheet" href="../shared/css/variables.css">
  <link rel="stylesheet" href="../shared/css/base.css">
  <link rel="stylesheet" href="../shared/css/layout.css">
  <link rel="stylesheet" href="../shared/css/components.css">
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
      <div class="question-list" id="question-list">
    <p class="text-gray-500">Cargando...</p>
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
      const canvas = document.getElementById('heroBg');
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
    
    async function fetchQuestionsFromDB(subject) {
      try {
        const response = await fetch('../api/questions.php?subject=' + subject);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data;
      } catch (e) {
        console.error('Error fetching questions:', e);
        return [];
      }
    }
    
    (async function() {
      const params = new URLSearchParams(location.search);
      const areaUrl = params.get('area') || 'mat';
      const subject = AREA_SUBJECT[areaUrl] || areaUrl;
      
      document.body.dataset.area = areaUrl;
      document.getElementById('breadcrumb-area').textContent = AREA_NAMES[areaUrl] || areaUrl;
      document.getElementById('area-title').textContent = 'Preguntas de ' + (AREA_NAMES[areaUrl] || areaUrl);
      
      spawnBackgroundIcons(areaUrl);
      
      const list = document.getElementById('question-list');
      
      const questions = await fetchQuestionsFromDB(subject);
      
      if (questions.length === 0) {
        list.innerHTML = '<p class="text-soft">No hay preguntas para esta área.</p>';
        return;
      }
      
      questions.sort((a, b) => a.id - b.id);
      
      const questionsToShow = questions.slice(0, 15);
      
      questionsToShow.forEach(function(q) {
        const item = document.createElement('a');
        item.href = 'justification.php?id=' + q.id + '&area=' + areaUrl;
        item.className = 'question-list-item';
        const qtext = q.text || 'Pregunta #' + q.id;
        item.innerHTML = '<span class="qli-id">#' + q.id + '</span><p class="qli-text">' + truncate(qtext, 80) + '</p><span class="qli-arrow">→</span>';
        list.appendChild(item);
      });
    })();
  </script>
</body>
</html>