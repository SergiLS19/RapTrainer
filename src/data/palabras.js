// palabras.js - Data for random words functionality

// Todas las palabras disponibles mezcladas
const allWords = [
  'amor','calle','fuego','sombra','ritmo','sangre','mente','tiempo','sueño','voz',
  'luz','ruido','alma','piel','noche','día','verso','latido','eco','mirada',
  'viento','paso','historia','golpe','silencio','caos','orden','camino','raíz','frontera',
  'humo','verdad','mentira','grito','llanto','sonrisa','ira','miedo','valor','hambre',
  'sed','poder','honor','precio','peso','vuelo','caída','pulso','nervio','instinto',
  'razón','memoria','olvido','secreto','promesa','traición','fe','duda','suerte','destino',
  'azar','juego','trampa','regla','ley','barrio','esquina','asfalto','cemento','pared',
  'graffiti','sudor','cicatriz','herida','cura','veneno','remedio','trueno','tormenta','lluvia',
  'nube','cielo','infierno','paraíso','ángel','demonio','diablo','santo','pecado','culpa',
  'perdón','castigo','juicio','reino','corona','trono','rey','reina','príncipe','guerrero',
  'soldado','arma','escudo','espada','balas','pistola','rifle','cuchillo','batalla','guerra',
  'paz','tregua','alianza','enemigo','rival','odio','respeto','lealtad','familia','hermano',
  'hermana','madre','padre','abuelo','abuela','hijo','hija','apellido','nombre','firma',
  'papel','contrato','negocio','dinero','oro','plata','cobre','billete','moneda','deuda',
  'robo','fraude','estafa','policía','juez','cárcel','celda','reja','llave','candado',
  'puerta','ventana','techo','suelo','cama','almohada','hogar','callejón','avenida','ciudad',
  'pueblo','país','bandera','himno','lengua','palabra','frase','letra','sílabas','rima',
  'flow','tempo','compás','beat','bombo','caja','sample','micrófono','escenario','público',
  'aplausos','freestyle','improvisación','ingenio','astucia','magia','mito','leyenda','cuento','poema',
  'tinta','libro','página','origen','impacto','explosión','chispa','ceniza','polvo','arena',
  'metal','hierro','acero','cadena','fuerza','puño','mano','espalda','pierna','huella',
  'rumbo','norte','sur','mapa','viaje','ruta','destino','tren','metro','motor',
  'velocidad','riesgo','mensaje','código','datos','red','sistema','error','pantalla','imagen',
  'color','negro','blanco','rojo','azul','verde','arte','lienzo','espejo','reflejo',
  'original','estilo','moda','ropa','gorra','reloj','lujo','fama','anonimato','control',
  'cámara','foto','video','actor','máscara','teatro','drama','risa','ironía','crítica',
  'opinión','decisión','cambio','revolución','protesta','multitud','persona','mente','cuerpo','espíritu',
  'idea','concepto','creencia','teoría','hecho','dato','número','cantidad','equilibrio','armonía',
  'ciclo','patrón','grupo','equipo','tribu','cultura','ritual','fiesta','baile','energía',
  'talento','habilidad','disciplina','esfuerzo','trabajo','tiempo','reloj','segundo','minuto','hora',
  'pasado','presente','futuro','instante','ocasión','racha','impulso','vibra','atmósfera','calor',
  'frío','agua','tierra','aire','vida','muerte','nacimiento','fin','conexión','vínculo',
  'tensión','presión','reacción','dolor','placer','sacrificio','recompensa','logro','fracaso','lección',
  'aprendizaje','maestro','alumno','escuela','reto','desafío','meta','objetivo','plan','estrategia',
  'jugada','apuesta','ganancia','pérdida','resultado','final'
];


// Get random words
export const getRandomWords = (count) => {
  const result = [];
  const usedIndices = new Set();
  const wordsCount = Math.min(count, allWords.length);

  for (let i = 0; i < wordsCount; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * allWords.length);
    } while (usedIndices.has(randomIndex));

    usedIndices.add(randomIndex);
    result.push(allWords[randomIndex]);
  }

  return result;
};

// Legacy exports for compatibility
export const getCategories = () => [];
export const getCategoryInfo = () => ({});
