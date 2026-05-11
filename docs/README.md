# SED-Justificacion-Respuesta-ICFES

Proyecto de refuerzo pedagógico interactivo para la prueba Saber 11, desarrollado por la Secretaría de Educación de Nariño.

## Visión General

Sistema web PHP que permite a estudiantes preparar la prueba Saber 11 mediante preguntas con justificaciones detalladas. El proyecto está diseñado para integrarse en sistemas más grandes.

## Requisitos

- XAMPP instalado (PHP 7.4+, Apache, MySQL)
- Navegador web moderno

## Cómo correr el proyecto

1. **Inicia XAMPP Control Panel**
2. **Activa los servicios:**
   - Apache (Inicio)
   - MySQL (Inicio) - obligatorio para funcionamiento completo
3. **Accede al proyecto:**

```
http://localhost/SED-Justificacion-Respuesta-ICFES/index.php
```

## Estructura del Proyecto

```
├── index.php                    # Página principal (selector de áreas)
├── api/                        # Endpoints PHP (consumo JSON)
│   ├── db.php                 # Conexión a base de datos
│   ├── cache.php              # Sistema de caché API (TTL: 300s)
│   ├── questions.php          # API de preguntas (GET)
│   ├── justificaciones.php    # API CRUD justificaciones expandidas (GET/POST)
│   └── question_complete.php  # API combinada pregunta + justificación
├── pages/                      # Páginas de áreas
│   ├── area.php               # Listado de preguntas por área
│   ├── justification.php      # Análisis de pregunta con justificación
│   ├── justificaciones_crud.php  # Editor de justificaciones expandidas
│   ├── css/
│   │   └── justification.css
│   └── js/
│       ├── justification/     # Módulos JS para justification.php
│       │   ├── config.js      # Constantes de áreas
│       │   ├── area.js        # Configuración visual por área
│       │   ├── content-utils.js
│       │   ├── render-helpers.js
│       │   ├── question-renderer.js
│       │   ├── sidebar.js
│       │   ├── api.js
│       │   └── interactions.js
│       └── justificaciones_crud/  # Módulos JS para CRUD
│           ├── config.js
│           ├── carga.js
│           ├── importacion.js
│           └── ...
├── shared/                    # Recursos compartidos
│   ├── css/
│   │   ├── variables.css      # Variables CSS y colores por área
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── index.css
│   │   └── backgrounds.css
│   ├── js/
│   │   └── utils.js
│   ├── img/
│   └── logo.svg
├── .cache/                    # Caché generado automáticamente
│   └── api/
└── docs/                      # Documentación
```

## Áreas Disponibles

| Código | Área                     | Código BD   |
|--------|--------------------------|-------------|
| mat    | Matemáticas              | mat         |
| lc     | Lectura Crítica          | lc          |
| cn     | Ciencias Naturales       | cn          |
| cc     | Competencias Ciudadanas  | soc         |
| ing    | Inglés                   | ing         |

## Flujo de Datos

### Flujo 1: Visualización de Preguntas

```
Navegador → index.php
           ↓
         area.php?area=mat
           ↓
    ┌─────→ api/questions.php?subject=mat&summary=1&withFields=1
    │              ↓
    │         db.php (MySQL saber11)
    │              ↓
    │         SELECT questions (activo=1)
    │              ↓
    │         transformQuestionSummary()
    │              ↓
    │         JSON con cache (TTL 300s)
    │
    └───── Render en UI (preguntas con paginación)
```

### Flujo 2: Análisis de Pregunta

```
Navegador → justification.php?id=X&area=mat
           ↓
    ┌─────→ api/question_complete.php?id=X
    │              ↓
    │         db.php (MySQL saber11)
    │              ↓
    │         SELECT questions WHERE id=X
    │              ↓
    │         SELECT justificaciones_expandidas WHERE idPregunta=X
    │              ↓
    │         JSON cache (TTL 300s)
    │
    └───── Render: pregunta + justificación expandida
```

### Flujo 3: CRUD Justificaciones

```
Navegador → justificaciones_crud.php
           ↓
    Seleccionar pregunta por ID
           ↓
    GET api/justificaciones.php?id=X → carga justificación
           ↓
    Editar formulario
           ↓
    POST api/justificaciones.php → guardar justificación
           ↓
    apiCacheClearAll() → invalida caché
```

## Base de Datos

### Conexión (db.php)

```php
Host: 172.28.100.243
Puerto: 3308
Usuario: practica
Password: sed2026*
Base: saber11
```

### Tablas Principales

