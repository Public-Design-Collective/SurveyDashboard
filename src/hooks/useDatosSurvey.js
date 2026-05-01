import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { URL_CSV, URL_CSV_PARTICIPANTES } from '../utils/constantes';

function descargarCsv(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete(resultados) {
        resolve(resultados.data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

export function useDatosSurvey() {
  const [datos, setDatos] = useState([]);
  const [datosParticipantes, setDatosParticipantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tareas = [
      descargarCsv(URL_CSV),
      URL_CSV_PARTICIPANTES ? descargarCsv(URL_CSV_PARTICIPANTES) : Promise.resolve([]),
    ];

    Promise.all(tareas)
      .then(([proyectos, participantes]) => {
        setDatos(proyectos);
        setDatosParticipantes(participantes);
        setCargando(false);
      })
      .catch((err) => {
        setError(err);
        setCargando(false);
      });
  }, []);

  return { datos, datosParticipantes, cargando, error };
}
