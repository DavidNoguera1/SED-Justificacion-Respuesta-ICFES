const rand = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const loadSVGIcon = (area, iconName) => {
  const icons = {
    mat: { sum: '∑', pi: 'π', sqrt: '√', integral: '∫', x2: 'x²', graph: '📊' },
    lc: { book: '📖', pen: '✏️', quote: '"', paragraph: '¶', magnify: '🔍' },
    cn: { atom: '⚛️', dna: '🧬', microscope: '🔬', beaker: '🧪', leaf: '🌿' },
    cc: { scale: '⚖️', hands: '🤝', map: '🗺️', shield: '🛡️', people: '👥' },
    ing: { 'letter-a': 'A', speech: '💬', flag: '🚩', grammar: '📝', abc: 'ABC' }
  };
  return icons[area]?.[iconName] || '•';
};

class DOM {
  static $(sel, ctx = document) {
    return ctx.querySelector(sel);
  }
  static $$(sel, ctx = document) {
    return Array.from(ctx.querySelectorAll(sel));
  }
  static create(tag, props = {}) {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'style') Object.assign(el.style, v);
      else if (k === 'class') el.className = v;
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else el[k] = v;
    });
    return el;
  }
}

const slugify = text => text.toLowerCase().replace(/[^\w]+/g, '-');

const truncate = (str, len = 80) => {
  if (!str || str.length <= len) return str;
  return str.substring(0, len).trim() + '...';
};

const escapeHtml = str => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

const getParam = name => {
  const params = new URLSearchParams(location.search);
  return params.get(name);
};

const setBodyDataArea = area => {
  if (area) document.body.dataset.area = area;
};

const renderNotFound = () => {
  document.getElementById('explanation-mount').innerHTML = `
    <div class="explanation-card">
      <h2>Pregunta no encontrada</h2>
      <p>La pregunta solicitada no existe o ha sido eliminada.</p>
      <a href="index.php" class="btn btn-primary">Volver al inicio</a>
    </div>
  `;
};