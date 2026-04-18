import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { URL_CSV } from '../utils/constantes';

export function useDatosSurvey() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse(URL_CSV, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete(resultados) {
        setDatos(resultados.data);
        setCargando(false);
      },
      error(err) {
        setError(err);
        setCargando(false);
      },
    });
  }, []);

  return { datos, cargando, error };
}
