// Main - Punto de entrada de la aplicación

import { router } from './ui/router.js';
import { store } from './core/store.js';
import { ListView } from './ui/views/listView.js';
import { DetailView } from './ui/views/detailView.js';
import { FormView } from './ui/views/formView.js';
import { EvaluateView } from './ui/views/evaluateView.js';

/**
 * Inicializa la aplicación
 */
function initializeApp() {
    // Configurar rutas
    router.on('', () => {
        ListView();
    });

    router.on('new', () => {
        FormView();
    });

    router.on('decision/:id', (params) => {
        DetailView(params);
    });

    router.on('edit/:id', (params) => {
        FormView(params);
    });

    router.on('evaluate/:id', (params) => {
        EvaluateView(params);
    });

    // Ruta no encontrada
    router.notFound(() => {
        router.navigate('');
    });

    // Suscribirse a cambios en el store para re-renderizar
    store.subscribe((state) => {
        // Re-renderizar la vista actual cuando cambia el estado
        const currentPath = router.getCurrentPath();

        // Solo re-renderizar si estamos en la lista (para ver filtros actualizados)
        // Las demás vistas se manejan por navegación
        if (currentPath === '') {
            ListView();
        } else if (currentPath.startsWith('decision/')) {
            // Re-renderizar detalle si cambia el estado (ej: marcar como ejecutada)
            const id = currentPath.split('/')[1];
            DetailView({ id });
        }
    });

    console.log('✅ Decision Log initialized');
}

// Iniciar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
