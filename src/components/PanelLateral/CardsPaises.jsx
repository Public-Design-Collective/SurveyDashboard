import { IconoPais } from '../Iconos/Iconos';
import { COLOR_PAIS_UNICO, COLOR_MULTIPAIS } from '../../utils/constantes';
import TituloGrupo from './TituloGrupo';
import TarjetaMetrica from './TarjetaMetrica';

function CardsPaises({ metricas, datosPU, datosMP, compacta = false }) {
  return (
    <div className="grupo-metricas">
      <TituloGrupo icono={IconoPais}>Países</TituloGrupo>
      <div className="grupo-clasificadas">
        {datosPU && (
          <TarjetaMetrica
            compacta={compacta}
            tipo="Países"
            detalle={
              <>
                con proyectos de <strong>país único</strong>
              </>
            }
            valor={metricas.paisesConPaisUnico}
            color={COLOR_PAIS_UNICO}
          />
        )}
        {datosMP && (
          <TarjetaMetrica
            compacta={compacta}
            tipo="Países"
            detalle={
              <>
                con proyectos <strong>multi-país</strong>
              </>
            }
            valor={metricas.paisesConMultipais}
            color={COLOR_MULTIPAIS}
          />
        )}
      </div>
    </div>
  );
}

export default CardsPaises;
