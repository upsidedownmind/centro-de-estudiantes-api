const schemas = {
  Calendario: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      fecha: { type: 'string', example: '2026-01-01' },
      titulo: { type: 'string', example: 'Feriado: Año Nuevo' },
      tipo: { type: 'string', example: 'feriado' },
      color: { type: 'string', example: '#E67E5B' }
    }
  },
  CalendarioInput: {
    type: 'object',
    required: ['fecha', 'titulo', 'tipo', 'color'],
    properties: {
      fecha: { type: 'string', example: '2026-06-20' },
      titulo: { type: 'string', example: 'Feriado: Día de la Bandera' },
      tipo: { type: 'string', example: 'feriado' },
      color: { type: 'string', example: '#E67E5B' }
    }
  },

  Carrera: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      codigo: { type: 'string', example: 'TSP' },
      nombre: { type: 'string', example: 'Tecnicatura Superior en Programación' }
    }
  },
  CarreraInput: {
    type: 'object',
    required: ['codigo', 'nombre'],
    properties: {
      codigo: { type: 'string', example: 'TSD' },
      nombre: { type: 'string', example: 'Tecnicatura Superior en Diseño' }
    }
  },

  Evento: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      titulo: { type: 'string', example: 'Workshop de Python para Data Science' },
      descripcion: { type: 'string', example: 'Taller intensivo de 3 jornadas' },
      fecha_inicio: { type: 'string', example: '2026-05-05T18:00:00' },
      fecha_fin: { type: 'string', example: '2026-05-07T21:00:00' },
      cupo: { type: 'integer', example: 40 },
      inscriptos: { type: 'integer', example: 38 },
      autor_id: { type: 'integer', example: 2 },
      autor: { type: 'string', example: 'Secretaría Académica' },
      estado: { type: 'string', example: 'abierto' },
      categoria: { type: 'string', example: 'taller' },
      lugar: { type: 'string', example: 'Laboratorio 3' },
      color: { type: 'string', example: '#3A5BA9' },
      imagen: { type: 'string', example: '' }
    }
  },
  EventoInput: {
    type: 'object',
    required: ['titulo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'cupo', 'autor_id', 'autor', 'estado', 'categoria', 'lugar', 'color'],
    properties: {
      titulo: { type: 'string', example: 'Charla de Ciberseguridad' },
      descripcion: { type: 'string', example: 'Charla abierta sobre buenas prácticas en seguridad informática.' },
      fecha_inicio: { type: 'string', example: '2026-06-15T18:00:00' },
      fecha_fin: { type: 'string', example: '2026-06-15T20:00:00' },
      cupo: { type: 'integer', example: 60 },
      inscriptos: { type: 'integer', example: 0 },
      autor_id: { type: 'integer', example: 2 },
      autor: { type: 'string', example: 'Secretaría Académica' },
      estado: { type: 'string', example: 'abierto' },
      categoria: { type: 'string', example: 'charla' },
      lugar: { type: 'string', example: 'Aula Magna' },
      color: { type: 'string', example: '#3A5BA9' },
      imagen: { type: 'string', example: '' }
    }
  },

  Notificacion: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      titulo: { type: 'string', example: 'Nueva mesa de examen disponible' },
      mensaje: { type: 'string', example: 'Se habilitó la inscripción a mesas de julio.' },
      usuario_id: { type: 'integer', example: 1 },
      leida: { type: 'boolean', example: false },
      fecha: { type: 'string', example: '2026-05-13T10:00:00' }
    }
  },
  NotificacionInput: {
    type: 'object',
    required: ['titulo', 'mensaje', 'usuario_id', 'leida', 'fecha'],
    properties: {
      titulo: { type: 'string', example: 'Nueva mesa de examen disponible' },
      mensaje: { type: 'string', example: 'Se habilitó la inscripción a mesas de julio.' },
      usuario_id: { type: 'integer', example: 1 },
      leida: { type: 'boolean', example: false },
      fecha: { type: 'string', example: '2026-05-13T10:00:00' }
    }
  },

  Novedad: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      titulo: { type: 'string', example: 'Apertura de inscripciones a mesas de exámenes de Julio' },
      contenido: { type: 'string', example: 'Ya se encuentra disponible el sistema de inscripción...' },
      categoria_id: { type: 'integer', example: 1 },
      categoria: { type: 'string', example: 'Académico' },
      autor_id: { type: 'integer', example: 2 },
      autor: { type: 'string', example: 'Secretaría Académica' },
      materia_id: { type: 'integer', nullable: true, example: null },
      carrera_id: { type: 'integer', nullable: true, example: null },
      destacada: { type: 'boolean', example: true },
      fecha: { type: 'string', example: '2026-05-01' },
      adjunto: { type: 'string', example: '' },
      icono: { type: 'string', example: '' }
    }
  },
  NovedadInput: {
    type: 'object',
    required: ['titulo', 'contenido', 'categoria_id', 'categoria', 'autor_id', 'autor', 'fecha'],
    properties: {
      titulo: { type: 'string', example: 'Cambio de horario en Laboratorio 2' },
      contenido: { type: 'string', example: 'Se informa que el Laboratorio 2 cambia su horario de apertura.' },
      categoria_id: { type: 'integer', example: 1 },
      categoria: { type: 'string', example: 'Académico' },
      autor_id: { type: 'integer', example: 2 },
      autor: { type: 'string', example: 'Secretaría Académica' },
      materia_id: { type: 'integer', nullable: true, example: null },
      carrera_id: { type: 'integer', nullable: true, example: 1 },
      destacada: { type: 'boolean', example: false },
      fecha: { type: 'string', example: '2026-05-13' },
      adjunto: { type: 'string', example: '' },
      icono: { type: 'string', example: '' }
    }
  },

  Perfil: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      nombre: { type: 'string', example: 'estudiante' },
      descripcion: { type: 'string', example: 'Alumno regular del instituto' }
    }
  },
  PerfilInput: {
    type: 'object',
    required: ['nombre', 'descripcion'],
    properties: {
      nombre: { type: 'string', example: 'preceptor' },
      descripcion: { type: 'string', example: 'Preceptor del instituto' }
    }
  },

  Reglamentacion: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      tipo: { type: 'string', example: 'resolucion' },
      titulo: { type: 'string', example: 'Resolución 2022-43193672' },
      descripcion: { type: 'string', example: 'Resolución que establece el diseño curricular...' },
      archivo: { type: 'string', example: 'Resolucion-2022-43193672.pdf' },
      link: { type: 'string', example: '' },
      categoria: { type: 'string', example: 'academica' },
      palabras_clave: { type: 'array', items: { type: 'string' }, example: ['profesorado', 'biología'] },
      fecha_publicacion: { type: 'string', example: '2022-06-15' },
      version: { type: 'string', example: '1.0' }
    }
  },
  ReglamentacionInput: {
    type: 'object',
    required: ['tipo', 'titulo', 'descripcion', 'categoria', 'fecha_publicacion', 'version'],
    properties: {
      tipo: { type: 'string', example: 'disposicion' },
      titulo: { type: 'string', example: 'Disposición sobre régimen de correlatividades' },
      descripcion: { type: 'string', example: 'Establece las correlatividades de las carreras.' },
      archivo: { type: 'string', example: 'correlatividades.pdf' },
      link: { type: 'string', example: '' },
      categoria: { type: 'string', example: 'academica' },
      palabras_clave: { type: 'array', items: { type: 'string' }, example: ['correlatividades', 'materias'] },
      fecha_publicacion: { type: 'string', example: '2026-01-10' },
      version: { type: 'string', example: '1.0' }
    }
  },

  Usuario: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      dni: { type: 'string', example: '40123456' },
      nombre: { type: 'string', example: 'Santiago Chiale' },
      usuario: { type: 'string', example: 'santiago' },
      email: { type: 'string', example: 'santiago.chiale@alumno.isfdyt57.edu.ar' },
      perfil_id: { type: 'integer', example: 1 },
      carrera_id: { type: 'integer', nullable: true, example: 1 },
      activo: { type: 'boolean', example: true },
      created_at: { type: 'string', example: '2026-01-15T10:00:00' }
    }
  },
  UsuarioInput: {
    type: 'object',
    required: ['dni', 'nombre', 'usuario', 'email', 'perfil_id', 'activo'],
    properties: {
      dni: { type: 'string', example: '35111222' },
      nombre: { type: 'string', example: 'Juan Pérez' },
      usuario: { type: 'string', example: 'jperez' },
      email: { type: 'string', example: 'juan.perez@alumno.isfdyt57.edu.ar' },
      perfil_id: { type: 'integer', example: 1 },
      carrera_id: { type: 'integer', nullable: true, example: 1 },
      activo: { type: 'boolean', example: true }
    }
  }
};

module.exports = schemas;
