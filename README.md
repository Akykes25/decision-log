# Decision Log

Una aplicación web para documentar decisiones importantes, evaluar sus resultados y aprender de ellas con el paso del tiempo.

## 🎯 Propósito

Decision Log te permite:

- **Documentar decisiones** con contexto completo y opciones consideradas
- **Evaluar resultados** después de implementarlas
- **Aprender patrones** sobre tu criterio de decisión

Este proyecto demuestra arquitectura limpia, separación de responsabilidades y código mantenible usando solo HTML, CSS y JavaScript vanilla.

---

## 🚀 Inicio Rápido

1. Abre `index.html` en tu navegador
2. ¡Listo! No requiere instalación ni servidor

---

## ✨ Características

### Estados de Decisión

```
PENDING → EXECUTED → EVALUATED
```

- **Pendiente**: Decisión documentada pero no implementada
- **Ejecutada**: Ya la implementaste, esperando evaluar resultados
- **Evaluada**: Retrospectiva completa con aprendizajes

### Funcionalidades

- ✅ Crear decisiones con opciones y pros/cons
- ✅ Transiciones de estado (Pending → Executed → Evaluated)
- ✅ Evaluación retrospectiva con aprendizajes
- ✅ Filtros por estado
- ✅ Persistencia local (LocalStorage)
- ✅ Diseño responsive

---

## 🏗️ Arquitectura

### Stack Tecnológico

- **HTML5** - Estructura semántica
- **CSS3** - Sistema de diseño con variables CSS
- **JavaScript (ES6+)** - Lógica sin frameworks

### Patrón de Arquitectura: MVC Ligero

```
├── core/           # Lógica de negocio
│   ├── model.js    # Entidad Decision + validaciones
│   ├── store.js    # Estado global (patrón Observer)
│   └── storage.js  # Abstracción de persistencia
│
├── ui/
│   ├── router.js   # Navegación hash-based
│   ├── views/      # Vistas principales
│   └── components/ # Componentes reutilizables
│
└── utils/          # Helpers transversales
```

### Separación de Responsabilidades

**Model** → Define estructura de datos y reglas de negocio  
**Store** → Gestiona estado y notifica cambios  
**Views** → Renderiza UI y captura eventos del usuario

**Flujo de datos unidireccional:**

```
Vista → Store → Model → Storage
  ↑                        ↓
  └────── notify ──────────┘
```

---

## 📂 Estructura del Proyecto

```
Portfolio1/
│
├── index.html
│
├── css/
│   ├── reset.css       # Normalización
│   ├── tokens.css      # Variables de diseño
│   ├── components.css  # Componentes UI
│   └── layout.css      # Layouts principales
│
└── js/
    ├── main.js
    │
    ├── core/
    │   ├── model.js
    │   ├── store.js
    │   └── storage.js
    │
    ├── ui/
    │   ├── router.js
    │   ├── views/
    │   │   ├── listView.js
    │   │   ├── detailView.js
    │   │   ├── formView.js
    │   │   └── evaluateView.js
    │   │
    │   └── components/
    │       ├── decisionCard.js
    │       └── optionsTable.js
    │
    └── utils/
        └── dom.js
```

---

## 🎨 Sistema de Diseño

### Tokens CSS

El proyecto usa **variables CSS** para mantener consistencia visual:

- **Colores**: Paleta purple-primary con estados semánticos
- **Tipografía**: Escala modular (0.75rem - 2rem)
- **Espaciado**: Sistema de 8px (xs, sm, md, lg, xl)
- **Sombras**: 3 niveles de elevación

### Botones

Estilo animado con efectos hover:

- Transiciones suaves
- Elevación en hover
- Feedback visual en click

---

## 🔄 Flujo de Usuario

1. **Crear decisión** → Ingresar título, contexto, opciones con pros/cons
2. **Ver lista** → Filtrar por estado, ver estadísticas
3. **Ver detalle** → Revisar toda la información
4. **Marcar como ejecutada** → Cambiar estado cuando implementas
5. **Evaluar** → Documentar resultado y aprendizajes

---

## 💾 Persistencia

Usa **LocalStorage** para almacenamiento:

- Auto-save en cada cambio
- Recuperación automática al iniciar
- Capacidad: ~5-10MB (más que suficiente para cientos de decisiones)

**Nota**: Los datos están solo en tu navegador. Borra la caché = pierdes datos.

---

## 🧪 Validaciones

### Al crear una decisión:

- Título, fecha y contexto obligatorios
- Mínimo 2 opciones para comparar
- La decisión tomada debe ser una de las opciones ingresadas

### Al evaluar:

- Resultado obligatorio (Positiva/Negativa/Neutral)
- Aprendizajes obligatorios

---

## 🚀 Extensiones Futuras

Ideas para escalar (fuera del MVP):

- **Backend**: Node.js + PostgreSQL para multi-usuario
- **Búsqueda**: Full-text search
- **Exportación**: PDF de decisiones
- **Tags**: Categorización
- **Analytics**: Dashboard con métricas

---

## 📝 Decisiones Técnicas

### ¿Por qué vanilla JS en lugar de React/Vue?

- ✅ Demuestra fundamentos sólidos
- ✅ Zero configuración
- ✅ Arquitectura más visible (no oculta por el framework)
- ✅ Perfecto para portfolios (diferenciador)

### ¿Por qué LocalStorage?

- ✅ Funciona offline 100%
- ✅ Sin infraestructura
- ✅ Fácil de testear

### ¿Por qué CSS puro?

- ✅ Control total sobre el diseño
- ✅ Performance óptimo
- ✅ No genérico (no se ve Bootstrap/Tailwind)

---

## 👨‍💻 Desarrollo

### Abrir en navegador

```bash
# Simplemente abre index.html
# O usa un servidor local:
npx serve .
```

### Limpiar datos

```javascript
// En consola del navegador:
localStorage.clear();
location.reload();
```

---

## 📄 Licencia

MIT License - Úsalo como quieras

---

## 🎓 Aprendizajes del Proyecto

Este proyecto demuestra:

- Separación clara de responsabilidades (MVC)
- Patrón Observer para estado reactivo
- Validaciones defensivas en múltiples capas
- Abstracción de persistencia para migración futura
- Sistema de diseño escalable con tokens CSS
- Router simple pero funcional
- Código legible sin comentarios excesivos

**Perfecto para explicar en entrevistas técnicas.**
