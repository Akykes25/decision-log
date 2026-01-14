// Evaluate View - Vista para evaluar una decisión

import { router } from '../router.js';
import { store } from '../../core/store.js';
import { validateEvaluation } from '../../core/model.js';
import { escapeHtml, formatDate, showErrors, getInputValue } from '../../utils/dom.js';

/**
 * Renderiza la vista de evaluación
 */
export function EvaluateView(params) {
  const decision = store.getDecisionById(params.id);

  if (!decision) {
    router.navigate('');
    return;
  }

  if (!decision.canEvaluate()) {
    alert('Esta decisión no puede ser evaluada en su estado actual.');
    router.navigate(`decision/${params.id}`);
    return;
  }

  const appContainer = document.getElementById('app');

  appContainer.innerHTML = `
    <header class="app-header">
      <div class="container">
        <h1 class="app-title" onclick="location.hash = ''">Decision Log</h1>
      </div>
    </header>

    <main class="main-content">
      <div class="container container-narrow">
        <div class="form-container">
          <h2 class="page-title mb-lg">Evaluar Decisión</h2>

          <!-- Resumen de la decisión original -->
          <div style="background-color: var(--color-neutral-50); padding: var(--space-lg); border-radius: var(--border-radius-md); margin-bottom: var(--space-xl); border-left: 4px solid var(--color-primary);">
            <h3 style="margin-bottom: var(--space-md); font-size: var(--font-size-lg);">
              ${escapeHtml(decision.title)}
            </h3>
            <p class="text-secondary" style="margin-bottom: var(--space-sm);">
              <strong>Fecha de decisión:</strong> ${formatDate(decision.date)}
            </p>
            <p class="text-secondary" style="margin-bottom: var(--space-sm);">
              <strong>Decisión tomada:</strong> ${escapeHtml(decision.chosen)}
            </p>
            <p class="text-secondary">
              <strong>Contexto:</strong> ${escapeHtml(decision.context)}
            </p>
          </div>

          <div id="errors-container"></div>

          <form id="evaluate-form">
            <!-- Resultado -->
            <div class="form-group">
              <label class="form-label">Resultado *</label>
              <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
                <label style="display: flex; align-items: center; cursor: pointer;">
                  <input type="radio" name="result" value="POSITIVE" required style="margin-right: var(--space-sm);">
                  <span class="result-badge result-badge--positive">Positiva</span>
                </label>
                <label style="display: flex; align-items: center; cursor: pointer;">
                  <input type="radio" name="result" value="NEUTRAL" required style="margin-right: var(--space-sm);">
                  <span class="result-badge result-badge--neutral">Neutral</span>
                </label>
                <label style="display: flex; align-items: center; cursor: pointer;">
                  <input type="radio" name="result" value="NEGATIVE" required style="margin-right: var(--space-sm);">
                  <span class="result-badge result-badge--negative">Negativa</span>
                </label>
              </div>
              <small class="text-muted">¿Cómo resultó la decisión después de implementarla?</small>
            </div>

            <!-- Aprendizajes -->
            <div class="form-group">
              <label for="learnings" class="form-label">Aprendizajes *</label>
              <textarea 
                id="learnings" 
                class="form-textarea" 
                placeholder="¿Qué aprendiste de esta decisión? ¿Qué harías diferente?"
                required
                style="min-height: 150px;"
              ></textarea>
              <small class="text-muted">
                Documenta tus aprendizajes: ¿Se cumplieron las expectativas? ¿Hubo sorpresas? ¿Qué considerarías en una decisión similar?
              </small>
            </div>

            <!-- Acciones -->
            <div class="form-actions">
              <button type="button" onclick="location.hash = 'decision/${decision.id}'" class="btn-secondary">
                Cancelar
              </button>
              <button type="submit">
                Guardar Evaluación
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  `;

  attachEventListeners(decision.id);
}

/**
 * Adjunta event listeners
 */
function attachEventListeners(decisionId) {
  document.getElementById('evaluate-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const result = document.querySelector('input[name="result"]:checked')?.value;
    const learnings = getInputValue('#learnings');

    // Validar
    const errors = validateEvaluation(result, learnings);
    if (errors.length > 0) {
      showErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      store.evaluateDecision(decisionId, result, learnings);
      router.navigate(`decision/${decisionId}`);
    } catch (error) {
      showErrors([error.message]);
    }
  });
}
