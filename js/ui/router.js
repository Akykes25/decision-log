// Router - Navegación entre vistas con hash-based routing

class Router {
    constructor() {
        this.routes = {};
        this.notFoundHandler = null;

        // Escuchar cambios en el hash
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    /**
     * Registra una ruta
     * @param {string} path - Patrón de ruta (ej: '', 'decision/:id', 'new')
     * @param {Function} handler - Función que se ejecuta cuando la ruta coincide
     */
    on(path, handler) {
        this.routes[path] = handler;
    }

    /**
     * Registra el handler para rutas no encontradas
     */
    notFound(handler) {
        this.notFoundHandler = handler;
    }

    /**
     * Navega a una ruta
     */
    navigate(path) {
        window.location.hash = path;
    }

    /**
     * Maneja el cambio de ruta actual
     */
    handleRoute() {
        const hash = window.location.hash.slice(1) || '';

        // Buscar coincidencia exacta primero
        if (this.routes[hash]) {
            this.routes[hash]();
            return;
        }

        // Buscar patrones con parámetros
        for (const [pattern, handler] of Object.entries(this.routes)) {
            const params = this.matchRoute(pattern, hash);
            if (params !== null) {
                handler(params);
                return;
            }
        }

        // Si no se encuentra ninguna ruta
        if (this.notFoundHandler) {
            this.notFoundHandler();
        }
    }

    /**
     * Compara un patrón de ruta con una ruta actual y extrae parámetros
     * @returns {Object|null} Objeto con parámetros o null si no coincide
     */
    matchRoute(pattern, route) {
        const patternParts = pattern.split('/');
        const routeParts = route.split('/');

        if (patternParts.length !== routeParts.length) {
            return null;
        }

        const params = {};

        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const routePart = routeParts[i];

            if (patternPart.startsWith(':')) {
                // Es un parámetro
                const paramName = patternPart.slice(1);
                params[paramName] = routePart;
            } else if (patternPart !== routePart) {
                // No coincide
                return null;
            }
        }

        return params;
    }

    /**
     * Obtiene el hash actual sin el #
     */
    getCurrentPath() {
        return window.location.hash.slice(1) || '';
    }
}

// Exportar instancia única
export const router = new Router();
