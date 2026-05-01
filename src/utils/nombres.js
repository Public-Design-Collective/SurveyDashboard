const NOMBRES_POR_PAIS = {
  Argentina: {
    masculino: ['Juan', 'Diego', 'Martín', 'Lucas', 'Mateo', 'Santiago', 'Tomás'],
    femenino: ['María', 'Sofía', 'Valentina', 'Camila', 'Lucía', 'Martina', 'Florencia'],
  },
  Bolivia: {
    masculino: ['Carlos', 'Luis', 'José', 'Marco', 'Daniel', 'Fernando'],
    femenino: ['María', 'Ana', 'Carolina', 'Lucía', 'Patricia', 'Gabriela'],
  },
  Brasil: {
    masculino: ['João', 'Pedro', 'Lucas', 'Gabriel', 'Mateus', 'Rafael', 'Tiago'],
    femenino: ['Maria', 'Ana', 'Beatriz', 'Júlia', 'Laura', 'Mariana', 'Camila'],
  },
  Chile: {
    masculino: ['José', 'Cristián', 'Felipe', 'Sebastián', 'Matías', 'Vicente'],
    femenino: ['María', 'Camila', 'Catalina', 'Francisca', 'Constanza', 'Javiera'],
  },
  Colombia: {
    masculino: ['Juan', 'Carlos', 'Andrés', 'Daniel', 'Luis', 'Santiago', 'Felipe'],
    femenino: ['María', 'Camila', 'Daniela', 'Valentina', 'Andrea', 'Sara', 'Laura'],
  },
  'Costa Rica': {
    masculino: ['José', 'Juan', 'Luis', 'Carlos', 'Daniel', 'Esteban'],
    femenino: ['María', 'Ana', 'Daniela', 'Sofía', 'Valeria', 'Adriana'],
  },
  Cuba: {
    masculino: ['José', 'Juan', 'Luis', 'Carlos', 'Yandel', 'Yoel', 'Reinier'],
    femenino: ['María', 'Yamilé', 'Yunaisi', 'Beatriz', 'Dayana', 'Liannet'],
  },
  Ecuador: {
    masculino: ['Juan', 'Luis', 'Carlos', 'José', 'Andrés', 'Bryan'],
    femenino: ['María', 'Ana', 'Carla', 'Andrea', 'Sofía', 'Doménica'],
  },
  'El Salvador': {
    masculino: ['Juan', 'José', 'Carlos', 'Luis', 'Manuel', 'Roberto'],
    femenino: ['María', 'Ana', 'Sofía', 'Carla', 'Daniela', 'Karla'],
  },
  Guatemala: {
    masculino: ['Juan', 'Luis', 'José', 'Carlos', 'Pedro', 'Marvin'],
    femenino: ['María', 'Ana', 'Carla', 'Daniela', 'Sofía', 'Gabriela'],
  },
  Haití: {
    masculino: ['Jean', 'Pierre', 'Marc', 'Louis', 'Jacques', 'Wilner'],
    femenino: ['Marie', 'Anne', 'Claire', 'Marlene', 'Yolande', 'Nadège'],
  },
  Honduras: {
    masculino: ['Juan', 'Carlos', 'José', 'Luis', 'Manuel', 'Marvin'],
    femenino: ['María', 'Ana', 'Sofía', 'Daniela', 'Karla', 'Wendy'],
  },
  Jamaica: {
    masculino: ['Andre', 'Marcus', 'Devon', 'Damian', 'Kareem', 'Kemar'],
    femenino: ['Tanya', 'Latoya', 'Shanice', 'Renee', 'Kerry', 'Tashana'],
  },
  México: {
    masculino: ['José', 'Juan', 'Luis', 'Carlos', 'Miguel', 'Diego', 'Santiago'],
    femenino: ['María', 'Guadalupe', 'Sofía', 'Valentina', 'Camila', 'Ximena', 'Daniela'],
  },
  Nicaragua: {
    masculino: ['Juan', 'Carlos', 'José', 'Luis', 'Pedro', 'Marvin'],
    femenino: ['María', 'Ana', 'Karla', 'Daniela', 'Sofía', 'Yader'],
  },
  Panamá: {
    masculino: ['Juan', 'José', 'Luis', 'Carlos', 'Manuel', 'Roberto'],
    femenino: ['María', 'Ana', 'Daniela', 'Sofía', 'Carolina', 'Yarisel'],
  },
  Paraguay: {
    masculino: ['Juan', 'Carlos', 'José', 'Luis', 'Marcelo', 'Derlis'],
    femenino: ['María', 'Ana', 'Sofía', 'Carolina', 'Cinthia', 'Larissa'],
  },
  Perú: {
    masculino: ['Juan', 'José', 'Luis', 'Carlos', 'Diego', 'Sebastián', 'Renato'],
    femenino: ['María', 'Ana', 'Carla', 'Sofía', 'Camila', 'Valentina', 'Fátima'],
  },
  'Puerto Rico': {
    masculino: ['Carlos', 'Juan', 'José', 'Luis', 'Pedro', 'Héctor', 'Jorge'],
    femenino: ['María', 'Sofía', 'Yasmín', 'Lourdes', 'Karla', 'Glorimar'],
  },
  'República Dominicana': {
    masculino: ['Juan', 'José', 'Luis', 'Carlos', 'Pedro', 'Yandel', 'Wilkin'],
    femenino: ['María', 'Ana', 'Yasmín', 'Carla', 'Daniela', 'Yokasta'],
  },
  'Trinidad y Tobago': {
    masculino: ['Anand', 'Kevin', 'David', 'Marcus', 'Ryan', 'Kishore'],
    femenino: ['Anya', 'Priya', 'Lisa', 'Crystal', 'Nia', 'Aaliyah'],
  },
  Uruguay: {
    masculino: ['Juan', 'Diego', 'Mateo', 'Tomás', 'Santiago', 'Bruno'],
    femenino: ['María', 'Sofía', 'Valentina', 'Lucía', 'Camila', 'Delfina'],
  },
  Venezuela: {
    masculino: ['Juan', 'Carlos', 'José', 'Luis', 'Daniel', 'Andrés', 'Manuel'],
    femenino: ['María', 'Ana', 'Daniela', 'Sofía', 'Valentina', 'Génesis'],
  },
};

const NOMBRES_NEUTROS = ['Alex', 'Ari', 'Cris', 'Sam', 'Andrea', 'Camil', 'Sasha', 'Trini', 'Robin'];

const NOMBRES_FALLBACK = {
  masculino: ['Juan', 'Carlos', 'José', 'Luis'],
  femenino: ['María', 'Ana', 'Sofía', 'Camila'],
};

function clasificarGenero(valor) {
  const v = (valor || '').toLowerCase().trim();
  if (['hombre', 'masculino', 'male', 'm', 'h'].includes(v)) return 'masculino';
  if (['mujer', 'femenino', 'female', 'f'].includes(v)) return 'femenino';
  return 'neutro';
}

export function escogerNombre({ genero, paisNacimiento }) {
  const tipo = clasificarGenero(genero);
  const lista =
    tipo === 'neutro'
      ? NOMBRES_NEUTROS
      : NOMBRES_POR_PAIS[paisNacimiento]?.[tipo] ?? NOMBRES_FALLBACK[tipo];
  return lista[Math.floor(Math.random() * lista.length)];
}
