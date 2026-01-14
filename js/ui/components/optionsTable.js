// Options Table Component - Tabla de comparación de opciones con pros/cons

import { escapeHtml } from '../../utils/dom.js';

/**
 * Renderiza una tabla de opciones con pros y cons
 */
export function OptionsTable(options, chosenOption) {
  if (!options || options.length === 0) {
    return '<p class="text-muted">No hay opciones registradas</p>';
  }

  return `
    <table class="options-table">
      <thead>
        <tr>
          <th>Opción</th>
          <th>Pros</th>
          <th>Cons</th>
        </tr>
      </thead>
      <tbody>
        ${options.map(option => {
    const isChosen = option.name === chosenOption;
    return `
            <tr class="${isChosen ? 'chosen' : ''}">
              <td>
                <strong>${escapeHtml(option.name)}</strong>
                ${isChosen ? '<br><span class="status-badge status-badge--evaluated" style="margin-top: 4px; font-size: 11px;">ELEGIDA</span>' : ''}
              </td>
              <td>
                ${option.pros && option.pros.length > 0
        ? `<ul>${option.pros.map(pro => `<li>${escapeHtml(pro)}</li>`).join('')}</ul>`
        : '<span class="text-muted">—</span>'}
              </td>
              <td>
                ${option.cons && option.cons.length > 0
        ? `<ul>${option.cons.map(con => `<li>${escapeHtml(con)}</li>`).join('')}</ul>`
        : '<span class="text-muted">—</span>'}
              </td>
            </tr>
          `;
  }).join('')}
      </tbody>
    </table>
  `;
}
