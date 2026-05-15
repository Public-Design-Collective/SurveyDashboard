import { IconoInstitucion } from '../Iconos/Iconos';
import { COLOR_PAIS_UNICO, COLOR_MULTIPAIS } from '../../utils/constantes';
import TituloGrupo from './TituloGrupo';
import TarjetaMetrica from './TarjetaMetrica';

function CardsInstituciones({ metricas, datosPU, datosMP, compacta = false }) {
  return (
    <div className="grupo-metricas">
      <TituloGrupo icono={IconoInstitucion}>Instituciones</TituloGrupo>
      <div className="grupo-clasificadas">
        {datosPU && (
          <TarjetaMetrica
            compacta={compacta}
            tipo="Instituciones"
            detalle={
              <>
                de <strong>país único</strong>
              </>
            }
            valor={metricas.institucionesPaisUnico}
            total={metricas.totalInstituciones}
            color={COLOR_PAIS_UNICO}
          />
        )}
        {datosMP && (
          <TarjetaMetrica
            compacta={compacta}
            tipo="Instituciones"
            detalle={
              <>
                <strong>multi-país</strong>
              </>
            }
            valor={metricas.institucionesMultipais}
            total={metricas.totalInstituciones}
            color={COLOR_MULTIPAIS}
          />
        )}
      </div>
    </div>
  );
}

export default CardsInstituciones;
