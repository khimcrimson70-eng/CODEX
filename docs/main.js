// Configuration: replace API_URL with a real hero data endpoint when available.
const API_URL = 'https://api.example.com/mlbb/heroes';

const sampleHeroes = [
  {
    id: 'alucard',
    name: 'Alucard',
    role: 'Fighter/Assassin',
    description: 'A powerful lifesteal fighter who excels at single-target burst and dueling.',
    stats: { winRate: 52.3, banRate: 1.2, pickRate: 8.4 }
  },
  {
    id: 'miya',
    name: 'Miya',
    role: 'Marksman',
    description: 'A ranged marksman with strong late-game scaling and multi-target damage.',
    stats: { winRate: 50.1, banRate: 0.5, pickRate: 10.7 }
  },
  {
    id: 'gord',
    name: 'Gord',
    role: 'Mage',
    description: 'A poke mage who deals heavy magic damage from range.',
    stats: { winRate: 48.9, banRate: 0.3, pickRate: 4.1 }
  }
];

const els = {
  status: document.getElementById('status'),
  heroSelect: document.getElementById('heroSelect'),
  heroCard: document.getElementById('heroCard'),
  heroName: document.getElementById('heroName'),
  heroRole: document.getElementById('heroRole'),
  heroDesc: document.getElementById('heroDesc'),
  winRate: document.getElementById('winRate'),
  banRate: document.getElementById('banRate'),
  pickRate: document.getElementById('pickRate')
};

function setStatus(text) {
  if (els.status) els.status.textContent = 'Status: ' + text;
}

function formatPercent(n) {
  return typeof n === 'number' ? n.toFixed(1) + '%' : '-';
}

async function fetchHeroes() {
  setStatus('Fetching heroes from API…');
  try {
    const res = await fetch(API_URL, {cache: 'no-store'});
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    setStatus('Loaded heroes from API');
    return data.heroes || data || [];
  } catch (err) {
    console.warn('Failed to fetch heroes, using sample dataset:', err);
    setStatus('Using local fallback dataset (offline or API error)');
    return sampleHeroes;
  }
}

function populateHeroSelect(heroes) {
  els.heroSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = '— select a hero —';
  els.heroSelect.appendChild(placeholder);

  heroes.forEach(h => {
    const opt = document.createElement('option');
    opt.value = h.id || h.name;
    opt.textContent = h.name || h.id;
    opt.dataset.payload = JSON.stringify(h);
    els.heroSelect.appendChild(opt);
  });
}

function showHero(hero) {
  if (!hero) {
    els.heroCard.classList.add('hidden');
    return;
  }
  els.heroName.textContent = hero.name || '-';
  els.heroRole.textContent = hero.role || '-';
  els.heroDesc.textContent = hero.description || '-';
  const s = hero.stats || {};
  els.winRate.textContent = formatPercent(s.winRate);
  els.banRate.textContent = formatPercent(s.banRate);
  els.pickRate.textContent = formatPercent(s.pickRate);
  els.heroCard.classList.remove('hidden');
}

async function init() {
  const heroes = await fetchHeroes();
  if (!Array.isArray(heroes) || heroes.length === 0) {
    setStatus('No heroes available');
    populateHeroSelect([]);
    return;
  }
  populateHeroSelect(heroes);
  setStatus('Ready');

  els.heroSelect.addEventListener('change', (e) => {
    const idx = e.target.selectedIndex;
    const opt = e.target.options[idx];
    if (!opt || !opt.dataset.payload) return showHero(null);
    const hero = JSON.parse(opt.dataset.payload);
    showHero(hero);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
