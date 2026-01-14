// Store - Gestión de estado global con patrón Observer

import { Decision } from './model.js';
import { storage } from './storage.js';

/**
 * Store - Única fuente de verdad para el estado de la aplicación
 */
class Store {
    constructor() {
        this.state = {
            decisions: [],
            currentFilter: 'ALL' // ALL, PENDING, EXECUTED, EVALUATED
        };
        this.listeners = [];
        this.loadFromStorage();
    }

    /**
     * Carga las decisiones desde el storage
     */
    loadFromStorage() {
        const data = storage.loadDecisions();
        this.state.decisions = data.map(d => Decision.fromJSON(d));
    }

    /**
     * Guarda las decisiones en el storage
     */
    saveToStorage() {
        storage.saveDecisions(this.state.decisions);
    }

    /**
     * Suscribe un listener para recibir notificaciones de cambios
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Ejecuta el listener inmediatamente con el estado actual
        listener(this.state);
    }

    /**
     * Notifica a todos los listeners sobre cambios en el estado
     */
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    /**
     * Obtiene todas las decisiones (filtradas si hay filtro activo)
     */
    getDecisions() {
        if (this.state.currentFilter === 'ALL') {
            return this.state.decisions;
        }
        return this.state.decisions.filter(d => d.status === this.state.currentFilter);
    }

    /**
     * Obtiene una decisión por ID
     */
    getDecisionById(id) {
        return this.state.decisions.find(d => d.id === id);
    }

    /**
     * Agrega una nueva decisión
     */
    addDecision(decisionData) {
        const decision = new Decision(decisionData);
        this.state.decisions.unshift(decision); // Agregar al inicio
        this.saveToStorage();
        this.notify();
        return decision;
    }

    /**
     * Actualiza una decisión existente
     */
    updateDecision(id, updates) {
        const index = this.state.decisions.findIndex(d => d.id === id);
        if (index === -1) {
            throw new Error('Decision not found');
        }

        // Actualizar los campos
        Object.assign(this.state.decisions[index], updates);

        this.saveToStorage();
        this.notify();
        return this.state.decisions[index];
    }

    /**
     * Elimina una decisión
     */
    deleteDecision(id) {
        const index = this.state.decisions.findIndex(d => d.id === id);
        if (index === -1) {
            throw new Error('Decision not found');
        }

        this.state.decisions.splice(index, 1);
        this.saveToStorage();
        this.notify();
    }

    /**
     * Marca una decisión como ejecutada
     */
    markAsExecuted(id) {
        const decision = this.getDecisionById(id);
        if (!decision) {
            throw new Error('Decision not found');
        }

        decision.markAsExecuted();
        this.saveToStorage();
        this.notify();
    }

    /**
     * Evalúa una decisión
     */
    evaluateDecision(id, result, learnings) {
        const decision = this.getDecisionById(id);
        if (!decision) {
            throw new Error('Decision not found');
        }

        decision.evaluate(result, learnings);
        this.saveToStorage();
        this.notify();
    }

    /**
     * Cambia el filtro actual
     */
    setFilter(filter) {
        this.state.currentFilter = filter;
        this.notify();
    }

    /**
     * Obtiene estadísticas de las decisiones
     */
    getStats() {
        const total = this.state.decisions.length;
        const pending = this.state.decisions.filter(d => d.status === 'PENDING').length;
        const executed = this.state.decisions.filter(d => d.status === 'EXECUTED').length;
        const evaluated = this.state.decisions.filter(d => d.status === 'EVALUATED').length;

        return { total, pending, executed, evaluated };
    }
}

// Exportar una instancia única (singleton)
export const store = new Store();
