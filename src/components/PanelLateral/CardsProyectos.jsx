import { IconoProyecto } from '../Iconos/Iconos';
import { COLOR_PAIS_UNICO, COLOR_MULTIPAIS } from '../../utils/constantes';
import TituloGrupo from './TituloGrupo';
import TarjetaMetrica from './TarjetaMetrica';

function CardsProyectos({ metricas, datosPU, datosMP, compacta = false }) {
  return (
    <div className="grupo-metricas">
      <TituloGrupo icono={IconoProyecto}>Proyectos</TituloGrupo>
      <div className="grupo-clasificadas">
        {datosPU && (
          <TarjetaMetrica
            compacta={compacta}
            tipo="Proyectos"
            detalle={
              <>
                de <strong>país único</strong>
              </>
            }
            valor={metricas.proyectosPaisUnico}
            total={metricas.totalProyectos}
            color={COLOR_PAIS_UNICO}
          />
        )}
        {datosMP && (
          <TarjetaMetrica
            compacta={compacta}
            tipo="Proyectos"
            detalle={
              <>
                <strong>multi-país</strong>
              </>
            }
            valor={metricas.proyectosMultipais}
            total={metricas.totalProyectos}
            color={COLOR_MULTIPAIS}
          />
        )}
      </div>
    </div>
  );
}

export default CardsProyectos;
