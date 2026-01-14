// DOM Utilities - Helpers para manipulación del DOM

/**
 * Crea un elemento HTML desde un string
 */
export function createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

/**
 * Limpia el contenido de un elemento
 */
export function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Renderiza contenido en un elemento
 */
export function render(element, html) {
    if (typeof html === 'string') {
        element.innerHTML = html;
    } else if (html instanceof Node) {
        clearElement(element);
        element.appendChild(html);
    }
}

/**
 * Formatea una fecha en formato legible
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Escapa HTML para prevenir XSS
 */
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Obtiene el valor de un input/textarea/select de forma segura
 */
export function getInputValue(selector) {
    const element = document.querySelector(selector);
    return element ? element.value.trim() : '';
}

/**
 * Muestra errores de validación en un formulario
 */
export function showErrors(errors, containerId = 'errors-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (errors.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    container.innerHTML = `
    <div style="background-color: hsl(0, 70%, 95%); 
                border-left: 4px solid var(--color-negative); 
                padding: var(--space-md); 
                border-radius: var(--border-radius-md);
                margin-bottom: var(--space-lg);">
      <strong style="color: var(--color-negative);">Errores de validación:</strong>
      <ul style="margin-top: var(--space-sm); padding-left: var(--space-lg); list-style: disc;">
        ${errors.map(err => `<li>${escapeHtml(err)}</li>`).join('')}
      </ul>
    </div>
  `;
}
