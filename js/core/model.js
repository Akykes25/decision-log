// Model - Definición de entidades y reglas de negocio

/**
 * Genera un ID único para una decisión
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clase Decision - Representa una decisión documentada
 */
export class Decision {
  constructor(data = {}) {
    this.id = data.id || generateId();
    this.title = data.title || '';
    this.date = data.date || new Date().toISOString().split('T')[0];
    this.context = data.context || '';
    this.options = data.options || []; // Array de { name, pros: [], cons: [] }
    this.chosen = data.chosen || '';
    this.status = data.status || 'PENDING';
    this.evaluation = data.evaluation || null; // { result, learnings, evaluatedAt }
  }

  /**
   * Verifica si la decisión puede ser evaluada
   */
  canEvaluate() {
    return this.status === 'EXECUTED';
  }

  /**
   * Verifica si la decisión puede ser marcada como ejecutada
   */
  canExecute() {
    return this.status === 'PENDING';
  }

  /**
   * Marca la decisión como ejecutada
   */
  markAsExecuted() {
    if (!this.canExecute()) {
      throw new Error('Decision cannot be executed in current status');
    }
    this.status = 'EXECUTED';
  }

  /**
   * Evalúa la decisión
   */
  evaluate(result, learnings) {
    if (!this.canEvaluate()) {
      throw new Error('Decision cannot be evaluated in current status');
    }

    this.evaluation = {
      result, // 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
      learnings,
      evaluatedAt: new Date().toISOString().split('T')[0]
    };
    this.status = 'EVALUATED';
  }

  /**
   * Convierte la decisión a un objeto plano para serialización
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      date: this.date,
      context: this.context,
      options: this.options,
      chosen: this.chosen,
      status: this.status,
      evaluation: this.evaluation
    };
  }

  /**
   * Crea una instancia de Decision desde un objeto plano
   */
  static fromJSON(json) {
    return new Decision(json);
  }
}

/**
 * Valida los datos de una decisión
 * @returns {string[]} Array de mensajes de error (vacío si es válido)
 */
export function validateDecision(data) {
  const errors = [];

  if (!data.title || data.title.trim() === '') {
    errors.push('El título es obligatorio');
  }

  if (!data.date) {
    errors.push('La fecha es obligatoria');
  }

  if (!data.context || data.context.trim() === '') {
    errors.push('El contexto es obligatorio');
  }

  if (!data.options || data.options.length < 2) {
    errors.push('Debes ingresar al menos 2 opciones para comparar');
  }

  // Validar que cada opción tenga nombre
  if (data.options) {
    data.options.forEach((option, index) => {
      if (!option.name || option.name.trim() === '') {
        errors.push(`La opción ${index + 1} debe tener un nombre`);
      }
    });
  }

  if (!data.chosen || data.chosen.trim() === '') {
    errors.push('Debes seleccionar la decisión tomada');
  }

  // Validar que la decisión elegida exista en las opciones
  if (data.chosen && data.options) {
    const chosenExists = data.options.some(opt => opt.name === data.chosen);
    if (!chosenExists) {
      errors.push('La decisión tomada debe ser una de las opciones ingresadas');
    }
  }

  return errors;
}

/**
 * Valida los datos de evaluación
 */
export function validateEvaluation(result, learnings) {
  const errors = [];

  if (!result || !['POSITIVE', 'NEGATIVE', 'NEUTRAL'].includes(result)) {
    errors.push('Debes seleccionar un resultado válido');
  }

  if (!learnings || learnings.trim() === '') {
    errors.push('Los aprendizajes son obligatorios');
  }

  return errors;
}
