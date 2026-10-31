/* ============================================================
   CONTENIDO DEL PORTAFOLIO: edita solo este archivo.
   - Todo texto entre se muestra como
     "pendiente por completar" (resaltado en ámbar).
   - Cuando completes un dato, quita los corchetes.
   - Nada de lo que está aquí es una cifra o resultado inventado.
   ============================================================ */

window.SITE = {
  /* ---------- Datos de contacto, enlaces y archivos ---------- */
  config: {
    email: "arteagaisabella33@gmail.com",            // ej.: "tucorreo@dominio.com"  (activa el botón y el formulario)
    whatsapp: "",         // ej.: "573001234567" (código de país + número, sin espacios ni signos)
    linkedin: "",         // ej.: "https://www.linkedin.com/in/tu-perfil"
    cv: "assets/hoja-de-vida.pdf",
    photo: "assets/retrato-casco-naranja.webp",
    photoCutout: "assets/retrato-recortado.png",
    photoCutout2: "assets/retrato-recortado-2.png", // segunda foto recortada (sección Sobre mí)
    logo: "",             // ej.: "assets/logo.svg" (si está vacío se usa el monograma IA)
    otherLinks: [],       // ej.: [{ label: "ORCID", href: "https://..." }]
    formEndpoint: "https://formsubmit.co/ajax/arteagaisabella33@gmail.com",     // ej.: "https://formspree.io/f/xxxxxxx" para envío real sin abrir el correo
    location: "Lorica, Córdoba, Colombia"
  },

  brand: {
    name: "Isabella Arteaga Arteaga",
    descriptor: "Ingeniera Sanitaria y Ambiental en formación",
    focus: "Modelación espacial y datos ambientales",
    tagline: "Del campo a la solución, con rigor y empatía."
  },

  nav: [
    ["inicio", "Inicio"], ["sobre-mi", "Sobre mí"], ["enfoque", "Enfoque"],
    ["valor", "Valor"], ["servicios", "Servicios"], ["normativa", "Normativa"],["proyectos", "Proyectos"],
    ["metodologia", "Metodología"], ["vision", "Visión"], ["contacto", "Contacto"]
  ],

  hero: {
    eyebrow: "Portafolio profesional · Lorica, Córdoba, Colombia",
    name: "Isabella Arteaga Arteaga",
    title: "Ingeniera Sanitaria y Ambiental en formación, con los pies en el territorio.",
    subtitle:
      "Estudio el último año de la carrera. Me muevo entre el campo, el laboratorio y los datos para entender los problemas del agua y del ambiente, y ayudar a resolverlos.",
    problems: ["En campo", "En laboratorio", "Con datos y SIG", "En diseño de infraestructura"],
    facts: ["9.º semestre", "Ponente de semillero (EISIM y EDESI 2026)", "Monitora de Hidrología", "Inglés: 12 niveles completados"],
    photos: [
      { src: "assets/planta-tratamiento.webp", alt: "Isabella con casco blanco en una visita a una planta de agua" },
      { src: "assets/laboratorio.webp", alt: "Isabella trabajando con un microscopio en el laboratorio" }
    ]
  },

  gallery: {
    title: "Trayectoria en imágenes",
    lead: "Trabajo con comunidades, salidas académicas de campo, laboratorio, infraestructura de agua e investigación: así se ve mi formación.",
    items: [
      { src: "assets/ptar-veolia-monteria.webp", caption: "Visita a planta de tratamiento de aguas residuales · Veolia, Montería", alt: "Isabella con casco naranja en la planta de tratamiento de aguas residuales de Montería" },
      { src: "assets/campo-comunidad-1.jpg", caption: "Trabajo en campo con la comunidad · Cotorra, Córdoba", alt: "Isabella conversando con una señora de la comunidad mientras una compañera toma notas" },
      { src: "assets/campo-comunidad-2.jpg", caption: "Levantamiento de información con la comunidad · Cotorra, Córdoba", alt: "Isabella tomando notas durante una conversación con un habitante en su tienda" },
      { src: "assets/salida-visita-tecnica.webp", caption: "Salida académica · visita técnica en Medellín", alt: "Grupo de estudiantes en una visita técnica con docentes" },
      { src: "assets/salida-geologia.webp", caption: "Salida de campo · perfil de suelo y roca, vía Planeta Rica", alt: "Isabella junto a un corte de terreno con estratos de suelo y roca" },
      { src: "assets/salida-manglar.webp", caption: "Salida de campo · manglar, Bahía de Cispatá", alt: "Isabella junto a un letrero de educación ambiental en una zona de manglar" },
      { src: "assets/topografia.webp", caption: "Topografía en campo", alt: "Isabella midiendo con una estación topográfica" },
      { src: "assets/laboratorio.webp", caption: "Práctica de laboratorio", alt: "Isabella en el laboratorio con un microscopio" },
      { src: "assets/planta-tratamiento.webp", caption: "Visita a planta de tratamiento de agua potable · Veolia, Sierra Chiquita, Montería", alt: "Isabella en una planta de tratamiento de agua" },
      { src: "assets/poster-semillero.webp", caption: "Socialización del semillero", alt: "Isabella presentando el póster del semillero" }
    ]
  },

  about: {
    title: "Sobre mí",
    lead: "Soy de Lorica, Córdoba, y estudio Ingeniería Sanitaria y Ambiental en la UPB Montería. Disfruto el trabajo de campo tanto como el análisis en oficina, y me gusta que lo técnico se entienda y sirva a las personas.",
    paragraphs: [
      "Mi formación mezcla terreno, laboratorio y análisis: topografía, prácticas de laboratorio, visitas a infraestructura de agua y modelación con herramientas como EPANET, AutoCAD, Civil 3D y ArcGIS.",
      "Soy ponente del semillero de investigación SITEM – SEMGAS con un proyecto de modelación espacial de condiciones ambientales del campus UPB Montería, basado en mediciones e interpolación de datos. Lo presenté en el encuentro interno EISIM 2026 y en el departamental EDESI 2026, y es la base de mi proyecto de grado.",
      "He realizado trabajo de campo con comunidades y varias salidas académicas de campo. Soy monitora de Hidrología. En mis proyectos de aula he trabajado el diseño de redes de agua potable, de tratamiento, de alcantarillado y de instalaciones hidrosanitarias, un estudio de impacto ambiental de un relleno sanitario y una consultoría ambiental para el diagnóstico territorial de dos barrios de Montería.",
      "Complemento lo técnico con diseño gráfico para comunicar mejor los resultados.",
      "Aspiro a ingresar al semillero internacional y a consolidar mi camino como analista geoespacial ambiental."
    ],
    values: [
      ["Disciplina", "Datos y procesos ordenados, con fuentes y supuestos documentados."],
      ["Responsabilidad", "Digo con claridad qué hice yo y cuál es el alcance real de cada trabajo."],
      ["Empatía", "Comunico para que me entienda quien recibe la información, sea técnico o no."]
    ]
  },

  timeline: {
    title: "Formación y trayectoria",
    lead: "Mi recorrido académico, en orden y con fechas.",
    educationTitle: "Educación",
    education: [
      { years: "2022 – actualidad", title: "Ingeniería Sanitaria y Ambiental (noveno semestre)", place: "Universidad Pontificia Bolivariana" }
    ],
    experienceTitle: "Experiencia académica",
    experience: [
      {
        year: "2026", title: "Proyecto de grado",
        text: "Modelación espacial de condiciones ambientales en el Campus UPB Montería mediante interpolación de datos."
      },
      {
        year: "2026", title: "Semillero de Investigación SITEM – SEMGAS",
        text: "Ponente del proyecto «Modelación espacial de condiciones ambientales en el Campus UPB Montería mediante interpolación de datos y medición de variables ambientales».",
        bullets: [
          "VIII Encuentro Interno de Semilleros de Investigación Multicampus – EISIM 2026, Universidad Pontificia Bolivariana (marzo de 2026)",
          "XXI Encuentro Departamental de Semilleros de Investigación – EDESI 2026 Córdoba, Colegio La Salle Montería (mayo de 2026)"
        ]
      },
      { year: "2026", title: "Monitora de Hidrología", text: "Universidad Pontificia Bolivariana" }
    ],
    interestsTitle: "Otros intereses",
    interests: [
      "Investigación e innovación en sostenibilidad ambiental",
      "Análisis espacial y modelación de variables ambientales",
      "Monitoreo de calidad del aire y recurso hídrico"
    ]
  },

  specialization: {
    title: "Enfoque profesional",
    intro: "Distingo lo que hago hoy, lo que puedo demostrar y hacia dónde me estoy formando.",
    levels: [
      {
        tag: "Enfoque actual",
        title: "Agua, ambiente y territorio",
        text: "Ingeniería sanitaria y ambiental con base en campo y laboratorio, y con el análisis espacial (SIG) como fortaleza."
      },
      {
        tag: "Competencias demostrables",
        title: "Con proyecto detrás",
        text: "Medición de variables en campo e interpolación espacial. Diseño de redes de agua potable, tratamiento, alcantarillado e instalaciones hidrosanitarias. Estudio de impacto ambiental de un relleno sanitario. Diagnóstico territorial. Topografía, laboratorio, CAD y Excel."
      },
      {
        tag: "Especialización futura",
        title: "Analista geoespacial ambiental",
        text: "Geoestadística, automatización de análisis y monitoreo con sensores. Camino a través del trabajo de grado y el semillero internacional."
      }
    ],
    fields: ["Calidad ambiental y microclima", "Agua potable", "Alcantarillado y saneamiento", "Residuos sólidos", "Diagnóstico territorial", "Hidrología"],
    tools: [
      ["ArcGIS", "SIG"], ["EPANET", "Redes de agua"], ["AutoCAD", "Dibujo"], ["Civil 3D", "Diseño"], ["Excel", "Datos"]
    ],
    toolsNote: ""
  },

  value: {
    title: "Propuesta de valor",
    lead: "Ayudo a entender los problemas del agua, el saneamiento y el ambiente de un territorio, para que sea más fácil priorizar qué hacer.",
    blocks: [
      ["A quién ayudo", "Equipos de investigación, consultoras, entidades locales, comunidades y organizaciones que necesitan entender su situación ambiental o de agua y saneamiento."],
      ["Qué problemas abordo", "Datos de campo sin organizar ni mapear, sistemas de agua y saneamiento por diseñar o entender, diagnósticos territoriales pendientes y reportes difíciles de leer."],
      ["Cómo trabajo", "Trabajo de campo con la comunidad, laboratorio, organización de datos, análisis espacial y comunicación visual, con cada paso documentado."],
      ["Qué me diferencia", "Combino ingeniería sanitaria y ambiental, trabajo de campo con comunidades, análisis espacial y diseño gráfico. Mis resultados se entienden y se pueden rastrear."]
    ],
    note: "No prometo cifras de ahorro. Trabajo desde la normativa aplicable y dejo claro el alcance de cada entrega. Cada afirmación de este sitio está respaldada por un proyecto."
  },

  /* ---------- Servicios ----------
     level 1 = con competencias actuales (una vez verificadas)
     level 2 = apoyo técnico o en colaboración con profesionales
     level 3 = futuro: requiere formación, experiencia o habilitación      */
  serviceLevels: {
    1: { label: "Disponible", desc: "Con mis competencias actuales." },
    2: { label: "En colaboración", desc: "Como apoyo técnico, con profesionales experimentados." },
    3: { label: "Próximamente", desc: "Tras formación, experiencia o requisitos legales." }
  },
  services: [
    {
      level: 1, name: "Mapas temáticos y cartografía ambiental",
      problem: "La información de campo está en tablas y no se ve dónde ocurre el problema.",
      audience: "Equipos de investigación, consultoras, entidades locales.",
      scope: "Organizar datos con coordenadas y representarlos en mapas legibles.",
      activities: ["Depuración de datos georreferenciados", "Elaboración de capas y mapas temáticos", "Diseño de la presentación visual"],
      deliverables: ["Mapas en PDF/imagen", "Archivos de proyecto SIG", "Ficha de metadatos y fuentes"],
      tools: ["ArcGIS", "Excel"],
      needs: ["Datos con coordenadas o ubicaciones", "Área de estudio", "Objetivo del mapa"],
      requirements: "Ninguno especial."
    },
    {
      level: 1, name: "Interpolación y visualización de variables ambientales",
      problem: "Se midió en algunos puntos, pero se necesita entender el comportamiento en toda un área.",
      audience: "Investigación, campus, proyectos ambientales locales.",
      scope: "Estimar superficies a partir de mediciones puntuales y comunicar su incertidumbre.",
      activities: ["Revisión y limpieza de mediciones", "Interpolación espacial", "Elaboración de mapas de superficie y descripción del método"],
      deliverables: ["Mapas de distribución espacial", "Documento breve de método y limitaciones"],
      tools: ["ArcGIS", "Excel"],
      needs: ["Mediciones con ubicación y fecha", "Descripción de cómo se midió"],
      requirements: "Base: mi trabajo en el semillero.. No sustituye mediciones con acreditación."
    },
    {
      level: 1, name: "Organización y análisis básico de datos ambientales",
      problem: "Datos dispersos, sin formato común, difíciles de analizar o reportar.",
      audience: "Investigación, consultoras, organizaciones.",
      scope: "Estructurar bases de datos y producir gráficos y resúmenes claros.",
      activities: ["Estandarización de tablas", "Controles de calidad básicos", "Gráficos y síntesis"],
      deliverables: ["Base de datos ordenada", "Gráficos e infografías", "Resumen descriptivo"],
      tools: ["Excel"],
      needs: ["Archivos originales", "Diccionario de variables si existe"],
      requirements: "Ninguno especial."
    },
    {
      level: 2, name: "Diseño y modelación de redes de agua potable",
      problem: "Se requiere entender presiones y caudales de una red o evaluar alternativas.",
      audience: "Prestadores pequeños, consultoras, entidades.",
      scope: "Apoyo en el modelo hidráulico bajo revisión de un profesional.",
      activities: ["Construcción del modelo", "Simulación de escenarios", "Dibujo de planos de apoyo en AutoCAD y Civil 3D", "Presentación de resultados"],
      deliverables: ["Modelo EPANET", "Planos de apoyo (editables y PDF)", "Resumen de resultados y supuestos"],
      tools: ["EPANET", "AutoCAD", "Civil 3D"],
      needs: ["Planos o catastro de la red", "Demandas y topografía", "Condiciones de operación"],
      requirements: "Revisión y firma de un profesional habilitado. No firmo diseños."
    },
    {
      level: 2, name: "Diagnóstico ambiental territorial y gestión de residuos",
      problem: "Un barrio, una entidad o un proyecto necesita entender su situación ambiental y de residuos para priorizar acciones.",
      audience: "Entidades locales, juntas comunitarias, consultoras y organizaciones.",
      scope: "Apoyo en diagnósticos territoriales y en componentes de residuos, a partir de mi consultoría de aula en dos barrios de Montería y de mis trabajos sobre relleno sanitario y residuos sólidos.",
      activities: ["Revisión de información secundaria", "Levantamiento de información en campo", "Análisis y mapas", "Apoyo en estudios de impacto y propuestas de mejora"],
      deliverables: ["Documento de diagnóstico", "Mapas e infografías", "Propuesta preliminar de alternativas"],
      tools: ["ArcGIS", "Excel", "AutoCAD"],
      needs: ["Zona de estudio y alcance", "Información disponible del sector", "Acceso para el trabajo de campo"],
      requirements: "Con supervisión de un profesional; mi experiencia es académica."
    },
    {
      level: 3, name: "Análisis geoespacial avanzado",
      problem: "Proyectos que requieren geoestadística, teledetección o análisis automatizado.",
      audience: "Investigación, consultoría especializada.",
      scope: "Análisis de mayor complejidad con automatización.",
      activities: ["Formación en geoestadística y Python", "Desarrollo de casos propios"],
      deliverables: ["Por definir cuando exista experiencia"],
      tools: ["Por definir"],
      needs: ["-"],
      requirements: "Formación adicional en curso mediante el trabajo de grado y el semillero."
    },
    {
      level: 3, name: "Monitoreo ambiental con sensores",
      problem: "Se requiere medir de forma continua variables ambientales a bajo costo.",
      audience: "Investigación, campus, organizaciones.",
      scope: "Diseño y operación de redes de sensores.",
      activities: ["Formación en electrónica y programación", "Prototipos propios"],
      deliverables: ["Por definir"],
      tools: ["Por definir"],
      needs: ["-"],
      requirements: "Hoy he usado y medido con sensores, pero no he construido prototipos."
    },
    {
      level: 3, name: "Diseño formal y estudios con validez regulatoria",
      problem: "Estudios, diseños y conceptos que exigen firma o acreditación.",
      audience: "Entidades y operadores.",
      scope: "Actividades reservadas a profesionales habilitados.",
      activities: ["Obtención de tarjeta profesional y experiencia"],
      deliverables: ["No aplica por ahora"],
      tools: ["-"],
      needs: ["-"],
      requirements: "Tarjeta profesional y experiencia exigida."
    }
  ],
  compliance: {
    title: "Cumplimiento normativo",
    lead: "Cada trabajo parte de la normativa colombiana aplicable. Es una condición de partida, no un trámite al final.",
    principles: [
      ["Norma primero", "Al iniciar identifico la norma que aplica al servicio y la dejo explícita en el alcance."],
      ["Trazabilidad", "Cada resultado indica la norma, los criterios y las fuentes usadas, para que pueda revisarse."],
      ["Firma y aprobación", "Los conceptos, diseños y estudios con efecto legal los revisa y firma un profesional habilitado. La aprobación final corresponde a la autoridad competente."]
    ],
    frameworkTitle: "Marco normativo de referencia",
    framework: [
      ["Agua potable y saneamiento", "Resolución 0330 de 2017: Reglamento Técnico del Sector de Agua Potable y Saneamiento Básico (RAS)"],
      ["Calidad del agua para consumo humano", "Resolución 2115 de 2007"],
      ["Calidad del aire", "Resolución 2254 de 2017: norma de calidad del aire ambiente"],
      ["Residuos sólidos", "Resolución 754 de 2014: metodología para formular los PGIRS"],
      ["Gestión y evaluación ambiental", "Decreto 1076 de 2015: Decreto Único Reglamentario del Sector Ambiente y Desarrollo Sostenible"],
      ["Protección de datos personales", "Ley 1581 de 2012"]
    ],
    note: ""
  },

  servicesLimits: [
    "No certifico estudios ni firmo documentos reservados a profesionales habilitados.",
    "La aprobación o el trámite ante la autoridad competente no depende de mí, por eso no la garantizo; sí me encargo de que el trabajo se plantee conforme a la norma aplicable.",
    "Mis mediciones de campo no reemplazan análisis con laboratorio o equipos acreditados."
  ],

  /* ---------- Proyectos ----------
     type: "Investigación" | "Ejercicio académico" | "Proyecto de aula" | "Creativo"
     areas: etiquetas para el filtro                                      */
  projectTypes: ["Todos", "Investigación", "Proyecto de aula", "Ejercicio académico"],
  projectAreas: ["SIG", "Agua", "Saneamiento", "Residuos", "Territorio"],
  projects: [
    {
      id: "semillero-campus",
      title: "Modelación espacial de condiciones ambientales en el campus UPB Montería",
      type: "Investigación", areas: ["SIG", "Territorio"],
      status: "Semillero SITEM – SEMGAS · Proyecto de grado · Ponente 2026",
      image: "assets/poster-semillero.webp", imageAlt: "Isabella presentando el póster del semillero",
      summary: "Medición de variables ambientales e interpolación de datos para entender cómo se distribuyen la calidad del aire y el clima dentro del campus. Presentado en EISIM y EDESI 2026.",
      context: "El campus necesita información espacial sobre calidad del aire y variables meteorológicas para apoyar la gestión ambiental. Las mediciones puntuales no muestran cómo se distribuyen. El proyecto integra sensores ambientales, tecnologías IoT y herramientas geoespaciales.",
      objective: "Caracterizar las condiciones ambientales y atmosféricas del campus UPB Montería mediante estaciones meteorológicas, sensores de calidad del aire y técnicas de interpolación geoespacial.",
      role: "Ponente del proyecto en el semillero SITEM – SEMGAS y base de mi proyecto de grado. Trabajo en equipo interdisciplinario (ingeniería electrónica e ingeniería sanitaria y ambiental). Participé en la medición de variables y en la modelación espacial. El prototipo IoT no fue desarrollado por mí.",
      method: "Seis etapas: preparación y adquisición de datos, diseño e implementación del monitoreo, recolección y validación de datos, análisis comparativo y validación de equipos, modelación espacial con mapas temáticos e integración y socialización de resultados.",
      tools: ["Monitor Airlink Davis", "Estación meteorológica Davis", "Sistemas de Información Geográfica"],
      results: "Presentado en el VIII Encuentro Interno de Semilleros de Investigación Multicampus (EISIM 2026, UPB, marzo de 2026) y en el XXI Encuentro Departamental de Semilleros (EDESI 2026, Córdoba, Colegio La Salle Montería, mayo de 2026). Avances del póster: ubicación de los puntos de monitoreo, mediciones del monitor y de la estación meteorológica, y rosa de los vientos.",
      learnings: "",
      value: "Muestra capacidad de pasar de mediciones puntuales a mapas que permiten interpretar un área completa, y de comunicar resultados en encuentros de investigación.",
      link: ""
    },
    {
      id: "consultoria-barrios",
      image: "assets/consultoria-barrios.jpg", imageAlt: "Isabella durante el trabajo de campo con habitantes de un barrio de Montería",
      title: "Consultoría ambiental: diagnóstico territorial de dos barrios de Montería",
      type: "Proyecto de aula", areas: ["Territorio", "Residuos"],
      status: "Trabajo de aula reciente · Consultoría ambiental",
      summary: "Diagnóstico territorial de dos barrios de Montería, desarrollado como ejercicio de consultoría ambiental.",
      context: "Los barrios enfrentan condiciones ambientales y territoriales que requieren un diagnóstico antes de proponer acciones.",
      objective: "Realizar el diagnóstico territorial de dos barrios de Montería como ejercicio de consultoría ambiental.",
      role: "",
      method: "",
      tools: [],
      results: "",
      learnings: "",
      value: "Demuestra capacidad para abordar un diagnóstico ambiental territorial con enfoque de consultoría.",
      link: ""
    },
    {
      id: "red-acueducto",
      image: "assets/proyecto-red-agua-potable.png", imageFit: "contain", imageAlt: "Esquema de la red de distribución de agua potable modelada en EPANET",
      title: "Diseño de redes de distribución de agua potable · Valencia, Córdoba",
      type: "Proyecto de aula", areas: ["Agua"],
      status: "Materia: Acueducto · 2026",
      summary: "Diseño y simulación hidráulica de la red de distribución de agua potable de un municipio de Córdoba.",
      context: "El diseño de redes exige verificar presiones y caudales antes de proponer una solución.",
      objective: "Diseñar y evaluar una red de distribución de agua potable mediante simulación hidráulica.",
      role: "",
      method: "Modelación de la red y simulación en EPANET.",
      tools: ["EPANET", "AutoCAD", "Civil 3D"],
      results: "",
      learnings: "",
      value: "Evidencia base para apoyar el modelado hidráulico de redes bajo supervisión profesional.",
      link: ""
    },
    {
      id: "tratamiento-agua",
      image: "assets/proyecto-filtros-tratamiento.png", imageFit: "contain", imageAlt: "Corte del diseño de los filtros del sistema de tratamiento de agua potable",
      title: "Diseño de un sistema de tratamiento de agua potable · Valencia, Córdoba",
      type: "Proyecto de aula", areas: ["Agua"],
      status: "Materia: Sistemas de Tratamiento de Agua Potable · 2025",
      summary: "Diseño de un sistema de tratamiento de agua potable para un municipio de Córdoba.",
      context: "El agua para consumo humano necesita un tratamiento diseñado según su calidad de origen y la demanda de la población.",
      objective: "Diseñar un sistema de tratamiento de agua potable como proyecto del curso.",
      role: "",
      method: "",
      tools: [],
      results: "",
      learnings: "",
      value: "Demuestra comprensión del proceso completo de potabilización, desde la fuente hasta la distribución.",
      link: ""
    },
    {
      id: "alcantarillado",
      image: "assets/proyecto-alcantarillado.webp", imageFit: "contain", imageAlt: "Plano en AutoCAD del trazado del sistema de alcantarillado",
      title: "Diseño del sistema de alcantarillado · Proyecto Costa Palma, Moñitos",
      type: "Proyecto de aula", areas: ["Saneamiento"],
      status: "Materia: Alcantarillado · 2026",
      summary: "Diseño del sistema de alcantarillado de un proyecto de vivienda en el municipio de Moñitos, Córdoba.",
      context: "Un desarrollo urbano necesita un sistema para recoger y evacuar de forma segura las aguas residuales y lluvias.",
      objective: "Diseñar el sistema de alcantarillado del proyecto como trabajo del curso.",
      role: "",
      method: "",
      tools: [],
      results: "",
      learnings: "",
      value: "Evidencia de capacidad para diseñar infraestructura de saneamiento.",
      link: ""
    },
    {
      id: "hidrosanitarias",
      image: "assets/proyecto-instalaciones.png", imageFit: "contain", imageAlt: "Corte de la edificación del proyecto de instalaciones hidrosanitarias",
      title: "Diseño de instalaciones hidrosanitarias · Proyecto Riberas del Sinú",
      type: "Proyecto de aula", areas: ["Saneamiento", "Agua"],
      status: "Materia: Instalaciones Hidrosanitarias · 2026",
      summary: "Diseño de instalaciones hidráulicas y sanitarias de una edificación.",
      context: "Las edificaciones requieren instalaciones de agua y desagüe diseñadas para su uso.",
      objective: "Diseñar las instalaciones hidrosanitarias del proyecto como trabajo del curso.",
      role: "",
      method: "",
      tools: [],
      results: "",
      learnings: "",
      value: "Complementa mi perfil con diseño de instalaciones dentro de edificaciones.",
      link: ""
    },
    {
      id: "hidrologia",
      image: "assets/proyecto-hidrologia.png", imageFit: "contain", imageAlt: "Delimitación de una cuenca y sus subcuencas en ArcGIS Pro",
      title: "Guía de modelación hidrológica: parámetros morfométricos de subcuencas",
      type: "Ejercicio académico", areas: ["SIG", "Agua"],
      status: "Ejercicio académico · 2025",
      summary: "Cálculo de parámetros morfométricos de subcuencas con ArcGIS Pro.",
      context: "Conocer la forma y el relieve de una cuenca es el primer paso para entender su respuesta hidrológica.",
      objective: "Calcular parámetros morfométricos de subcuencas aplicando herramientas SIG.",
      role: "",
      method: "Procesamiento del modelo digital del terreno y cálculo de parámetros en ArcGIS Pro.",
      tools: ["ArcGIS Pro"],
      results: "",
      learnings: "",
      value: "Une hidrología y SIG, y se conecta con mi rol como monitora de Hidrología.",
      link: ""
    },
    {
      id: "eia-relleno",
      image: "assets/proyecto-eia-matriz.png", imageFit: "contain", imageAlt: "Matriz de impacto ambiental del estudio de impacto ambiental del relleno sanitario",
      title: "Estudio de Impacto Ambiental de un relleno sanitario · Sahagún, Córdoba",
      type: "Proyecto de aula", areas: ["Residuos", "Territorio"],
      status: "Materia: Estudio de Impacto Ambiental · 2025",
      summary: "Estudio de impacto ambiental de la construcción y operación de un relleno sanitario.",
      context: "La disposición final de residuos genera impactos ambientales que deben identificarse y manejarse antes de construir y operar el sitio.",
      objective: "Evaluar los impactos ambientales de la construcción y operación de un relleno sanitario en el municipio de Sahagún.",
      role: "",
      method: "",
      tools: [],
      results: "",
      learnings: "",
      value: "Evidencia comprensión del ciclo ambiental de un proyecto de residuos sólidos.",
      link: ""
    },
    {
      id: "diseno-relleno",
      title: "Diseño de un relleno sanitario",
      type: "Proyecto de aula", areas: ["Residuos"],
      image: "assets/proyecto-pgirs-relleno.png", imageFit: "contain", imageAlt: "Planta del predio y corte típico de una trinchera del relleno sanitario",
      status: "Proyecto de aula",
      summary: "Diseño de un relleno sanitario por trincheras: planta de un predio de 2,25 ha con 25 trincheras y corte típico de una trinchera.",
      context: "",
      objective: "Diseñar un relleno sanitario como proyecto del curso.",
      role: "",
      method: "",
      tools: [],
      results: "",
      learnings: "",
      value: "Demuestra comprensión del diseño de infraestructura de disposición final de residuos sólidos.",
      link: ""
    },    {
      id: "residuos-pgirs",
      image: "assets/proyecto-pgirs-residuos.png", imageFit: "contain", imageAlt: "Tabla de proyección de la cantidad de residuos sólidos por año",
      title: "Gestión integral de residuos sólidos (PGIRS)",
      type: "Proyecto de aula", areas: ["Residuos"],
      status: "Trabajo académico",
      summary: "Análisis y formulación de alternativas para la gestión integral de residuos sólidos.",
      context: "",
      objective: "",
      role: "",
      method: "",
      tools: [],
      results: "",
      learnings: "",
      value: "Aporta conocimiento en planificación de la gestión de residuos sólidos.",
      link: ""
    }
  ],

  method: {
    title: "Metodología de trabajo",
    lead: "Un proceso en cuatro pasos, con cada decisión documentada.",
    steps: [
      ["01", "Campo", "Entender el territorio y tomar o recibir datos con ubicación, fecha y método de medición."],
      ["02", "Datos", "Limpiar, estandarizar y revisar la calidad antes de analizar."],
      ["03", "Análisis espacial", "Interpolar, modelar y verificar supuestos y limitaciones."],
      ["04", "Comunicación", "Entregar mapas y reportes que se entiendan, con fuentes y método visibles."]
    ],
    clientTitle: "Cómo sería trabajar conmigo",
    clientFlow: [
      ["1", "Diagnóstico", "Conversamos sobre la necesidad, los datos disponibles y el alcance."],
      ["2", "Propuesta", "Te presento actividades, entregables y tiempos por escrito."],
      ["3", "Ejecución", "Desarrollo el trabajo con avances compartidos y supuestos documentados."],
      ["4", "Entrega", "Recibes los productos, una explicación clara y espacio para ajustes."]
    ],
    modality: {
      title: "Modalidad de atención",
      items: [
        "Virtual: reuniones por videollamada y entrega de productos digitales.",
        "Presencial en Lorica, Montería y el departamento de Córdoba, para trabajo de campo y visitas.",
        "Asesoría puntual o acompañamiento por proyecto."
      ]
    },
    rates: {
      title: "Tarifas",
      text: "A convenir según el alcance, los entregables y el tiempo de cada proyecto. Se acuerdan por escrito antes de empezar.",
      note: ""
    }
  },

  vision: {
    title: "Mi visión profesional",
    mission: "Aportar desde la ingeniería sanitaria y ambiental soluciones rigurosas y comprensibles, del campo al análisis espacial, que ayuden a las comunidades y a las organizaciones a entender y priorizar sus problemas del agua y del ambiente.",
    horizons: [
      ["Corto plazo", "Terminar el trabajo de grado, graduarme y consolidar casos de estudio con evidencia."],
      ["Mediano plazo", "Participar en el semillero internacional y crecer como profesional en agua, saneamiento y análisis geoespacial ambiental."],
      ["Largo plazo", "Liderar proyectos de agua, saneamiento y gestión ambiental territorial, con trabajo cercano a las comunidades."]
    ]
  },

  contact: {
    title: "Contacto",
    lead: "Si tienes datos ambientales por ordenar, una red por modelar o una práctica en la que pueda aportar, escríbeme.",
    topics: ["Colaboración o proyecto", "Práctica o empleo", "Investigación / semillero", "Otro"],
    privacy: "Usaré tus datos solo para responderte, conforme a la Ley 1581 de 2012. No los comparto con terceros.",
    ethics: {
      title: "Compromiso ético y protección de datos",
      items: [
        "Confidencialidad: la información y los datos que compartas se usan solo para el trabajo acordado y no se entregan a terceros sin tu autorización.",
        "Manejo seguro: los archivos se guardan con acceso restringido y se eliminan o devuelven al terminar el proyecto, si lo solicitas.",
        "Datos personales: los datos de este formulario solo se usan para responderte, conforme a la Ley 1581 de 2012 de Colombia.",
        "Honestidad profesional: no certifico estudios ni firmo documentos reservados a profesionales habilitados, y no garantizo resultados regulatorios."
      ]
    }
  }
};
