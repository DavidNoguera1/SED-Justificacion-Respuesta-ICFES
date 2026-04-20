const PREGUNTAS = [
//Ciencias Naturales
//Ejemplo de Formato 1: Explicar fenómenos a partir de una situación
{
  id: 61,
  simulators: [1, 3],
  subject: "cn",
  context: `<p>En el grupo de los mamíferos se presentan dos tipos de ciclos reproductivos: el menstrual (de 24 a 35 días), exclusivo de primates y humanos; y el ciclo estral (entre estaciones), en el resto de mamíferos. La diferencia entre estos dos tipos de ciclos radica en el periodo de receptividad sexual. En el ciclo estral, la hembra solo es sexualmente receptiva durante el estro u ovulación; en el ciclo menstrual, la hembra muestra receptividad sexual durante casi todo el ciclo.<br><br>Los modelos de la figura muestran cada ciclo de reproducción.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/cn61.png" alt='' loading="lazy"></p>`,
  text: `La mayoría de las pastillas anticonceptivas se basan en una mezcla de hormonas con una combinación estratégica de estrógeno y progesterona.<br><br>Con base en la información anterior, ¿por qué una mujer que utiliza este método anticonceptivo tiene menor probabilidad de quedar embarazada?`,
  options: [
    "Porque restringirá a unos días específicos su receptividad sexual, lo cual disminuye la posibilidad de quedar embarazada.",
    "Porque estas hormonas permanecerán en altas concentraciones durante todo el ciclo, lo cual impide la ovulación.",
    "Porque este método eliminará los espermatozoides durante su trayecto hacia el óvulo, lo cual impide la fecundación.",
    "Porque este método aumentará el número de días que dura el ciclo menstrual, lo cual altera los días fértiles.",
  ],
  correct: 1,
  competency: "Explicación de fenómenos.",
  level: "",
  assertion: "Analiza el potencial del uso de recursos naturales o artefactos y sus efectos sobre el entorno y la salud, así como las posibilidades de desarrollo para las comunidades.",
  evidence: "Explica algunos principios para mantener la salud individual y la pública basado en principios biológicos, químicos y físicos.",
  component: "Ciencia, tecnología y sociedad.",
  standard: "",
  skill: "Argumento la importancia de las medidas de prevención del embarazo y de las enfermedades de transmisión sexual en el mantenimiento de la salud individual y colectiva.",
  evaluationCriteria: "Esta pregunta evalúa si los estudiantes tienen la capacidad para analizar la información suministrada y argumentar acerca de las medidas de prevención del embarazo.",
  justification: "La opción B es la respuesta correcta porque la ovulación no se dará cuando los niveles de progesterona son altos, sino que se dará cuando comiencen a disminuir los niveles de estrógeno, como se observa en las gráficas.",
  invalidOptions: "La opción A no es la respuesta correcta porque en el contexto se menciona que, para el ciclo menstrual, la hembra muestra receptividad durante casi todo el ciclo. <br>La opción C no es la respuesta correcta porque las hormonas no actúan como espermaticidas, sino que controlan la ovulación. <br>La opción D no es la respuesta correcta porque, cuando se usan correctamente, las pastillas anticonceptivas no modifican la duración de ciclo.",
},

//Ejemplo de Formato 2: Seleccionar el mejor procedimiento o solución
{
  id: 63,


  
  simulators: [1, 3],
  subject: "cn",
  context: `<p>En el grupo de los mamíferos se presentan dos tipos de ciclos reproductivos: el menstrual (de 24 a 35 días), exclusivo de primates y humanos; y el ciclo estral (entre estaciones), en el resto de mamíferos. La diferencia entre estos dos tipos de ciclos radica en el periodo de receptividad sexual. En el ciclo estral, la hembra solo es sexualmente receptiva durante el estro u ovulación; en el ciclo menstrual, la hembra muestra receptividad sexual durante casi todo el ciclo.<br><br>Los modelos de la figura muestran cada ciclo de reproducción.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/cn61.png" alt='' loading="lazy"></p><p>En un zoológico necesitan regular la natalidad de las hembras del mono ardilla. Se ha diseñado el siguiente experimento para probar la efectividad de un nuevo método anticonceptivo:<br><br>
  1. Formación de dos grupos de hembras en edad reproductiva.<br>
  2. Suministro del anticonceptivo a todas las hembras de los dos grupos.<br>
  3. Reunión con machos de la especie.<br>
  4. Se repite cada mes el procedimiento y se contabiliza el número de embarazos por cada grupo.</p>`,
  text: `Con base en la información anterior, ¿el experimento planteado permitirá reconocer la efectividad del anticonceptivo en la población de monos ardilla?`,
  options: [
    "No, porque faltan grupos similares a los que no se les suministre el anticonceptivo para comparar los resultados.",
    "Sí, porque el experimento planteado es similar al que se realiza en humanos, donde es más fácil reconocer el embarazo.",
    "No, porque al reunir los animales estos podrán estresarse por no estar en su ambiente natural.",
    "Sí, porque el anticonceptivo modifica los niveles hormonales de las hembras y esto las hace más agresivas.",
  ],
  correct: 0,
  competency: "Indagación.",
  level: "",
  assertion: "Utiliza algunas habilidades de pensamiento y de procedimiento para evaluar predicciones.",
  evidence: "Diseña experimentos para dar respuesta a sus preguntas.",
  component: "Procesos vivos.",
  standard: "",
  skill: "Establezco relaciones causales y multicausales entre los datos recopilados.",
  evaluationCriteria: "Esta pregunta evalúa si los estudiantes tienen la capacidad para establecer las condiciones necesarias para realizar un experimento biológico.",
  justification: "La opción A es la respuesta correcta porque en esta se reconoce la necesidad de tener un grupo control para poder contrastar si el método anticonceptivo es efectivo o no.",
  invalidOptions: "La opción B no es la respuesta correcta porque no tiene en cuenta la necesidad de la inclusión del grupo control y compara especies diferentes en los resultados del experimento. <br>La opción C no es la respuesta correcta porque, aunque la afirmación puede ser verdadera, no responderá la pregunta formulada. <br>La opción D no es la respuesta correcta porque no podemos saber si la afirmación es cierta, y no se incluye un grupo control para su contraste.",
},

//Ejemplo de Formato 3: Diseñar o evaluar experimentos
{
  id: 66,


  
  simulators: [1, 3],
  subject: "cn",
  context: `<p>En un experimento, un estudiante deja rodar una esfera de madera sobre una rampa a la cual se le puede variar el ángulo de inclinación. El estudiante prueba varios ángulos y registra la velocidad con que llega la esfera a la parte inferior de la rampa, en cada caso.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/cn66.png" alt='' loading="lazy"></p>`,
  text: `¿Qué se puede determinar con el anterior experimento?`,
  options: [
    "Cómo es la resistencia de la esfera de madera a los golpes.",
    "Cómo varía la velocidad de la esfera de madera respecto al ángulo de la rampa.",
    "Cómo cambia el peso de la esfera respecto al ángulo de inclinación de la rampa.",
    "Cómo la rampa es deformada por el peso de la esfera de madera.",
  ],
  correct: 1,
  competency: "Indagación.",
  level: "",
  assertion: "Utiliza algunas habilidades de pensamiento y de procedimiento para evaluar predicciones.",
  evidence: "Diseña experimentos para dar respuesta a sus preguntas.",
  component: "Procesos físicos.",
  standard: "",
  skill: "Observo y formulo preguntas específicas sobre aplicaciones de teorías científicas.",
  evaluationCriteria: "Esta pregunta evalúa si los estudiantes tienen la capacidad para determinar qué pregunta puede contestarse a partir de un diseño experimental descrito.",
  justification: "La opción B es la respuesta correcta porque el ángulo de la rampa y la velocidad de la esfera son las dos variables del experimento y, por lo tanto, son las variables entre las que se puede establecer una relación.",
  invalidOptions: "La opción A no es la respuesta correcta porque en ningún momento se hace chocar la esfera contra algo y, por lo tanto, no se puede evaluar su resistencia. <br>La opción C no es la respuesta correcta porque siempre se usó la misma esfera en el experimento y, por lo tanto, su peso es constante. <br>La opción D no es la respuesta correcta porque la rampa no se deforma por el peso de la esfera, sino que el ángulo de inclinación de rampa es modificado por el estudiante.",
},

//Ejemplo de Formato 4: Interpretar información en gráficas, tablas o diagramas
{
  id: 68,


  
  simulators: [1, 3],
  subject: "cn",
  context: `<p>Un grupo de estudiantes decide medir el pH de cinco sustancias disueltas en agua. Los resultados se muestran en la tabla.<br><br>
  <table border="1" style="width:100%; border-collapse:collapse; text-align:center;">
    <tr><th>Sustancia</th><th>pH</th></tr>
    <tr><td>HF</td><td>2,06</td></tr>
    <tr><td>H₂SO₄</td><td>0,65</td></tr>
    <tr><td>Na₃PO₄</td><td>12,12</td></tr>
    <tr><td>NaCl</td><td>7,00</td></tr>
    <tr><td>Zn(OH)₂</td><td>8,55</td></tr>
  </table></p>`,
  text: `Teniendo en cuenta que los compuestos ácidos tienen un valor de pH inferior a 7, y que las bases tienen un valor de pH mayor que 7, ¿cuáles sustancias corresponden a bases?`,
  options: [
    "HF y H₂SO₄.",
    "NaCl y H₂SO₄.",
    "Na₃PO₄ y Zn(OH)₂.",
    "NaCl y Na₃PO₄.",
  ],
  correct: 2,
  competency: "Indagación.",
  level: "",
  assertion: "Observa y relaciona patrones en los datos para evaluar las predicciones.",
  evidence: "Interpreta y analiza datos representados en texto, gráficas, dibujos, diagramas o tablas.",
  component: "Procesos químicos.",
  standard: "",
  skill: "Registro mis resultados en forma organizada y sin alteración alguna.",
  evaluationCriteria: "Esta pregunta evalúa si los estudiantes tienen la capacidad para interpretar y analizar los datos que se presentan en una tabla.",
  justification: "La opción C es la respuesta correcta porque las sustancias que tienen valores de pH mayores que 7,00 son el Na₃PO₄ y el Zn(OH)₂, 12,12 y 8,55, respectivamente.",
  invalidOptions: "La opción A no es la respuesta correcta porque las dos sustancias mencionadas tienen pH por debajo de 7,00. <br>La opción B no es la respuesta correcta porque una de las sustancias, NaCl, tiene pH neutro, mientras que la otra es una sustancia ácida, con un pH de 0,65. <br>La opción D no es la respuesta correcta porque solo una de las dos sustancias es una base, Na₃PO₄.",
},

//Ejemplo de Formato 5: Analizar relaciones entre variables o modelos
{
  id: 72,


  
  simulators: [1, 3],
  subject: "cn",
  context: `<p>Shewanella oneidensis es una bacteria anaeróbica que se encuentra en los suelos de los ríos a grandes profundidades. Esta bacteria puede ser utilizada para la producción de energía eléctrica mediante el proceso que se describe a continuación:<br><br>
  La bacteria oxida la materia orgánica y produce electrones (e⁻) que se transfieren a un electrodo mediante el compuesto químico llamado riboflavina. Luego, mediante un material conductor, los electrones viajan a un segundo electrodo, en donde ocurre una reacción de reducción y, de esta forma, se genera una corriente eléctrica.<br>
  Estos electrodos se encuentran en dos cámaras comunicadas por una membrana que permite solamente el paso de iones H⁺, como se muestra en la figura. En la cámara catódica (aerobia) se lleva a cabo la reducción del O₂ en presencia de iones H⁺ para producir agua, y en la cámara anódica (anaeróbica) se oxida la materia orgánica para producir dióxido de carbono.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/cn71.png" alt='' loading="lazy"></p>`,
  text: `Teniendo en cuenta que en cualquier reacción química se conserva la masa, ¿cuál de las siguientes ecuaciones químicas describe la reacción balanceada de la cámara catódica?`,
  options: [
    "O₂ + 4H⁺ + 4e⁻ → 2H₂O",
    "O₂ + H⁺ + 4e⁻ → 2H₂O",
    "2O₂ + 2H⁺ + 4e⁻ → 4H₂O",
    "O₂ + H⁺ + 4e⁻ → H₂O",
  ],
  correct: 0,
  competency: "Uso comprensivo del conocimiento científico.",
  level: "",
  assertion: "Asocia fenómenos naturales con conceptos propios del conocimiento científico.",
  evidence: "Diferencia distintos tipos de reacciones químicas y realiza de manera adecuada cálculos teniendo en cuenta la ley de conservación de la masa y carga.",
  component: "Procesos químicos.",
  standard: "",
  skill: "Realizo cálculos cuantitativos en cambios químicos.",
  evaluationCriteria: "Esta pregunta evalúa si los estudiantes tienen la capacidad para describir correctamente ecuaciones químicas asociadas a un fenómeno de las ciencias naturales.",
  justification: "La opción A es la respuesta correcta porque la ecuación tiene el mismo número de átomos en los reactivos y en los productos, además, la carga está balanceada.",
  invalidOptions: "La opción B no es la respuesta correcta porque en los reactivos hay menor cantidad de átomos de H que en los productos, por lo tanto, la masa de la reacción no está balanceada. <br>La opción C no es la respuesta correcta porque en los reactivos hay menor cantidad de átomos de H que en los productos, por lo tanto, la masa de la reacción no está balanceada. <br>La opción D no es la respuesta correcta porque en los reactivos hay menor cantidad de átomos de H que en los productos. Además, hay mayor cantidad de átomos de O en los reactivos que en los productos, por lo tanto, la masa de la reacción no está balanceada.",
},

//Ejemplo de Formato 6: Comprender e interpretar procesos o modelos científicos
{
  id: 75,


  
  simulators: [1, 3],
  subject: "cn",
  context: `<p>Los átomos están conformados por protones, neutrones y electrones. El número atómico (Z) representa el número de protones o de electrones en un átomo neutro. La suma del número de protones y neutrones en el núcleo se denomina número de masa (A). El sodio tiene las siguientes propiedades en la tabla periódica:<br><br>
  <table border="1" style="width:60%; border-collapse:collapse; text-align:center; margin:auto;">
    
    <tr><td>Número atómico Z</td><td>11</td><td rowspan="2"> Na</td></tr>
    <tr><td>Número de masa A</td><td>23</td></tr>
    <tr><td></td><th colspan="2">Sodio</th></tr>
  </table></p>`,
  text: `Con base en la información anterior, se puede afirmar que el sodio neutro tiene`,
  options: [
    "11 protones, 11 electrones y 11 neutrones.",
    "11 protones, 11 electrones y 12 neutrones.",
    "23 protones, 11 electrones y 23 neutrones.",
    "23 protones, 23 electrones y 11 neutrones.",
  ],
  correct: 1,
  competency: "Uso comprensivo del conocimiento científico.",
  level: "",
  assertion: "Asocia fenómenos naturales con conceptos propios del conocimiento científico.",
  evidence: "Establece relaciones entre las propiedades y estructura de la materia con la formación de iones y moléculas.",
  component: "Procesos químicos.",
  standard: "",
  skill: "Explico la estructura de los átomos a partir de diferentes teorías.",
  evaluationCriteria: "Esta pregunta evalúa si los estudiantes tienen la capacidad para identificar las partes de un átomo, su estructura y las relaciones con su estructura atómica.",
  justification: "La opción B es la respuesta correcta porque el número atómico depende del número de protones en el átomo (11), mientras que la masa atómica es la suma del número de protones (11) y neutrones en el átomo (12); además, al ser un átomo neutro tendrá el mismo número de electrones (11) que de protones.",
  invalidOptions: "La opción A no es la respuesta correcta porque reporta un menor número de neutrones que el correspondiente al el átomo de sodio, y no es claro el concepto de número de masa. <br>La opción C no es la respuesta correcta porque reporta valores erróneos del número de protones y de neutrones. <br>La opción D no es la respuesta correcta porque reporta valores erróneos del número de protones y de electrones.",
},

//Matemáticas
//Ejemplo de Formato 1: Interpretar y transformar información en diferentes representaciones
{
    id: 43,


    
    simulators: [1, 3],
    subject: "mat",
    context: `  <p>
                <img style="width:100%" src="/shared/img/questions/mat1.png" alt='' loading="lazy">  
              </p>`,
    text: "Aproximadamente, ¿qué porcentaje del total de personas que visitaron la torre esa semana entraron sin hacer reserva?",
    options: ["56 %.", "50 %.", "44 %.", "40 %."],
    correct: 2,
    competency: "Interpretación.",
    assertion:
      "Comprende y transforma la información cuantitativa y esquemática presentada en distintos formatos.",
    evidence:
      "Da cuenta de las características básicas de la información presentada en diferentes formatos como series, gráficas, tablas y esquemas.",
    standard:
      "Comparo y contrasto las propiedades de los números (naturales, enteros, racionales y reales) y las de sus relaciones y operaciones para construir, manejar y utilizar apropiadamente los distintos sistemas numéricos.",
    evaluationCriteria:
      "La capacidad para identificar el porcentaje asociado a la suma de un conjunto de números dados en una tabla.",
    justification:
      `El total de personas que entraron sin reserva fue de: 300 + 300 + 500 + 700 + 300 + 300 + 700 = 3.100, y el total de personas que entran con reserva fue de: 700 + 800 + 200 + 600 + 500 + 500 + 600 = 3.900, para un total de 3.100 + 3.900 = 7.000 visitantes a la torre. Por tanto, el porcentaje del total de personas que visitaron la torre esa semana sin hacer reserva fue de <span class='frac'><span class='num'>3.100</span><span class='den'>7.000</span></span> × 100 = <span class='frac'><span class='num'>31</span><span class='den'>70</span></span> × 100, que es aproximadamente igual a 44 %.`,
    invalidOptions:
      `Es posible que los estudiantes que elijan la opción A consideren el porcentaje de personas que entraron con reserva, es decir, <span class='frac'><span class='num'>3.900</span><span class='den'>7.000</span></span> × 100 = <span class='frac'><span class='num'>39</span><span class='den'>70</span></span> × 100, que es aproximadamente igual a 56 %. <br> Es posible que los estudiantes que elijan la opción B consideren que en cada grupo (los que entraron con reserva, y los que no hicieron reserva), hay la misma cantidad de personas y, por tanto, el porcentaje de personas que entró sin reserva es del 50 %. <br> Es posible que los estudiantes que elijan la opción D únicamente consideren la cantidad de personas que entraron con o sin reserva entre semana: 300 + 300 + 500 + 700 + 300 = 2.100 sin reserva y, 700 + 800 + 200 + 600 + 500 = 2.800 con reserva, para un total de 2.100 + 2.800 = 4.900 visitantes. Por tanto, el porcentaje del total de personas que visitaron la torre entre semana sin hacer reserva fue de <span class='frac'><span class='num'>2.100</span><span class='den'>4.900</span></span> × 100 = <span class='frac'><span class='num'>21</span><span class='den'>49</span></span> × 100, que es aproximadamente igual a 40 %.`,
},

//Ejemplo de Formato 2: Reconocer y analizar relaciones matemáticas en modelos o expresiones
{
    id: 59,


    
    simulators: [1, 3],
    subject: "mat",
    context: `<p>Para observar los efectos de un medicamento, este se inyecta en un animal y se registra el comportamiento de la temperatura (ºC) en función del tiempo (horas), como lo muestra la gráfica.</p>
      <p align='center'>
  <img  style="width:50%; " src="/shared/img/questions/mat59.png" alt='' loading="lazy">  
 </p>`,
    text: "¿Cuál de las siguientes expresiones corresponde a la curva que describe la temperatura del animal en función del tiempo?",
    options: ["", "", "", ""],
    optionsImg: [
           "mat59-A",
           "mat59-B",
           "mat59-C",
           "mat59-D",
         ],
    correct: 2,
    competency: "Formulación y ejecución.",
    assertion:
      "Frente a un problema que involucre información cuantitativa, plantea e implementa estrategias que lleven a soluciones adecuadas.",
    evidence:
      "Diseña planes para la solución de problemas que involucran información cuantitativa o esquemática.",
    standard:
      "Modelo situaciones de variación periódica con funciones trigonométricas e interpreto y utilizo sus derivadas.",
    evaluationCriteria:
      "La capacidad para construir la función trigonométrica que representa una curva en una gráfica dada.",
    justification:
      `A partir de la información de la gráfica se puede determinar que la amplitud de la curva es 2, la curva está trasladada 36 unidades hacia arriba respecto al eje horizontal, y tiene periodo 3. Por tanto, la expresión que corresponde a la curva es: <em>F</em>(<em>t</em>) = 2 sen(<span class='frac'><span class='num'>2π</span><span class='den'>3</span></span>(<em>t</em> + <em>b</em>)) + 36. Como en <em>t</em>=0, <em>F</em>(<em>t</em>)= 36, entonces 0 = 2 sen(<span class='frac'><span class='num'>2π</span><span class='den'>3</span></span> · <em>b</em>) y, por tanto, <em>b</em>=0, de donde <em>F</em>(<em>t</em>) = 2 sen(<span class='frac'><span class='num'>2π</span><span class='den'>3</span></span> · <em>t</em>) + 36.`,
    invalidOptions:
      `Es posible que los estudiantes que elijan la opción A consideren que como la amplitud de la curva es 2, la curva está trasladada 36 unidades hacia arriba respecto al eje horizontal, tiene periodo 3, e inicia en un valor mayor que 0, entonces debe estar asociada a la función coseno y, por tanto, la expresión que corresponde a la curva es <em>F</em>(<em>t</em>) = 2 cos(<span class='frac'><span class='num'>2π</span><span class='den'>3</span></span> · <em>t</em>) + 36. <br> Es posible que los estudiantes que elijan la opción B consideren la ordenada del punto más alto de la gráfica (38) como la cantidad de unidades en que se trasladó hacia arriba la curva. Además, consideran que la amplitud es el número de unidades que hay en el eje horizontal (3), y como la curva inicia en un valor mayor que 0, debe estar asociada a la función coseno; por tanto, la expresión que corresponde a la curva es <em>F</em>(<em>t</em>) = 3 cos(<span class='frac'><span class='num'>2π</span><span class='den'>3</span></span> · <em>t</em>) + 36. <br> Es posible que los estudiantes que elijan la opción D consideren que la amplitud es el número de unidades que hay en el eje horizontal (3). Además, consideran la ordenada del punto más alto de la gráfica (38) como la cantidad de unidades en que se trasladó hacia arriba la curva, asociándola, por tanto, con la expresión <em>F</em>(<em>t</em>) = 3 sen(<span class='frac'><span class='num'>2π</span><span class='den'>3</span></span> · <em>t</em>) + 36.`,
},

//Ejemplo de Formato 3: Identificar inconsistencias o condiciones en información cuantitativa
{
    id: 50,


    
    simulators: [1, 3],
    subject: "mat",
    context: `<p>En la figura se muestra la construcción de una cometa triangular, en la que se conoce únicamente la medida del ángulo <em>M</em> = 150°. El ángulo <em>O</em> debe ser menor que 150° para que la cometa vuele.</p>
  <p align='center'>
  <img  style="width:50%; " src="/shared/img/questions/mat50.png" alt='' loading="lazy">
 </p>
    <p>Se realiza el siguiente análisis para saber si la cometa volará o no volará:</p>
<p><em>I</em>. Tomando en cuenta que <em>M</em> = 150°, <em>N</em> = 180° - 150°.<br>
<em>II</em>. <em>N</em> = 30°.<br>
<em>III</em>. La suma de los ángulos de un triángulo debe ser 160°.<br>
<em>IV</em>. Si <em>N</em> = 30°, <em>O</em> + <em>P</em> = 160° - 30°.<br>
<em>V</em>. <em>O</em> + <em>P</em> = 130°.<br>
<em>VI</em>. Así que <em>O</em> debe ser menor que 130°.<br>
<em>VII</em>. Finalmente, si <em>O</em> &lt; 130° entonces <em>O</em> &lt; 150°.<br>
<em>VIII</em>. La cometa volará.</p>`,
    text: "Del anterior análisis, el paso en el que se comete un error es el",
    options: [
      "<em>I</em>, porque si <em>M</em> = 150°, <em>N</em> debe ser la resta entre 160° y 150°, es decir, <em>N</em> = 10°.",
      "<em>III</em>, porque la suma de los ángulos internos de un triángulo debe ser 180°.",
      "<em>VII</em>, porque <em>O</em> &lt; 130° no quiere decir <em>O</em> &lt; 150°.",
      "<em>VIII</em>, porque si <em>O</em> &lt; 150° la cometa no volará.",
    ],
    correct: 1,
    competency: "Argumentación.",
    assertion:
      "Valida procedimientos y estrategias matemáticas utilizadas para dar solución a problemas.",
    evidence:
      "Argumenta a favor o en contra de un procedimiento para resolver un problema a la luz de criterios presentados o establecidos.",
    standard:
      "Uso argumentos geométricos para resolver y formular problemas en contextos matemáticos y en otras ciencias.",
    evaluationCriteria:
      "La capacidad para justificar un error en un procedimiento para determinar si una figura dada cumple con una condición establecida.",
    justification:
      `La suma de los ángulos internos de un triángulo debe ser igual a 180°. Por tanto:<br> <em>O</em> + <em>P</em> = 180° – 30° = 150°, de donde <em>O</em> &lt; 150°. <br>La conclusión sigue siendo verdadera, pero en la argumentación había una premisa falsa.`,
    invalidOptions:
      `Es posible que los estudiantes que elijan la opción A consideren que la suma de dos ángulos suplementarios es igual a 160°. <br> Es posible que los estudiantes que elijan la opción C consideren que si <em>O</em> &lt; 130°, a lo sumo se puede asegurar que <em>O</em> + 20° &lt; 130° + 20° = 150°, pero no se puede establecer una relación únicamente entre <em>O</em> y 150°. <br> Es posible que los estudiantes que elijan la opción D asocien la expresión "<em>O</em> &lt; 150°" con que el ángulo <em>O</em> es mayor que 150°, por lo que la cometa no volaría.`,
},

//Ejemplo de Formato 4: Resolver problemas mediante la aplicación de procedimientos matemáticos
{
    id: 42,


    
    simulators: [1, 3],
    subject: "mat",
    context: `
  <p>
  <img style="width:100%" src="/shared/img/questions/mat1.png" alt='' loading="lazy">  
 </p>
<p>
  <img style="width:50%" src="/shared/img/questions/mat2.png" alt='' loading="lazy">  
 </p>
<p>Con respecto a la vertical, la torre se ha inclinado 4° como se muestra en la gráfica.</p>`,
    text: "¿Cuánto mide el otro ángulo?",
    options: ["4º", "14º", "86º", "90º"],
    correct: 2,
    competency: "Interpretación.",
    assertion:
      "Comprende y transforma la información cuantitativa y esquemática presentada en distintos formatos.",
    evidence:
      "Da cuenta de las características básicas de la información presentada en diferentes formatos como series, gráficas, tablas y esquemas.",
    standard:
      "Identifico características de localización de objetos geométricos en sistemas de representación cartesiana y otros (polares, cilíndricos y esféricos) y en particular de las curvas y figuras cónicas.",
    evaluationCriteria:
      "La capacidad para identificar el ángulo complementario a un ángulo dado.",
    justification:
      "La suma de los dos ángulos debe ser igual a 90°. Como el ángulo de inclinación de la torre es de 4°, entonces el otro ángulo mide 90° – 4° = 86°.",
    invalidOptions:
      "Es posible que los estudiantes que elijan la opción A solamente identifique el ángulo de inclinación (4°). <br> Es posible que los estudiantes que elijan la opción B consideren que la suma de los dos ángulos debe ser igual a 18°. Por tanto, el otro ángulo mide 18° – 4° = 14°. <br> Es posible que los estudiantes que elijan la opción D solamente consideren que la suma de los dos ángulos debe ser igual a 90°.",
},

//Ejemplo de Formato 5: Plantear y ejecutar estrategias para resolver problemas
{
    id: 55,


    
    simulators: [1, 3],
    subject: "mat",
    context: `<p>En el servicio de urgencias de un hospital se sigue este procedimiento para clasificar a un paciente: en el momento de su llegada recibe un número de turno con la hora de llegada; cuando el tablero digital muestra ese número, el paciente pasa a valoración y se clasifica; luego regresa a la sala a esperar el llamado para ser atendido.</p>
<p>La tabla muestra los niveles de clasificación, el tiempo de espera en sala desde que el paciente recibe el turno y el porcentaje de personas clasificadas diariamente en cada nivel.</p>
  <p align='center'>
  <img  style="width:100%; " src="/shared/img/questions/mat55.png" alt='' loading="lazy">  
 </p>
<p>Isabel llegó a este hospital y recibió el turno 180. Fue clasificada en Nivel III y al cabo del máximo tiempo indicado para ese nivel es llamada para ser atendida; en ese momento observa que el tablero digital va en el número 240.</p>`,
    text: "¿Aproximadamente cuántas personas por hora llegaron a la sala de espera mientras Isabel estuvo allí?",
    options: [
      "60 personas por hora.",
      "40 personas por hora.",
      "15 personas por hora.",
      "10 personas por hora.",
    ],
    correct: 3,
    competency: "Formulación y ejecución.",
    assertion:
      "Frente a un problema que involucre información cuantitativa, plantea e implementa estrategias que lleven a soluciones adecuadas.",
    evidence:
      "Resuelve un problema que involucra información cuantitativa o esquemática.",
    standard:
      "Interpreto la noción de derivada como razón de cambio y como valor de la pendiente de la tangente a una curva y desarrollo métodos para hallar las derivadas de algunas funciones básicas en contextos matemáticos y no matemáticos.",
    evaluationCriteria:
      "La capacidad para determina la razón de cambio que satisface las condiciones dadas.",
    justification:
      `Como Isabel fue clasificada en el Nivel III, recibió el turno 180 cuando llegó, y fue atendida en el tiempo máximo de espera que es de 6 horas, entonces, cuando observa el número 240 al momento de ser atendida han llegado 240 personas – 180 personas = 60 personas adicionales y, por tanto, han llegado <span class='frac'><span class='num'>60 personas</span><span class='den'>6 horas</span></span> = 10 personas por hora.`,
    invalidOptions:
      `Es posible que los estudiantes que elijan la opción A solamente consideren la cantidad adicional de personas que llegó al hospital después de que Isabel llegó, es decir 240 – 180 = 60. <br> Es posible que los estudiantes que elijan la opción B consideren que en las 6 horas en que estuvo Isabel en sala de espera llegaron 240 personas y, por tanto, han llegado <span class='frac'><span class='num'>240 personas</span><span class='den'>6 horas</span></span> = 40 personas por hora. <br> Es posible que los estudiantes que elijan la opción C consideren que Isabel estuvo solo 4 horas en la sala de espera (tiempo mínimo de espera) y, por tanto, han llegado <span class='frac'><span class='num'>60 personas</span><span class='den'>4 horas</span></span> = 15 personas por hora.`,
},

//Ejemplo de Formato 6: Analizar condiciones y restricciones en situaciones matemáticas
{
    id: 48,


    
    simulators: [1, 3],
    subject: "mat",
    context: `<p>Se lanzan cuatro fichas que tienen dos caras cada una. Una de las fichas es azul por sus dos caras, otra es blanca por sus dos caras y las otras fichas tienen una cara azul y una cara blanca.</p>`,
    text: "¿Cuál de los siguientes eventos es imposible que ocurra?",
    options: [
      "Obtener una cara azul y tres caras blancas.",
      "Obtener dos caras azules y dos caras blancas.",
      "Obtener tres caras azules y una cara blanca.",
      "Obtener cuatro caras azules y cero blancas.",
    ],
    correct: 3,
    competency: "Formulación y ejecución.",
    assertion:
      "Frente a un problema que involucre información cuantitativa, plantea e implementa estrategias que lleven a soluciones adecuadas.",
    evidence:
      "Resuelve un problema que involucra información cuantitativa o esquemática.",
    standard:
      "Resuelvo y planteo problemas usando conceptos básicos de conteo y probabilidad (combinaciones, permutaciones, espacio muestral, muestreo aleatorio, muestreo con remplazo).",
    evaluationCriteria:
      "La capacidad para determinar un evento imposible a partir de la descripción del experimento aleatorio.",
    justification:
      "Dado que hay una ficha con sus dos caras blancas, y son cuatro fichas en total, en cualquier lanzamiento de las cuatro fichas siempre se obtendrá al menos una cara blanca. Por tanto, es imposible obtener cuatro caras azules y cero blancas.",
    invalidOptions:
      "Es posible que los estudiantes que elijan la opción A consideren que solo se puede asegurar que siempre se obtendrá una cara blanca y no tres caras blancas. <br> Es posible que los estudiantes que elijan la opción B consideren que, como solo hay una ficha que tienen sus dos caras azules y solo hay una ficha que tiene sus dos caras blancas, es imposible obtener dos caras azules y dos caras blancas en un solo lanzamiento. <br> Es posible que los estudiantes que elijan la opción C consideren que, como hay la misma cantidad de caras azules y blancas en las cuatro fichas, en el resultado de cada lanzamiento siempre se debe obtener la misma cantidad de caras azules y blancas.",
},


// Ingles
//Ejemplo de Formato 1: Relación de conceptos (Matching)
{
  id: 85,


  
  simulators: [1, 3],
  subject: "ing",
  context: `<p>Lea las descripciones, ¿Cuál palabra (A - G) concuerda con cada descripción? La opción H se usa para el ejemplo.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/ing81.png" alt='' loading="lazy"></p>
  <p><strong>H. toothache</strong></p>`,
  text: `You can have this when you eat too much.`,
  options: [
    "cold",
    "cough",
    "cry",
    "doctor",
    "hospital",
    "medicine",
    "stomach-ache",
  ],
  correct: 6,
  competency: "",
  level: "A1",
  assertion: "",
  evidence: "",
  component: "",
  standard: "",
  skill: "",
  evaluationCriteria: "",
  justification: "La opción G, puesto que es posible tener un dolor de estómago cuando se come demasiado.",
  invalidOptions: "Ninguna de las demás opciones se refiere a lo que podría suceder si se come demasiado.",
},

//Ejemplo de Formato 2: Interacción social
{
  id: 86,


  
  simulators: [1, 3],
  subject: "ing",
  context: `<p>Complete la conversación. En las preguntas, marque A, B o C.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/ing86.png" alt='' loading="lazy"></p>`,
  text: `I don't think I'm going to enter the poster competition.`,
  options: [
    "Certainly!",
    "Good luck!",
    "What a pity!",
  ],
  correct: 2,
  competency: "",
  level: "A2",
  assertion: "",
  evidence: "",
  component: "",
  standard: "",
  skill: "",
  evaluationCriteria: "",
  justification: "La opción C, puesto que el interlocutor 1 está expresando que ya no va a hacer parte de una competencia, y la respuesta del interlocutor 2 expresa algún tipo de lástima o pesar respecto a esa situación.",
  invalidOptions: "La opción A es una expresión de acuerdo y la opción B es una expresión que se utiliza para desear buena suerte. Ninguna de estas opciones reconoce que lo expresado por el interlocutor 1 es probablemente una situación negativa que requiere empatía.",
},

//Ejemplo de Formato 3: Comprensión literal
{
  id: 89,


  
  simulators: [1, 3],
  subject: "ing",
  context: `<p>Lea el texto y responda las preguntas. Marque A, B o C.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/ing89.png" alt='' loading="lazy"></p>`,
  text: `The second country where most people eat pasta is`,
  options: [
    "the Philippines.",
    "Mexico.",
    "Venezuela.",
  ],
  correct: 2,
  competency: "",
  level: "A2",
  assertion: "",
  evidence: "",
  component: "",
  standard: "",
  skill: "",
  evaluationCriteria: "",
  justification: "El enunciado solicita información sobre el segundo país que más consume pasta. La opción correcta es la C, puesto que al final del primer párrafo se menciona que, en este aspecto de consumir pasta, Italia es seguido por Venezuela.",
  invalidOptions: "Las otras dos opciones, Filipinas y México, son mencionadas como países lejanos a Italia donde se consume pasta, pero ninguno de ellos es el segundo en la lista.",
},

//Ejemplo de Formato 4: Comprensión inferencial y global
{
  id: 95,


  
  simulators: [1, 3],
  subject: "ing",
  context: `<p>Lea el texto y responda las preguntas. Marque A, B, C o D.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/ing95.png" alt='' loading="lazy"></p>`,
  text: `What is the author mainly doing with the text?`,
  options: [
    "describing people who spend hours in front of the screen",
    "suggesting that there are better leisure activities than TV",
    "warning about consequences of watching the news all day",
    "explaining why television is important to keep up-to-date",
  ],
  correct: 1,
  competency: "",
  level: "B1",
  assertion: "",
  evidence: "",
  component: "",
  standard: "",
  skill: "",
  evaluationCriteria: "",
  justification: "El enunciado pregunta por la intención del autor. Esta se expresa con más claridad en la opción B, sugerir que hay mejores actividades de ocio que ver televisión, puesto que, en el primer párrafo, el autor menciona explícitamente como tesis que hay mejores actividades para hacer que ver televisión. Del mismo modo, a lo largo del texto el autor explica por qué ciertos beneficios asociados con la televisión como educarse o mantenerse informado no son realmente una ventaja de ver televisión, dado que la información presentada no siempre es confiable y es mejor realizar actividades como la lectura. Finalmente, el autor sugiere otras actividades de aprendizaje y deportes que podrían realizarse en lugar de ver televisión.",
  invalidOptions: "La opción A menciona describir a la gente que gasta horas en frente de la televisión, lo que no sucede en el texto, pues se habla de tiempos promedio de ver televisión, pero no de cómo es la gente que lo hace. La opción C habla de advertir acerca de las consecuencias de ver noticias todo el día, lo que no sucede en el texto, pues apenas se menciona en el segundo párrafo que el programa promedio de noticias da información inútil, pero no se elabora en los efectos de consumir dicha información. Finalmente, la opción D dice explicar por qué la televisión es importante para mantenernos actualizados lo que iría en contra de lo dicho por el texto, que realmente pretende desestimar el uso del televisor.",
},

//Ejemplo de Formato 5: Conocimiento léxico-gramatical (Cloze)
{
  id: 100,
  simulators: [1, 3],
  subject: "ing",
  context: `<p>Lea el texto y seleccione la palabra correcta para cada espacio. Marque A, B, C o D.</p>
  <p align='center'><img style="width:100%;" src="/shared/img/questions/ing100.png" alt='' loading="lazy"></p>`,
  text: `Para el espacio 20 la palabra correcta es:`,
  options: [
    "On",
    "For",
    "During",
    "At",
  ],
  correct: 2,
  competency: "",
  level: "B1",
  assertion: "",
  evidence: "",
  component: "",
  standard: "",
  skill: "",
  evaluationCriteria: "",
  justification: `La opción correcta es la C porque, esta preposición, durante, se utiliza para referirse a un periodo de tiempo correspondido entre un intervalo impreciso, en este caso los años veinte. <br>Para responder esta pregunta los estudiantes deben conocer el uso de preposiciones de tiempo.`,
  invalidOptions: `La preposición de la opción A se suele utilizar para referirse a días. La preposición de la opción B suele utilizarse para referirse a la cantidad de tiempo específico que alguien duró haciendo algo o algo tardó en realizarse. La preposición de la opción D suele utilizarse para referirse a horas exactas. <br>Por consiguiente, ninguna de estas preposiciones completa el espacio en blanco correctamente.`,
},

//Lectura
// Formato ICFES: 2=Articulación del texto
  {
    "id": 101,
 
    "simulators": [3],
    "subject": "lc",
    "formatType": 2,
    "context": "<p>RESPONDA LA PREGUNTA DE ACUERDO CON LA SIGUIENTE INFORMACIÓN:</p><p>El primer gran filósofo del siglo diecisiete (si exceptuamos a Bacon y Galileo) fue Descartes, y si alguna vez se dijo de alguien que estuvo a punto de ser asesinado habrá que decirlo de él.</p><p>La historia es la siguiente, según la cuenta Baillet en su <em>Vie de M. Descartes</em>, tomo I, páginas 102-103. En 1621, Descartes, que tenía unos veintiséis años, se hallaba como siempre viajando (pues era inquieto como una hiena) y, al llegar al Elba, tomó una embarcación para Friezland oriental. Nadie se ha enterado nunca de lo que podía buscar en Friezland oriental y tal vez él se hiciera la misma pregunta, ya que, al llegar a Embden, decidió dirigirse al instante a Friezland occidental, y siendo demasiado impaciente para tolerar cualquier demora, alquiló una barca y contrató a unos cuantos marineros.</p><p>Tan pronto habían salido al mar cuando hizo un agradable descubrimiento, al saber que se había encerrado en una guarida de asesinos. Se dio cuenta, dice M. Baillet, de que su tripulación estaba formada por criminales, no aficionados, señores, como lo somos nosotros, sino profesionales cuya máxima ambición, por el momento, era degollarlo.</p><p>La historia es demasiado amena para resumirla y a continuación la traduzco cuidadosamente del original francés de la biografía: \"M. Descartes no tenía más compañía que su criado, con quien conversaba en francés. Los marineros, creyendo que se trataba de un comerciante y no de un caballero, pensaron que llevaría dinero consigo y pronto llegaron a una decisión que no era en modo alguno ventajosa para su bolsa. Entre los ladrones de mar y los ladrones de bosques, hay esta diferencia, que los últimos pueden perdonar la vida a sus víctimas sin peligro para ellos, en tanto que si los otros llevan a sus pasajeros a la costa, corren grave peligro de ir a parar a la cárcel. La tripulación de M. Descartes tomó sus precauciones para evitar todo ries...</p>",
    "contextImg": "",
    "questionImg": "",
    "text": "A juzgar por su estilo, tema y estructura, ¿en cuál de los siguientes contextos estaría inscrito más apropiadamente el pasaje anterior?",
    "options": [
      "En una revista académica, como parte de un artículo sobre los orígenes y la importancia de la filosofía cartesiana.",
      "En un discurso ofrecido a un grupo conformado por aficionados al estudio de asesinatos en la historia de la filosofía.",
      "En una crónica periodística, con motivo de un especial acerca de las muertes más curiosas de la historia.",
      "En un seminario dirigido a historiadores especialistas en la vida de los personajes insignes del siglo XX."
    ],
    "optionsImg": [],
    "correct": 1,
    "competency": "Comprensión lectora",
    "level": "",
    "assertion": "Reflexiona a partir de un texto y evalúa su contenido.",
    "evidence": "Contextualiza adecuadamente un texto o la información contenida en él.",
    "component": "",
    "standard": "",
    "skill": "",
    "evaluationCriteria": "",
    "justification": "",
    "invalidOptions": ""
  },
  
  // Formato ICFES: 3=Reflexión y evaluación
  {
    "id": 104,
 
    "simulators": [3],
    "subject": "lc",
    "formatType": 3,
    "context": "<p>RESPONDA LA PREGUNTA DE ACUERDO CON LA SIGUIENTE INFORMACIÓN:</p><p><em>Con el siguiente fragmento comienza la novela \"Sin remedo\" de Antonio Caballero. Los sucesos tienen lugar en la madrugada. Los protagonistas son Escobar, un poeta frustrado, y Fina, la mujer con quien vive.</em></p><p>A los treinta y un años Rimbaud estaba muerto. Desde la madrugada de sus treinta y un años Escobar contempló la revelación, parada en el alféizar como un pájaro: a los treinta y un años Rimbaud estaba muerto. Increíble.</p><p>Fina seguía durmiendo junto a él, como si no se diera cuenta de la gravedad de la cosa. Le tapó las narices con dos dedos. Fina gimió, se revolvió en las sábanas; y después, con un ronquido, empezó a respirar tranquilamente por la boca. Las mujeres no entienden.</p><p>Afuera cantaron los primeros pájaros, se oyó el ruido del primer motor, que es siempre el de una motocicleta. Es la hora de morir. Sentado sobre el coxis, con la nuca apoyada en el filo del espaldar de la cama y los ojos mirando el techo sin molduras, Escobar se esfuerzo por no pensar en nada. Que el universo lo absorbiera dulcemente, sin ruido. Que cuando Fina al fin se despertara hallara apenas un charquito de humedad entre las sábanas revueltas. Pensó que ya nunca más sería el mismo que se esforzaba ahora por no pensar en nada; pensó que nunca más sería el mismo que ahora pensaba que nunca más sería el mismo. Pero afuera crecían los ruidos de la vida. Sintió en su bajo vientre una punzada de advertencia: las ganas de orinar. La vida. Ah, levantarse. Tampoco esta vez moriremos.</p><p>Vio asomar una raja delgada de sol por sobre el filo de los cerros, como un ascua. El sol entero se alzó de un solo golpe, globuloso, rosado oscuro en la neblina, y más arriba el cielo era ya azul, azul añil, tal vez: ¿Cuál es el azul añil? Y más arriba todavía, de un azul más profundo, tal vez azul cobalto. Como todos los días, probablemente.</p>",
    "contextImg": "",
    "questionImg": "",
    "text": "A partir de sus pensamientos y actitudes, es posible concluir que Escobar es un hombre",
    "options": [
      "psicótico y con tendencias depresivas.",
      "entusiasta y entregado a su pareja.",
      "organizado e inmerso en la rutina.",
      "sensible y con angustias."
    ],
    "optionsImg": [],
    "correct": 3,
    "competency": "Comprensión lectora",
    "level": "",
    "assertion": "Reflexiona a partir de un texto y evalúa su contenido.",
    "evidence": "Elabora inferencias y conclusiones sobre el contenido del texto.",
    "component": "",
    "standard": "",
    "skill": "",
    "evaluationCriteria": "",
    "justification": "",
    "invalidOptions": ""
  },
  
  // Formato ICFES: 1=Identificar contenidos locales
  {
    "id": 106,
 
    "simulators": [3],
    "subject": "lc",
    "formatType": 1,
    "context": "<p>RESPONDA LA PREGUNTA DE ACUERDO CON LA SIGUIENTE INFORMACIÓN:</p><p><strong>LA PÉRDIDA DE LA PRIVACIDAD</strong></p><p>El primer efecto de la globalización de la comunicación por Internet ha sido la crisis de la noción de límite. El concepto de límite es tan antiguo como la especie humana, incluso como todas las especies animales. La etología nos enseña que todos los animales reconocen que hay a su alrededor y en torno a sus semejantes una burbuja de respeto, un área territorial dentro de la cual se sienten seguros, y reconocen como adversario al que sobrepasa dicho límite. La antropología cultural nos ha demostrado que esta burbuja varía según las culturas, y que la proximidad, que para unos pueblos es expresión de confianza, para otros es una intrusión y una agresión.</p><p>En el caso de los humanos, esta zona de protección se ha extendido del individuo a la comunidad. El límite —de la ciudad, de la región, del reino— siempre se ha considerado una especie de ampliación colectiva de las burbujas de protección individual. Los muros pueden servir para que un régimen despótico mantenga a sus súbditos en la ignorancia de lo que sucede fuera de ellos, pero en general garantizan a los ciudadanos que los posibles intrusos no tengan conocimiento de sus costumbres, de sus riquezas, de sus inventos. La Gran Muralla China no solo defendía de las invasiones a los súbditos del Imperio Celeste, sino que garantizaba, además, el secreto de la producción de seda.</p><p>No obstante, con Internet se rompen los límites que nos protegían y la privacidad queda expuesta. Esta desaparición de las fronteras ha provocado dos fenómenos opuestos. Por un lado, ya no hay comunidad nacional que pueda impedir a sus ciudadanos que saben lo que sucede en otros países, y pronto será imposible impedir que el súbdito de cualquier dictadura conozca en tiempo real lo que ocurre en otros lugares; además, en medio de una oleada migratoria imparable, se forman naciones por fuera de las fronteras físicas.</p>",
    "contextImg": "",
    "questionImg": "",
    "text": "En el tercer párrafo, cuando el autor menciona a las naciones que se forman fuera de las fronteras físicas, hace referencia a",
    "options": [
      "los individuos de una misma cultura que viven en territorios diferentes.",
      "la fluencia migratoria que genera el amplio número de turistas.",
      "el encuentro virtual de personas de pensamientos diferentes.",
      "las comunidades virtuales que se crean en el ciberespacio."
    ],
    "optionsImg": [],
    "correct": 0,
    "competency": "Comprensión lectora",
    "level": "",
    "assertion": "Comprende cómo se articulan las partes de un texto para darle un sentido global.",
    "evidence": "Comprende el significado de elementos locales que constituyen un texto.",
    "component": "",
    "standard": "",
    "skill": "",
    "evaluationCriteria": "",
    "justification": "",
    "invalidOptions": ""
  },


//Competencias Ciudadanas
// Formato ICFES: 1=Pensamiento social
{
    id: 191,


    
    simulators: [1],
    subject: "soc",
    context: `<p>En un colegio se realizó la reunión mensual del Consejo Directivo. En dicha reunión, la representante de estudiantes dijo que los alumnos estaban en desacuerdo con el uso que se le estaba dando al dinero recogido en algunas actividades culturales; por ello, proponían hacer parte de la toma de decisiones sobre el uso de ese dinero.</p><p>Luego de finalizada la reunión, el tesorero le dijo a la representante de estudiantes que no podría asistir a las siguientes reuniones si volvía a hablar sobre el uso del dinero recogido por actividades culturales.</p><p>De acuerdo con el funcionamiento del Gobierno Escolar, ¿a cuál de las siguientes instancias debe dirigirse la representante de estudiantes para que se respete su derecho a expresarse libremente?</p>`,
    text: "De acuerdo con el funcionamiento del Gobierno Escolar, ¿a cuál de las siguientes instancias debe dirigirse la representante de estudiantes para que se respete su derecho a expresarse libremente?",
    options: [
      "Al Consejo Académico.",
      "Al personero.",
      "Al Consejo Disciplinar.",
      "Al rector.",
    ],
    correct: 3,
    competency: "Pensamiento Social (Competencias Ciudadanas).",
    level: "",
    assertion: "Comprende modelos conceptuales, sus características y contextos de aplicación.",
    evidence: "Conoce los mecanismos que los ciudadanos tienen a su disposición para participar activamente en la democracia y para garantizar el respeto de sus derechos.",
    component: "",
    standard: "Participo constructivamente en iniciativas o proyectos a favor de la no-violencia en el nivel local o global.",
    skill: "",
    evaluationCriteria: "El conocimiento de los mecanismos para participar en la institución escolar.",
    justification: "La opción D es correcta porque el rector es el responsable de liderar y convocar el Consejo Directivo, que es el órgano que puede dirimir esos asuntos.",
    invalidOptions: "La opción A es incorrecta, ya que el Consejo Académico tiene como función discutir los aspectos pedagógicos y curriculares de la institución. La opción B es incorrecta, ya que la función del personero es promover el cumplimiento de los derechos y deberes de los estudiantes y no dirimir situaciones de conflicto. La opción C es incorrecta, ya que en este caso ningún estudiante está cometiendo ninguna infracción.",
  },
  
  // Formato ICFES: 3=Pensamiento Reflexivo y Sistémico

  {
    id: 194,


    
    simulators: [1],
    subject: "soc",
    context: `<p>En un país se encontró que muchos estudiantes están repitiendo cursos, por mal rendimiento académico, y esta situación ha generado un aumento en los costos en los colegios públicos. Además, el alto número de estudiantes repitentes ha reducido los cupos estudiantiles disponibles para aquellos jóvenes que llegan a determinado grado después de haber aprobado el grado anterior. Para solucionar este problema, se aprobó un decreto según el cual solo se permite en cada colegio que el 5 % de los estudiantes en determinado grado lo repita al año siguiente.</p>`,
    text: "¿Qué impacto negativo puede tener esta política en lo que se refiere a la formación educativa?",
    options: [
      "Que muchos estudiantes aprueben los cursos sin haber aprendido lo que corresponde.",
      "Que la mayoría de estudiantes tarden la misma cantidad de años en terminar sus estudios.",
      "Que al disminuir el número de estudiantes disminuyan los ingresos de los colegios públicos.",
      "Que aumente el número de cupos estudiantiles disponibles en cada uno de los grados.",
    ],
    correct: 0,
    competency: "Pensamiento Reflexivo y Sistémico (Competencias Ciudadanas).",
    level: "",
    assertion: "Comprende que los problemas y sus soluciones involucran distintas dimensiones y reconoce relaciones entre estas.",
    evidence: "Analiza los efectos en distintas dimensiones que tendría una posible intervención.",
    component: "",
    standard: "Conozco y sé usar los mecanismos constitucionales de participación que permiten expresar mis opiniones y participar en la toma de decisiones políticas tanto a nivel local como a nivel nacional.",
    skill: "",
    evaluationCriteria: "La capacidad de analizar los efectos no deseados de una posible intervención.",
    justification: "La opción A es la correcta porque pone en evidencia las consecuencias negativas de la política en el ámbito educativo para los estudiantes.",
    invalidOptions: "La opción B es incorrecta porque la reforma educativa no homogeniza la cantidad de años que tarden los estudiantes en terminar sus estudios. La opción C es incorrecta, ya que en el contexto se dice que esta decisión se toma entre otras razones porque necesitan aumentar los cupos en las instituciones, y los recursos de las mismas. La opción D es incorrecta, ya que el aumento de cupos no es una consecuencia negativa.",
  },

  // Formato ICFES: 2=Interpretación y Análisis de Perspectivas
  {
    id: 195,
    simulators: [1],
    subject: "soc",
    context: `<p>Lea atentamente el siguiente fragmento de la Ley de víctimas y restitución de tierras, aprobada por el Congreso en el 2011:</p><p>"Se consideran víctimas, para los efectos de esta ley, aquellas personas que individual o colectivamente hayan sufrido un daño (…) como consecuencia de infracciones al Derecho Internacional Humanitario o de violaciones graves y manifiestas a las normas internacionales de Derechos Humanos, ocurridas con ocasión del conflicto armado interno. También son víctimas el cónyuge, compañero o compañera permanente, parejas del mismo sexo y familiar en primer grado de consanguinidad (…) cuando a estas se le hubiere dado muerte o estuviere desaparecida (…) de la misma manera se consideran víctimas las personas que hayan sufrido un daño al intervenir para asistir a la víctima en peligro (…)".</p>`,
    text: "Puede afirmarse que uno de los propósitos centrales de incluir esta definición de víctimas en el marco de la ley es",
    options: [
      "beneficiar con ayudas del Estado a las personas que fueron víctimas de los delitos más graves.",
      "garantizar los derechos de quienes fueron afectados directa o indirectamente por el conflicto.",
      "incluir elementos del derecho internacional sobre víctimas que complementan las leyes nacionales.",
      "diferenciar claramente las víctimas de la guerrilla de las víctimas de los grupos paramilitares.",
    ],
    correct: 1,
    competency: "Interpretación y Análisis de Perspectivas (Ciencias Sociales).",
    level: "",
    assertion: "Comprende perspectivas de distintos actores y grupos sociales.",
    evidence: "Reconoce y compara perspectivas de actores y grupos sociales.",
    component: "",
    standard: "Comprendo que el ejercicio político es el resultado de esfuerzos por resolver conflictos y tensiones que surgen en las relaciones de poder entre los Estados y en el interior de ellos mismos.",
    skill: "",
    evaluationCriteria: "La habilidad para interpretar la intención de un autor frente a un tema específico.",
    justification: "La opción B es la correcta porque la definición amplía el concepto de víctima, incluyendo a la red social más cercana, lo que permite reconocer afectaciones directas e indirectas.",
    invalidOptions: "La opción A es incorrecta, ya que la definición de víctima que se encuentra en el contexto no se enfoca en las ayudas que el Estado debe dar a las víctimas del conflicto. La opción C es incorrecta porque el propósito es formular un marco de referencia más amplio para las personas que sufrieron de diferentes maneras el conflicto armado, y no solamente aquellas que lo vivieron directamente. La opción D es incorrecta, ya que la definición de las víctimas no hace distinción entre ellas según el grupo armado que perpetró la violencia.",
  }
];

// Funciones de acceso a datos
function getQuestionsByArea(area) {
  return PREGUNTAS.filter(q => q.subject === area);
}

function getQuestionById(id, area) {
  return PREGUNTAS.find(q => q.id === id && q.subject === area);
}