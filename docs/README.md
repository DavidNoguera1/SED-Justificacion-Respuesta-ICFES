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
   http://localhost/SED-Justificacion-Respuesta-ICFES/
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
│       └── justification.js
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
- **js/justification.js** (443 líneas) - Lógica JavaScript

**Funciones JavaScript disponibles:**
- `initJustification()` - Inicializa la página
- `configureArea(area)` - Configura coloresdinámicos por área
- `detectContentConfig(q)` - Detecta tipo de contenido
- `renderQuestion(q, area)` - Renderiza la pregunta completa
- `renderCorrectOption()` - Renderiza opción correcta
- `renderWrongOption()` - Renderiza opción incorrecta
- `extractImages(html)` - Extrae imágenes del HTML
- `parseInvalidOptions(text, count)` - Pars invalid options
- `setupNavigation(area, id, subject)` - Configura navegación

## Áreas disponibles

| Código | Área |
|--------|------|
| mat    | Matemáticas |
| lc     | Lectura Crítica |
| cn     | Ciencias Naturales |
| cc     | Competencias Ciudadanas |
| en     | Inglés |