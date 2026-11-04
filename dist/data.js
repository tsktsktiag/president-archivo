export const reviewedAt = '2026-10-25';

export const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'instituciones', label: 'Instituciones' },
  { id: 'educacion', label: 'Educación' },
  { id: 'economia', label: 'Economía' },
  { id: 'declaraciones', label: 'Declaraciones' },
  { id: 'gestion', label: 'Gestión' }
];

export const entries = [
  {
    id: 'rebajas-de-condenas',
    date: '2026-10-22',
    category: 'instituciones',
    status: 'Controversia',
    title: 'Rebajas de condenas, explicaciones pendientes.',
    summary: 'EL PAÍS informó sobre beneficios a condenados por delitos sexuales contra menores. La presidenta de la Corte Suprema atribuyó la dictación de los decretos al Ministerio de Justicia.',
    context: 'El Ejecutivo defendió que actuó conforme a la ley. La controversia incluye interpretaciones jurídicas distintas; este registro no establece la ilegalidad de los decretos.',
    why: 'La responsabilidad de una decisión pública debe poder examinarse.',
    sources: [{ name: 'EL PAÍS', date: '2026-10-22', url: 'https://elpais.com/chile/2026-10-22/la-presidenta-de-la-corte-suprema-por-la-rebaja-de-condenas-a-agresores-sexuales-de-menores-fue-el-ministro-de-justicia-quien-dicto-los-decretos.html' }]
  },
  {
    id: 'becas-tic-presupuesto',
    date: '2026-10-02',
    category: 'educacion',
    status: 'Propuesta en discusión',
    title: 'Los computadores quedaron fuera del proyecto.',
    summary: 'El proyecto de Presupuesto 2027 no contempló recursos para las Becas TIC de Junaeb, vinculadas a “Yo elijo mi PC”. La exclusión abrió un debate sobre el acceso escolar a la tecnología.',
    context: 'Se trata del proyecto presentado al Congreso, no del resultado definitivo de la tramitación presupuestaria. La fuente documenta la propuesta original; cualquier cambio posterior requiere una actualización.',
    why: 'El presupuesto también muestra qué prioridades quedan atrás.',
    sources: [
      { name: 'BBCL', date: '2026-10-05', url: 'https://www.biobiochile.cl/noticias/nacional/chile/2026/10/05/cuando-kast-propuso-entregar-computadores-a-todos-los-estudiantes-de-la-educacion-publica.shtml' }
    ]
  },
  {
    id: 'balance-economico-septiembre',
    date: '2026-09-14',
    category: 'economia',
    status: 'Balance público',
    title: 'La economía, por debajo de lo esperado.',
    summary: 'A seis meses de asumir, Kast reconoció una inflación mayor y un crecimiento menor a lo previsto, según una entrevista recogida por EL PAÍS.',
    context: 'El mandatario señaló la guerra y los temporales como factores del escenario. El reconocimiento registra una distancia con las expectativas; no demuestra que el Gobierno sea la única causa.',
    why: 'Las expectativas también se contrastan con los resultados.',
    sources: [{ name: 'EL PAÍS', date: '2026-09-14', url: 'https://elpais.com/chile/2026-09-14/kast-tras-seis-meses-de-gobierno-tenemos-una-situacion-inflacionaria-mas-alta-de-la-que-esperabamos-y-un-nivel-de-crecimiento-mas-bajo-del-proyectado.html' }]
  },
  {
    id: 'cuestionamientos-casen',
    date: '2026-08-11',
    category: 'declaraciones',
    status: 'Declaración cuestionada',
    title: 'Cuestionar la pobreza. Cuestionar los datos.',
    summary: 'Las dudas expresadas por Kast sobre los resultados de la encuesta CASEN provocaron respuestas técnicas de exministros, entre ellos Mario Marcel, según EL PAÍS.',
    context: 'Este caso registra una disputa pública sobre la interpretación de una medición. Las críticas corresponden a los actores citados y no constituyen por sí solas una resolución técnica del archivo.',
    why: 'Los datos públicos merecen argumentos que se puedan revisar.',
    sources: [{ name: 'EL PAÍS', date: '2026-08-11', url: 'https://elpais.com/chile/2026-08-11/las-criticas-de-kast-a-la-casen-indignan-a-los-exministros-de-boric-da-a-entender-que-la-pobreza-no-se-redujo-en-chile-y-que-el-pesimismo-se-justifica.html' }]
  },
  {
    id: 'rotacion-de-autoridades',
    date: '2026-07-28',
    category: 'gestion',
    status: 'Hecho reportado',
    title: 'Un gobierno que cambia de nombres.',
    summary: 'EL PAÍS reportó más de treinta salidas de autoridades entre ministerios, subsecretarías y cargos regionales durante los primeros meses del Gobierno.',
    context: 'El recuento reúne salidas por motivos distintos, incluidas renuncias y remociones. No implica que todas las personas mencionadas incurrieran en irregularidades.',
    why: 'La continuidad de los equipos es parte de la gestión.',
    sources: [{ name: 'EL PAÍS', date: '2026-07-28', url: 'https://elpais.com/chile/2026-07-28/la-alta-rotacion-de-autoridades-marca-los-primeros-cuatro-meses-del-gobierno-de-kast.html' }]
  },
  {
    id: 'estado-en-quiebra',
    date: '2026-03-25',
    category: 'declaraciones',
    status: 'Fiscalización reportada',
    title: '“Estado en quiebra”. Un post y muchas preguntas.',
    summary: 'Una publicación oficial afirmó que el Estado estaba “en quiebra”. El Gobierno la eliminó y Contraloría solicitó antecedentes sobre sus fundamentos y el uso de recursos públicos.',
    context: 'BBCL documentó el requerimiento de marzo e informó el 29 de abril que Contraloría ordenó abrir un sumario por irregularidades en la publicación. La apertura del procedimiento no equivale a una sanción individual definitiva.',
    why: 'La comunicación oficial también debe rendir cuentas.',
    sources: [
      { name: 'BBCL', date: '2026-03-25', url: 'https://www.biobiochile.cl/especial/bbcl-investiga/noticias/de-pasillo/2026/03/25/estado-en-quiebra-contraloria-pide-explicaciones-a-sedini-por-polemico-posteo-que-enredo-a-quiroz.shtml' },
      { name: 'BBCL', date: '2026-04-29', url: 'https://www.biobiochile.cl/noticias/nacional/chile/2026/04/29/estado-en-quiebra-contraloria-advierte-imprecisiones-y-ordena-sumario-en-segegob-que-lidera-sedini.shtml' }
    ]
  }
];
