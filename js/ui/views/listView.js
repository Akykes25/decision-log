// List View - Vista principal con lista de decisiones

import { router } from '../router.js';
import { store } from '../../core/store.js';
import { DecisionCard } from '../components/decisionCard.js';

/**
 * Renderiza la lista de decisiones
 */
export function ListView() {
    const decisions = store.getDecisions();
    const currentFilter = store.state.currentFilter;
    const stats = store.getStats();

    const appContainer = document.getElementById('app');

    appContainer.innerHTML = `
    <!-- Header -->
    <header class="app-header">
      <div class="container">
        <h1 class="app-title" onclick="location.hash = ''">Decision Log</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- Page Header -->
        <div class="page-header">
          <div>
            <h2 class="page-title">Mis Decisiones</h2>
            <p class="text-secondary">
              ${stats.total} decisiones totales · 
              ${stats.pending} pendientes · 
              ${stats.executed} ejecutadas · 
              ${stats.evaluated} evaluadas
            </p>
          </div>
          <div class="page-actions">
            <button onclick="location.hash = 'new'">+ Nueva Decisión</button>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters">
          <button class="filter-btn ${currentFilter === 'ALL' ? 'active' : ''}" data-filter="ALL">
            Todas (${stats.total})
          </button>
          <button class="filter-btn ${currentFilter === 'PENDING' ? 'active' : ''}" data-filter="PENDING">
            Pendientes (${stats.pending})
          </button>
          <button class="filter-btn ${currentFilter === 'EXECUTED' ? 'active' : ''}" data-filter="EXECUTED">
            Ejecutadas (${stats.executed})
          </button>
          <button class="filter-btn ${currentFilter === 'EVALUATED' ? 'active' : ''}" data-filter="EVALUATED">
            Evaluadas (${stats.evaluated})
          </button>
        </div>

        <!-- Decisions Grid -->
        <div id="decisions-container">
          ${decisions.length === 0 ? renderEmptyState() : renderDecisionsGrid(decisions)}
        </div>
      </div>
    </main>
  `;

    attachEventListeners();
}

/**
 * Renderiza el grid de decisiones
 */
function renderDecisionsGrid(decisions) {
    return `
    <div class="decision-grid">
      ${decisions.map(decision => DecisionCard(decision)).join('')}
    </div>
  `;
}

/**
 * Renderiza el estado vacío
 */
function renderEmptyState() {
    const currentFilter = store.state.currentFilter;

    if (currentFilter === 'ALL') {
        return `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <h3 class="empty-state-title">No hay decisiones registradas</h3>
        <p class="empty-state-description">
          Comienza a documentar tus decisiones importantes para aprender de ellas con el tiempo.
        </p>
        <button onclick="location.hash = 'new'" style="margin-top: var(--space-lg);">
          Crear Primera Decisión
        </button>
      </div>
    `;
    } else {
        const filterNames = {
            'PENDING': 'pendientes',
            'EXECUTED': 'ejecutadas',
            'EVALUATED': 'evaluadas'
        };

        return `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No hay decisiones ${filterNames[currentFilter]}</h3>
        <p class="empty-state-description">
          Intenta con otro filtro o crea una nueva decisión.
        </p>
      </div>
    `;
    }
}

/**
 * Adjunta event listeners
 */
function attachEventListeners() {
    // Click en filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            store.setFilter(filter);
        });
    });

    // Click en cards de decisión
    document.querySelectorAll('.card-clickable').forEach(card => {
        card.addEventListener('click', (e) => {
            const id = card.dataset.id;
            router.navigate(`decision/${id}`);
        });
    });
}
