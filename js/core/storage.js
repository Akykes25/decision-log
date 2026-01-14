// Storage - Abstracción de persistencia con LocalStorage

const STORAGE_KEYS = {
    DECISIONS: 'decision-log:decisions',
    VERSION: 'decision-log:version'
};

const CURRENT_VERSION = '1.0.0';

/**
 * Storage API para gestionar persistencia
 */
export const storage = {
    /**
     * Guarda todas las decisiones
     */
    saveDecisions(decisions) {
        try {
            const data = decisions.map(d => d.toJSON ? d.toJSON() : d);
            localStorage.setItem(STORAGE_KEYS.DECISIONS, JSON.stringify(data));
            localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
            return true;
        } catch (error) {
            console.error('Error saving decisions:', error);
            return false;
        }
    },

    /**
     * Carga todas las decisiones
     */
    loadDecisions() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.DECISIONS);
            if (!data) {
                return [];
            }
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading decisions:', error);
            return [];
        }
    },

    /**
     * Limpia todos los datos almacenados
     */
    clear() {
        try {
            localStorage.removeItem(STORAGE_KEYS.DECISIONS);
            localStorage.removeItem(STORAGE_KEYS.VERSION);
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    },

    /**
     * Obtiene la versión de los datos almacenados
     */
    getVersion() {
        return localStorage.getItem(STORAGE_KEYS.VERSION) || null;
    },

    /**
     * Verifica si hay datos almacenados
     */
    hasData() {
        return localStorage.getItem(STORAGE_KEYS.DECISIONS) !== null;
    }
};
