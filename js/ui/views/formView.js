// Form View - Vista para crear y editar decisiones

import { router } from '../router.js';
import { store } from '../../core/store.js';
import { validateDecision } from '../../core/model.js';
import { escapeHtml, showErrors, getInputValue } from '../../utils/dom.js';

/**
 * Renderiza el formulario de creación/edición
 */
export function FormView(params = {}) {
  const isEditing = params.id !== undefined;
  const decision = isEditing ? store.getDecisionById(params.id) : null;

  if (isEditing && !decision) {
    router.navigate('');
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
          <h2 class="page-title mb-lg">${isEditing ? 'Editar Decisión' : 'Nueva Decisión'}</h2>

          <div id="errors-container"></div>

          <form id="decision-form">
            <!-- Título -->
            <div class="form-group">
              <label for="title" class="form-label">Título *</label>
              <input 
                type="text" 
                id="title" 
                class="form-input" 
                placeholder="Ej: Migrar de MySQL a PostgreSQL"
                value="${isEditing ? escapeHtml(decision.title) : ''}"
                required
              >
            </div>

            <!-- Fecha -->
            <div class="form-group">
              <label for="date" class="form-label">Fecha *</label>
              <input 
                type="date" 
                id="date" 
                class="form-input"
                value="${isEditing ? decision.date : new Date().toISOString().split('T')[0]}"
                required
              >
            </div>

            <!-- Contexto -->
            <div class="form-group">
              <label for="context" class="form-label">Contexto *</label>
              <textarea 
                id="context" 
                class="form-textarea" 
                placeholder="¿Por qué estás tomando esta decisión? ¿Qué problema resuelve?"
                required
              >${isEditing ? escapeHtml(decision.context) : ''}</textarea>
              <small class="text-muted">Explica el contexto y la situación que motiva esta decisión</small>
            </div>

            <!-- Opciones -->
            <div class="form-group">
              <label class="form-label">Opciones Consideradas *</label>
              <div class="options-builder">
                <div id="options-list">
                  ${isEditing ? renderExistingOptions(decision.options) : ''}
                </div>
                <button type="button" id="add-option-btn" class="btn-secondary" style="margin-top: var(--space-md); width: 100%;">
                  + Agregar Opción
                </button>
              </div>
              <small class="text-muted">Agrega al menos 2 opciones para comparar</small>
            </div>

            <!-- Decisión tomada -->
            <div class="form-group">
              <label for="chosen" class="form-label">Decisión Tomada *</label>
              <select id="chosen" class="form-select" required>
                <option value="">Selecciona la opción elegida</option>
              </select>
              <small class="text-muted">Elige una de las opciones que agregaste arriba</small>
            </div>

            <!-- Acciones -->
            <div class="form-actions">
              <button type="button" onclick="location.hash = '${isEditing ? 'decision/' + decision.id : ''}'" class="btn-secondary">
                Cancelar
              </button>
              <button type="submit">
                ${isEditing ? 'Guardar Cambios' : 'Crear Decisión'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  `;

  initializeForm(isEditing ? decision : null);
}

/**
 * Renderiza opciones existentes (modo edición)
 */
function renderExistingOptions(options) {
  return options.map((option, index) => createOptionHTML(option, index)).join('');
}

/**
 * Crea el HTML de una opción
 */
function createOptionHTML(option = { name: '', pros: [], cons: [] }, index) {
  return `
    <div class="option-item" data-index="${index}">
      <div class="option-item-header">
        <input 
          type="text" 
          class="form-input option-name" 
          placeholder="Nombre de la opción" 
          value="${escapeHtml(option.name)}"
          style="flex: 1; margin-right: var(--space-md);"
        >
        <button type="button" class="remove-option-btn btn-secondary btn-small">
          Eliminar
        </button>
      </div>

      <div class="option-lists">
        <!-- Pros -->
        <div>
          <strong style="display: block; margin-bottom: var(--space-sm);">Pros</strong>
          <div class="pros-list pros-cons-list">
            ${option.pros.map(pro => `
              <li>
                <span>${escapeHtml(pro)}</span>
                <button type="button" class="remove-item">✕</button>
              </li>
            `).join('')}
          </div>
          <div style="display: flex; gap: var(--space-sm); margin-top: var(--space-sm);">
            <input type="text" class="form-input pro-input" placeholder="Agregar pro">
            <button type="button" class="add-pro-btn btn-secondary btn-small">+</button>
          </div>
        </div>

        <!-- Cons -->
        <div>
          <strong style="display: block; margin-bottom: var(--space-sm);">Cons</strong>
          <div class="cons-list pros-cons-list">
            ${option.cons.map(con => `
              <li>
                <span>${escapeHtml(con)}</span>
                <button type="button" class="remove-item">✕</button>
              </li>
            `).join('')}
          </div>
          <div style="display: flex; gap: var(--space-sm); margin-top: var(--space-sm);">
            <input type="text" class="form-input con-input" placeholder="Agregar con">
            <button type="button" class="add-con-btn btn-secondary btn-small">+</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Inicializa el formulario con event listeners
 */
function initializeForm(existingDecision) {
  let optionCounter = existingDecision ? existingDecision.options.length : 0;

  // Agregar opción
  document.getElementById('add-option-btn').addEventListener('click', () => {
    const optionsList = document.getElementById('options-list');
    const optionHTML = createOptionHTML({ name: '', pros: [], cons: [] }, optionCounter++);
    optionsList.insertAdjacentHTML('beforeend', optionHTML);
    updateChosenSelect();
    attachOptionListeners();
  });

  // Event delegation para opciones
  document.getElementById('options-list').addEventListener('click', (e) => {
    // Eliminar opción
    if (e.target.classList.contains('remove-option-btn')) {
      e.target.closest('.option-item').remove();
      updateChosenSelect();
    }

    // Eliminar pro/con item
    if (e.target.classList.contains('remove-item')) {
      e.target.closest('li').remove();
    }

    // Agregar pro
    if (e.target.classList.contains('add-pro-btn')) {
      const optionItem = e.target.closest('.option-item');
      const input = optionItem.querySelector('.pro-input');
      const value = input.value.trim();
      if (value) {
        const prosList = optionItem.querySelector('.pros-list');
        prosList.insertAdjacentHTML('beforeend', `
          <li>
            <span>${escapeHtml(value)}</span>
            <button type="button" class="remove-item">✕</button>
          </li>
        `);
        input.value = '';
      }
    }

    // Agregar con
    if (e.target.classList.contains('add-con-btn')) {
      const optionItem = e.target.closest('.option-item');
      const input = optionItem.querySelector('.con-input');
      const value = input.value.trim();
      if (value) {
        const consList = optionItem.querySelector('.cons-list');
        consList.insertAdjacentHTML('beforeend', `
          <li>
            <span>${escapeHtml(value)}</span>
            <button type="button" class="remove-item">✕</button>
          </li>
        `);
        input.value = '';
      }
    }
  });

  // Actualizar select cuando cambia el nombre de una opción
  function attachOptionListeners() {
    document.querySelectorAll('.option-name').forEach(input => {
      input.addEventListener('input', updateChosenSelect);
    });
  }

  attachOptionListeners();
  updateChosenSelect();

  // Submit del formulario
  document.getElementById('decision-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit(existingDecision);
  });
}

/**
 * Actualiza el select de decisión tomada con las opciones disponibles
 */
function updateChosenSelect() {
  const select = document.getElementById('chosen');
  const currentValue = select.value;

  // Obtener nombres de opciones
  const optionNames = Array.from(document.querySelectorAll('.option-name'))
    .map(input => input.value.trim())
    .filter(name => name !== '');

  // Actualizar opciones del select
  select.innerHTML = '<option value="">Selecciona la opción elegida</option>' +
    optionNames.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');

  // Restaurar valor seleccionado si aún existe
  if (optionNames.includes(currentValue)) {
    select.value = currentValue;
  }
}

/**
 * Recolecta los datos del formulario
 */
function collectFormData() {
  const options = [];

  document.querySelectorAll('.option-item').forEach(item => {
    const name = item.querySelector('.option-name').value.trim();
    const pros = Array.from(item.querySelectorAll('.pros-list li span'))
      .map(span => span.textContent.trim());
    const cons = Array.from(item.querySelectorAll('.cons-list li span'))
      .map(span => span.textContent.trim());

    if (name) {
      options.push({ name, pros, cons });
    }
  });

  return {
    title: getInputValue('#title'),
    date: getInputValue('#date'),
    context: getInputValue('#context'),
    options,
    chosen: getInputValue('#chosen')
  };
}

/**
 * Maneja el submit del formulario
 */
function handleSubmit(existingDecision) {
  const data = collectFormData();

  // Validar
  const errors = validateDecision(data);
  if (errors.length > 0) {
    showErrors(errors);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  try {
    if (existingDecision) {
      // Actualizar decisión existente
      store.updateDecision(existingDecision.id, data);
      router.navigate(`decision/${existingDecision.id}`);
    } else {
      // Crear nueva decisión
      const decision = store.addDecision(data);
      router.navigate(`decision/${decision.id}`);
    }
  } catch (error) {
    showErrors([error.message]);
  }
}
