// Detail View - Vista de detalle de una decisión

import { router } from '../router.js';
import { store } from '../../core/store.js';
import { formatDate, escapeHtml } from '../../utils/dom.js';
import { OptionsTable } from '../components/optionsTable.js';

/**
 * Renderiza la vista de detalle
 */
export function DetailView(params) {
  const decision = store.getDecisionById(params.id);

  if (!decision) {
    return NotFoundView();
  }

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
      <div class="container container-narrow">
        <div class="detail-container">
          <!-- Header -->
          <div class="detail-header">
            <h2 class="page-title mb-md">${escapeHtml(decision.title)}</h2>
            <div class="detail-meta">
              <span class="status-badge status-badge--${decision.status.toLowerCase()}">
                ${getStatusText(decision.status)}
              </span>
              <span class="text-secondary">${formatDate(decision.date)}</span>
            </div>
          </div>

          <!-- Context -->
          <div class="detail-section">
            <h3 class="detail-section-title">Contexto</h3>
            <p>${escapeHtml(decision.context)}</p>
          </div>

          <!-- Options -->
          <div class="detail-section">
            <h3 class="detail-section-title">Opciones Evaluadas</h3>
            ${OptionsTable(decision.options, decision.chosen)}
          </div>

          <!-- Evaluation (if exists) -->
          ${decision.evaluation ? renderEvaluation(decision.evaluation) : ''}

          <!-- Actions -->
          <div class="detail-actions">
            <button onclick="location.hash = 'edit/${decision.id}'" class="btn-secondary">
              Editar
            </button>
            
            ${decision.canExecute() ? `
              <button id="mark-executed-btn">
                Marcar como Ejecutada
              </button>
            ` : ''}
            
            ${decision.canEvaluate() ? `
              <button onclick="location.hash = 'evaluate/${decision.id}'">
                Evaluar Decisión
              </button>
            ` : ''}
            
            <button id="delete-btn" class="btn-secondary" style="margin-left: auto;">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </main>
  `;

  attachEventListeners(decision.id);
}

/**
 * Renderiza la sección de evaluación
 */
function renderEvaluation(evaluation) {
  const resultMap = {
    'POSITIVE': { text: 'Positiva', class: 'positive' },
    'NEGATIVE': { text: 'Negativa', class: 'negative' },
    'NEUTRAL': { text: 'Neutral', class: 'neutral' }
  };

  const result = resultMap[evaluation.result];

  return `
    <div class="detail-section" style="background-color: var(--color-neutral-50); padding: var(--space-lg); border-radius: var(--border-radius-md);">
      <h3 class="detail-section-title">Evaluación</h3>
      <div style="margin-bottom: var(--space-md);">
        <strong>Resultado:</strong>
        <span class="result-badge result-badge--${result.class}" style="margin-left: var(--space-sm);">
          ${result.text}
        </span>
      </div>
      <div style="margin-bottom: var(--space-sm);">
        <strong>Fecha de evaluación:</strong> ${formatDate(evaluation.evaluatedAt)}
      </div>
      <div>
        <strong>Aprendizajes:</strong>
        <p style="margin-top: var(--space-sm);">${escapeHtml(evaluation.learnings)}</p>
      </div>
    </div>
  `;
}

/**
 * Vista de decisión no encontrada
 */
function NotFoundView() {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = `
    <header class="app-header">
      <div class="container">
        <h1 class="app-title" onclick="location.hash = ''">Decision Log</h1>
      </div>
    </header>
    <main class="main-content">
      <div class="container">
        <div class="empty-state">
          <div class="empty-state-icon">❌</div>
          <h3 class="empty-state-title">Decisión no encontrada</h3>
          <p class="empty-state-description">
            La decisión que buscas no existe o fue eliminada.
          </p>
          <button onclick="location.hash = ''" style="margin-top: var(--space-lg);">
            Volver a la Lista
          </button>
        </div>
      </div>
    </main>
  `;
}

/**
 * Obtiene el texto del estado
 */
function getStatusText(status) {
  const map = {
    'PENDING': 'Pendiente',
    'EXECUTED': 'Ejecutada',
    'EVALUATED': 'Evaluada'
  };
  return map[status] || status;
}

/**
 * Adjunta event listeners
 */
function attachEventListeners(decisionId) {
  // Marcar como ejecutada
  const executeBtn = document.getElementById('mark-executed-btn');
  if (executeBtn) {
    executeBtn.addEventListener('click', () => {
      if (confirm('¿Marcar esta decisión como ejecutada?')) {
        store.markAsExecuted(decisionId);
        // La vista se recargará automáticamente por el observer
      }
    });
  }

  // Eliminar
  const deleteBtn = document.getElementById('delete-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de eliminar esta decisión? Esta acción no se puede deshacer.')) {
        store.deleteDecision(decisionId);
        router.navigate('');
      }
    });
  }
}