#### `questions` - Preguntas Saber 11

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT | Primary key |
| subject | VARCHAR(10) | Área (mat, lc, cn, soc, ing) |
| context | TEXT | Contexto de la pregunta |
| context_img | VARCHAR(255) | Imagen de contexto |
| question_img | VARCHAR(255) | Imagen de pregunta |
| text_content | TEXT | Texto de la pregunta |
| options | JSON | Array de opciones (A, B, C, D) |
| options_img | JSON | Array de imágenes de opciones |
| correct_index | INT | Índice de respuesta correcta (0-3) |
| competency | VARCHAR(100) | Competencia evaluada |
| level | VARCHAR(50) | Nivel (bajo, medio, alto) |
| assertion | TEXT | Afirmación/razonamiento |
| evidence | TEXT | Evidencia |
| component | VARCHAR(100) | Componente |
| standard | VARCHAR(100) | Estándar |
| skill | VARCHAR(100) | Habilidad |
| evaluation_criteria | TEXT | Criterios de evaluación |
| justification | TEXT | Justificación de la respuesta |
| invalid_options | TEXT | Por qué otras opciones son incorrectas |
| activo | TINYINT | 1 = visible, 0 = oculto |
| updated_at | DATETIME | Fecha de modificación |

#### `justificaciones_expandidas` - Justificaciones Extensiones

| Campo | Tipo | Descripción |
|-------|------|-------------|
| idJustificacionExpandida | INT | Primary key |
| idPregunta | INT | FK → questions.id |
| nombre_pregunta | VARCHAR(50) | Título descriptivo |
| descripcion_extendida | TEXT | Explicación detallada |
| media_interactiva | TEXT | Código HTML (iframes, etc.) |
| glosario_items | TEXT | Términos:definición (uno por línea) |
| dato_curioso | TEXT | Dato interesante relacionado |
| error_comun_feedback | TEXT | Errores frecuentes de estudiantes |
| updated_at | DATETIME | Fecha de modificación |

## Endpoints de API

### GET /api/questions.php

Obtiene preguntas con filtros opcionales.

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| subject | string | Código de área (mat, lc, cn, soc, ing) |
| id | int | ID específico de pregunta |
| summary | bool | Retorna solo campos básicos (para listados) |
| withFields | bool | Include uniqueFields en respuesta |
| uniqueFields | bool | Retorna valores únicos de competency, level, component, skill |
| competency | string | Filtrar por competencia |
| level | string | Filtrar por nivel |
| component | string | Filtrar por componente |
| skill | string | Filtrar por habilidad |
| refresh | bool | Forzar nueva carga (bypassea caché) |

**Respuesta de ejemplo (summary):**
```json
[
  {
    "id": 1,
    "subject": "mat",
    "text": "Contenido de la pregunta...",
    "competency": "Comunicación",
    "level": "Medio",
    "component": "Numérico",
    "skill": "Razonamiento",
    "searchText": "texto para búsqueda..."
  }
]
```

### GET /api/question_complete.php

Obtiene pregunta completa + justificación expandida.

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | int | ID de pregunta (obligatorio) |
| area | string | Código de área (default: mat) |

**Respuesta:**
```json
{
  "question": { ... },
  "expanded": { "id": 1, "nombrePregunta": "...", ... },
  "questionsList": [ ... ],
  "version": { ... }
}
```

### GET /api/justificaciones.php

Obtiene justificación expandida de una pregunta.

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | int | ID de pregunta |

### POST /api/justificaciones.php

Guarda o actualiza justificación expandida.

**Cuerpo (Form POST o JSON):**
```json
{
  "idPregunta": 1,
  "nombrePregunta": "Título",
  "descripcionExtendida": "...",
  "mediaInteractiva": "<iframe>...",
  "glosarioItems": "Término: Definición",
  "datoCurioso": "...",
  "errorComunFeedback": "..."
}
```

## Integración con Sistemas Externos

### Endpoints Públicos (CORS habilitado)

Todas las APIs permiten acceso cruzado desde cualquier origen:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

### Para integrar en otro sistema:

1. **Consumir preguntas por área:**
   ```
   GET /api/questions.php?subject=mat&summary=1
   ```

2. **Consumir pregunta específica con justificación:**
   ```
   GET /api/question_complete.php?id=123
   ```

3. **Iframe embebido:**
   ```html
   <iframe src="https://tu-servidor/pages/justification.php?id=123&area=mat" 
           width="100%" height="800"></iframe>
   ```

4. **API REST para CRUD externo:**
   - POST a `/api/justificaciones.php` para guardar justificaciones desde sistema externo

## Caché

El sistema implementa caché en dos niveles:

1. **Caché PHP (servidor):** Archivos JSON en `.cache/api/`, TTL 300 segundos
2. **Caché navegador (cliente):** localStorage para datos de área, TTL 5 minutos

Para forzar actualización: agregar `&refresh=1` a cualquier request API.

## Notas de Desarrollo

- El archivo `justification.php` fue refactorizado con módulos JS separados por responsabilidad
- Las justificaciones expandidas permiten contenido HTML (para videos, interactivos)
- Los filtros de preguntas (competency, level, component) se cargan dinámicamente según el área
- El sistema de pagination es cliente-side para mejor UX
- Los colores de área se definen en `shared/css/variables.css`