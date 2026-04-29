/**
 * Plantilla de Importación de Justificaciones ICFES
 * 
 * Instrucciones:
 * 1. Completa los datos de cada pregunta
 * 2. Guarda este archivo con un nombre descriptivo (ej: mis_justificaciones.js)
 * 3. Desde la página CRUD, usa "Importar JS" para cargar el archivo
 * 
 * Estructura por pregunta:
 * {
 *   idPregunta: número,
 *   nombrePregunta: "Título descriptivo",
 *   descripcionExtendida: "Explicación detallada...",
 *   mediaInteractiva: "<iframe>...",
 *   glosarioItems: "Término: definición (uno por línea)...",
 *   datoCurioso: "Dato interesante...",
 *   errorComunFeedback: "Errores frecuentes..."
 * }
 */

var JUSTIFICACIONES_IMPORT = [
  {
    idPregunta: 81,
    nombrePregunta: "",
    descripcionExtendida: `Esta pregunta evalúa vocabulario de salud y emociones en inglés (nivel A1). El enunciado <em>"Some people do this when they feel really sad or sick"</em> pide identificar una <strong>acción</strong> que las personas realizan cuando están tristes o enfermas. De todas las opciones, solo <strong>C. cry (llorar)</strong> es un verbo/acción que se asocia tanto con la tristeza como con el malestar físico. Las demás opciones son sustantivos: lugares (hospital), personas (doctor), objetos (medicine) o síntomas (cold, cough, stomach-ache), y ninguno responde a lo que alguien <em>"hace"</em>.`,
    mediaInteractiva: "<iframe srcdoc=\"<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'><style>*{box-sizing:border-box}body{font-family:system-ui,sans-serif;margin:0;padding:10px;background:linear-gradient(135deg,#e0f2fe,#dbeafe);min-height:100vh;display:flex;align-items:center;justify-content:center}.card{background:#fff;border-radius:12px;padding:12px;width:100%;max-width:320px;box-shadow:0 4px 12px rgba(0,0,0,0.1)}.tag{font-size:10px;text-transform:uppercase;color:#3b82f6;font-weight:700;margin-bottom:6px}.q{font-size:13px;color:#1e293b;margin-bottom:8px}.opts{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:10px}.btn{padding:12px 10px;font-size:12px;border:2px solid #e2e8f0;background:#fff;cursor:pointer;border-radius:8px}.btn:hover{background:#f1f5f9}.result{text-align:center;font-size:11px;min-height:24px;padding:8px;border-radius:6px;margin-top:8px;background:#f1f5f9;color:#64748b}.result.correct{background:#dcfce7;color:#166534}.result.wrong{background:#fee2e2;color:#991b1b}</style></head><body><div class='card'><div class='tag'>Accion o Cosa?</div><div class='q'>Elige la palabra que es una ACCION (verbo)</div><div class='opts' id='opts'></div><div class='result' id='result'>Click en una opcion</div></div><script>var opts=[{w:'Cold',correct:false},{w:'Doctor',correct:false},{w:'Cry',correct:true},{w:'Medicine',correct:false}];var result=document.getElementById('result');opts.forEach(function(o,i){var btn=document.createElement('button');btn.className='btn';btn.textContent=o.w;btn.onclick=function(){if(o.correct){result.className='result correct';result.textContent='Correcto! ' + o.w + ' es una ACCION (se hace)';}else{result.className='result wrong';result.textContent='No, ' + o.w + ' es una COSA. Intenta otra!';}};document.getElementById('opts').appendChild(btn);});</script></body></html>\" style=\"width:100%;height:280px;border:none;\"></iframe>",
    glosarioItems: `cold: resfriado / frío (como adjetivo)
cough: tos / toser
cry: llorar / llanto
doctor: médico / doctor
hospital: hospital
medicine: medicina / medicamento
stomach-ache: dolor de estómago
toothache: dolor de muelas (opción H, usada como ejemplo en el ejercicio)`,
    datoCurioso: `Las lágrimas emocionales contienen leucina-encefalina, un analgésico natural producido por el propio cerebro. ¡Esto explica por qué muchas personas se sienten aliviadas después de llorar — es una respuesta biológica real, no solo psicológica!`,
    errorComunFeedback: `El error más frecuente es elegir <strong>B. cough (toser)</strong>, ya que toser sí se asocia con estar enfermo, pero no con la tristeza. El enunciado exige una acción que conecte <em>ambos</em> estados. Las demás opciones (cold, doctor, hospital, medicine, stomach-ache) son sustantivos que designan cosas, personas o lugares — no acciones que las personas realizan.`
  },
  {
    idPregunta: 82,
    nombrePregunta: "",
    descripcionExtendida: `Esta pregunta pertenece al mismo ejercicio de vocabulario de salud (nivel A1). El enunciado <em>"You can take this when you have a terrible headache"</em> (Puedes tomar esto cuando tienes un terrible dolor de cabeza) usa el verbo <strong>take</strong> como pista clave: indica que se busca una sustancia que se ingiere o consume. De todas las opciones, solo <strong>F. medicine (medicina)</strong> es algo que se puede "tomar" para aliviar un síntoma. Ir al doctor o al hospital no es "tomar algo", y las demás opciones son síntomas o acciones que no guardan relación con el tratamiento del dolor de cabeza.`,
    mediaInteractiva: "<iframe srcdoc=\"<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'><style>*{box-sizing:border-box}body{font-family:system-ui,sans-serif;margin:0;padding:10px;background:linear-gradient(135deg,#dcfce7,#bbf7d0);min-height:100vh;display:flex;align-items:center;justify-content:center}.card{background:#fff;border-radius:12px;padding:12px;width:100%;max-width:320px;box-shadow:0 4px 12px rgba(0,0,0,0.1)}.tag{font-size:10px;text-transform:uppercase;color:#16a34a;font-weight:700;margin-bottom:4px}.q{font-size:12px;color:#1e293b;margin-bottom:6px}.hint{font-size:9px;background:#fef3c7;color:#92400e;padding:4px 8px;border-radius:4px;margin-bottom:8px;display:inline-block}.opts{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:10px}.btn{padding:12px 10px;font-size:12px;border:2px solid #d1fae5;background:#fff;cursor:pointer;border-radius:8px}.btn:hover{background:#ecfdf5}.result{text-align:center;font-size:11px;min-height:24px;padding:8px;border-radius:6px;margin-top:8px;background:#f1f5f9;color:#64748b}.result.correct{background:#dcfce7;color:#166534}.result.wrong{background:#fee2e2;color:#991b1b}</style></head><body><div class='card'><div class='tag'>Take = Consumir</div><div class='q'>Que se puede TOMAR (consumir)?</div><div class='hint'>take = consumir / beber</div><div class='opts' id='opts'></div><div class='result' id='result'>Click en una opcion</div></div><script>var opts=[{w:'Doctor',correct:false},{w:'Cold',correct:false},{w:'Medicine',correct:true},{w:'Hospital',correct:false}];var result=document.getElementById('result');opts.forEach(function(o,i){var btn=document.createElement('button');btn.className='btn';btn.textContent=o.w;btn.onclick=function(){if(o.correct){result.className='result correct';result.textContent='Correcto! ' + o.w + ' se puede TOMAR';}else{result.className='result wrong';result.textContent='No, ' + o.w + ' no se puede tomar. Intenta otra!';}};document.getElementById('opts').appendChild(btn);});</script></body></html>\" style=\"width:100%;height:280px;border:none;\"></iframe>",
    glosarioItems: `cold: resfriado
cough: tos
cry: llorar
doctor: médico / doctor
hospital: hospital
medicine: medicina / medicamento (algo que se toma para aliviar síntomas)
stomach-ache: dolor de estómago
headache: dolor de cabeza (palabra clave del enunciado, no listada como opción)`,
    datoCurioso: `El dolor de cabeza tensional es el tipo más común en el mundo — se estima que afecta al 70% de la población en algún momento de su vida. En inglés, "tension headache" se alivia usualmente con analgésicos de venta libre, es decir, ¡medicine!`,
    errorComunFeedback: `Ninguna otra opción es algo que se pueda "tomar" (take). <strong>D. doctor</strong> y <strong>E. hospital</strong> son a donde se <em>va</em>, no algo que se ingiere. <strong>A. cold</strong>, <strong>B. cough</strong>, <strong>C. cry</strong> y <strong>G. stomach-ache</strong> no tienen relación semántica con el tratamiento de un dolor de cabeza.`
  }
];