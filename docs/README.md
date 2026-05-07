# SED-Justificacion-Respuesta-ICFES

Proyecto de refuerzo pedagógico interactivo para la prueba Saber 11.

## Requisitos

- XAMPP instalado (PHP 7.4+, Apache, MySQL)
- Navegador web moderno

## Cómo correr el proyecto

1. **Inicia XAMPP Control Panel**
2. **Activa los servicios:**
   - Apache (Inicio)
   - MySQL (Inicio) - si necesitas base de datos
3. **Accede al proyecto:**
   
   ```
   http://localhost/SED-Justificacion-Respuesta-ICFES/index.php
   ```

## Estructura del proyecto

```
├── index.php              # Página principal
├── api/                # Endpoints PHP (consumo JSON)
│   ├── questions.php
│   └── db.php
├── pages/              # Páginas de áreas
│   ├── area.php
│   ├── justification.php
│   ├── css/            # Estilos específicos de páginas
│   │   └── justification.css
│   └── js/            # JavaScript específico de páginas
│       └── justification/
│           ├── config.js
│           ├── area.js
│           ├── content-utils.js
│           ├── render-helpers.js
│           ├── question-renderer.js
│           ├── sidebar.js
│           ├── api.js
│           └── interactions.js
├── shared/            # Recursos compartidos
│   ├── css/
│   │   ├── variables.css   # Variables CSS y colores por área
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── index.css
│   ├── js/
│   └── img/
└── docs/              # Documentación
```

### Justification.php

Página de análisis de pregunta ha sido refactorizada:

- **justification.php** (82 líneas) - HTML + estructura
- **css/justification.css** (222 líneas) - Estilos específicos
- **js/justification/** - Lógica JavaScript separada por responsabilidad

**Archivos JavaScript principales:**
- `config.js` - Constantes de areas, API y recursos.
- `area.js` - Configuracion visual del area y fondo decorativo.
- `content-utils.js` - Helpers de contenido, imagenes y texto.
- `render-helpers.js` - Renderizadores reutilizables.
- `question-renderer.js` - Render principal de la pregunta.
- `sidebar.js` - Busqueda y navegacion lateral.
- `api.js` - Carga inicial de datos.
- `interactions.js` - Plegables, modal e inicializacion.

## Áreas disponibles

| Código | Área |
|--------|------|
| mat    | Matemáticas |
| lc     | Lectura Crítica |
| cn     | Ciencias Naturales |
| cc     | Competencias Ciudadanas |
| ing     | Inglés |
