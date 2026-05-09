import { IconoParticipante } from '../Iconos/Iconos';
import { COLOR_NEUTRAL } from '../../utils/constantes';
import TituloGrupo from './TituloGrupo';
import TarjetaMetrica from './TarjetaMetrica';

function CardsParticipantes({ metricas, ambito, compacta = false }) {
  return (
    <div className="grupo-metricas">
      <TituloGrupo icono={IconoParticipante}>Participantes</TituloGrupo>
      <div className="grupo-participantes">
        <TarjetaMetrica
          compacta={compacta}
          tipo="Participantes que"
          detalle={
            <>
              <strong>reportaron proyectos</strong>
              <br />
              en {ambito}
            </>
          }
          valor={metricas.participantesQueReportaronProyectos}
          color={COLOR_NEUTRAL}
        />
        <TarjetaMetrica
          compacta={compacta}
          tipo="Participantes que"
          detalle={
            <>
              <strong>nacieron</strong>
              <br />
              en {ambito}
            </>
          }
          valor={metricas.participantesQueNacieron}
          color={COLOR_NEUTRAL}
        />
        <TarjetaMetrica
          compacta={compacta}
          tipo="Participantes que"
          detalle={
            <>
              <strong>residen</strong>
              <br />
              en {ambito}
            </>
          }
          valor={metricas.participantesQueResiden}
          color={COLOR_NEUTRAL}
        />
      </div>
    </div>
  );
}

export default CardsParticipantes;
