/*
 * area.js
 * Configuracion visual del area y fondo decorativo.
 */

function spawnBackgroundIcons(area) {
  const canvas = document.querySelector('.bg-canvas');
  if (!canvas) return;
  
  const cacheKey = 'bg_icons_' + area;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    canvas.innerHTML = cached;
    return;
  }
  
  canvas.innerHTML = '';
  const icons = BG_AREA_ICONS[area] || BG_AREA_ICONS.mat;
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'hero-bg-item';
    el.textContent = icons[i % icons.length];
    const top = 5 + (i * 5) % 90;
    const left = 5 + (i * 7) % 90;
    const size = 35 + (i * 3) % 55;
    const delay = (i * 0.3) % 5;
    const duration = 12 + (i % 3) * 4;
    el.style.cssText = 'top: ' + top + '%; left: ' + left + '%; font-size: ' + size + 'px; animation-delay: ' + delay + 's; animation-duration: ' + duration + 's;';
    fragment.appendChild(el);
  }
  
  canvas.appendChild(fragment);
  try { sessionStorage.setItem(cacheKey, canvas.innerHTML); } catch(e) {}
}

function configureArea(area) {
  var configArea = area;
  if (area === 'cc' || area === 'soc') configArea = 'soc';

  const config = AREA_CONFIG[configArea] || AREA_CONFIG.mat;
  const header = document.getElementById('headerArea');
  const sidebar = document.getElementById('questionSidebar');
  const sidebarHeader = document.getElementById('sidebarHeader');
  const badge = document.getElementById('areaBadge');
  const icon = document.getElementById('areaIcon');
  const sidebarIcon = document.getElementById('sidebarIcon');
  const sidebarAreaName = document.getElementById('sidebarAreaName');

  header.className = 'bg-' + config.color + '-dark text-white py-6 shadow-md transition-colors duration-300';
  sidebarHeader.className = 'p-5 text-white bg-' + config.color + '-dark transition-colors duration-300';
  badge.textContent = config.name + ' - ID: 0';
  icon.className = 'fas ' + config.icon + ' text-4xl opacity-80';
  sidebarIcon.className = 'fas ' + config.icon + ' text-3xl opacity-90 mb-3 block';
  sidebarAreaName.textContent = config.name;

  document.body.dataset.area = area;
}