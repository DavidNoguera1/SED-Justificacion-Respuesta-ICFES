<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Análisis de Pregunta</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../shared/css/variables.css">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            mat: { light: '#e8eef5', DEFAULT: '#1a3a5c', dark: '#1a3a5c' },
            lc: { light: '#ede8ff', DEFAULT: '#5b3fa0', dark: '#5b3fa0' },
            cn: { light: '#d4f0e2', DEFAULT: '#1e8a4a', dark: '#1e8a4a' },
            soc: { light: '#fef3d7', DEFAULT: '#e8a020', dark: '#e8a020' },
            ing: { light: '#fde8e6', DEFAULT: '#c0392b', dark: '#c0392b' }
          }
        }
      }
    }
  </script>
  <link rel="stylesheet" href="css/justification.css">
</head>
<body class="bg-gray-100 text-gray-800 font-sans antialiased" data-area="mat">

  <!-- Header dinámico según área -->
  <header id="headerArea" class="bg-mat-dark text-white py-6 shadow-md transition-colors duration-300">
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex items-center justify-between">
        <div>
          <span id="areaBadge" class="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Matemáticas - ID: 0</span>
          <h1 id="mainTitle" class="text-3xl font-extrabold mt-2">Análisis de Pregunta</h1>
        </div>
        <i id="areaIcon" class="fas fa-calculator text-4xl opacity-80"></i>
      </div>
    </div>
  </header>

  <!-- Navegación superior -->
  <nav class="bg-gray-50 border-b border-gray-200 py-3">
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex gap-2">
          <a href="../index.php" class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 text-sm font-medium">
            <i class="fas fa-home"></i> Inicio
          </a>
          <a id="navArea" href="#" class="px-3 py-2 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition flex items-center gap-2 text-sm font-medium">
            <i class="fas fa-folder"></i> Área
          </a>
        </div>
        
        <div class="flex gap-2 items-center">
          <a id="navPrev" href="#" class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm">
            <i class="fas fa-chevron-left"></i>
          </a>
          <div id="quickNav" class="flex gap-1.5 flex-wrap justify-center max-w-[450px]">
            <!-- Quick nav pills se cargan dinámicamente -->
          </div>
          <a id="navNext" href="#" class="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm">
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
        
        <div class="flex gap-2">
          <a id="navPrev远" href="#" class="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-sm">
            <i class="fas fa-arrow-left"></i>
          </a>
          <a id="navNext远" href="#" class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm">
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-5xl mx-auto px-6 mt-6 mb-16 space-y-8" id="questionContent">
    <!-- Contenido se carga dinámicamente aquí -->
  </main>

<script src="js/justification.js"></script>
  </body>
</html>