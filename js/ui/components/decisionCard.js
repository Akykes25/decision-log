// Decision Card Component - Card de decisión para la lista

import { escapeHtml, formatDate } from '../../utils/dom.js';

/**
 * Renderiza un badge de estado
 */
function statusBadge(status) {
  const statusMap = {
    'PENDING': 'Pendiente',
    'EXECUTED': 'Ejecutada',
    'EVALUATED': 'Evaluada'
  };

  const statusClass = status.toLowerCase();
  const statusText = statusMap[status] || status;

  return `<span class="status-badge status-badge--${statusClass}">${statusText}</span>`;
}

/**
 * Renderiza una card de decisión
 */
export function DecisionCard(decision) {
  return `
    <div class="card card-clickable" data-id="${decision.id}">
      <div class="card-header">
        <div>
          <h3 class="card-title">${escapeHtml(decision.title)}</h3>
          <p class="card-date">${formatDate(decision.date)}</p>
        </div>
        ${statusBadge(decision.status)}
      </div>
      
      <p class="text-secondary" style="margin-top: var(--space-md);">
        ${escapeHtml(decision.context.substring(0, 120))}${decision.context.length > 120 ? '...' : ''}
      </p>
      
      <div style="margin-top: var(--space-md); font-size: var(--font-size-sm); color: var(--color-text-secondary);">
        <strong>Decisión tomada:</strong> ${escapeHtml(decision.chosen)}
      </div>
    </div>
  `;
}
