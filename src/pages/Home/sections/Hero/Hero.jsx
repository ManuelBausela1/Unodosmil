import { ImageStreamHero } from '../../../../components/ImageStreamHero'
import { PhraseRotator } from '../../../../components/PhraseRotator'
import { WhatsappButton } from '../../../../components/WhatsappButton'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { fotosHero } from '../../../../data/fotos'
import { frasesHero, site } from '../../../../data/site'
import logoUnodosmil from '../../../../assets/logos/unodosmil-blanco.png'
import './Hero.css'

/**
 * La geometría del corredor se mide en `cqw` (ancho del contenedor), así que
 * en un teléfono —contenedor angosto y muy alto— los mismos números producen
 * una cinta diminuta perdida en el medio de la pantalla. El preset de móvil
 * agranda las cards y abre menos los rieles: la misma escena, reencuadrada
 * para vertical.
 */
const PATH_DESKTOP = { cardRadius: 0.5, exitHeight: 52 }
const PATH_MOBILE = {
  cardRadius: 1.2,
  cardWidth: 34,
  cardHeight: 46,
  birthHeight: 5,
  exitHeight: 158,
  railBirth: -20,
  railExit: 74,
  // Los rieles de móvil llegan mucho más lejos que los de desktop (74 contra
  // 44cqw). Con el `fan` por defecto esa distancia se recorre casi toda en el
  // primer tramo, y las cards se despegan del eje cuando todavía son chiquitas:
  // queda un agujero en la garganta. Un `fan` más bajo reparte la apertura.
  fan: 2,
}

/**
 * La cinta se mantiene sólida mientras cards consecutivas se superpongan, y la
 * razón de tamaño entre una y la siguiente es `(exitHeight/birthHeight) ^
 * (1/cards)`. El recorrido de móvil es mucho más largo en tamaño aparente, así
 * que necesita más cards para repartirlo: con las nueve del desktop cada card
 * crecería casi un 50% respecto de la anterior y se abriría un tajo en el medio.
 */
const CARDS_DESKTOP = 9
const CARDS_MOBILE = 16

/**
 * Sección de apertura: el corredor de fotos con la marca encima.
 *
 * El corredor es decorativo (`aria-hidden` dentro del componente): repite las
 * mismas fotos muchas veces en dos rieles, así que describirlas ahí sería ruido
 * para un lector de pantalla y contenido duplicado para un buscador. Los `alt`
 * reales de cada foto viven en `data/fotos.js`.
 */
export function Hero() {
  const esMovil = useMediaQuery('(max-width: 640px)')

  return (
    <ImageStreamHero
      className="hero"
      images={fotosHero}
      cards={esMovil ? CARDS_MOBILE : CARDS_DESKTOP}
      speed={esMovil ? 26 : 22}
      axis={esMovil ? 46 : 52}
      path={esMovil ? PATH_MOBILE : PATH_DESKTOP}
    >
      {/* Viñeta: oscurece los bordes y el centro para que la marca tenga
          contraste suficiente sobre cualquier foto que pase por detrás. */}
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__marca">
          <h1 className="hero__title">
            <img
              className="hero__logo"
              src={logoUnodosmil}
              alt={`${site.nombre} — fotografía y video deportivo en ${site.ciudad}`}
              width="750"
              height="138"
              fetchPriority="high"
            />
          </h1>

          {/**
           * Cada palabra va envuelta en su propia máscara: el contenedor
           * recorta y el span de adentro sube desde abajo. El claim no
           * aparece, se asoma por debajo del logotipo.
           */}
          <p className="hero__claim">
            {site.claim.split(' ').map((palabra, i) => (
              <span key={palabra} className="hero__claim-word" style={{ '--i': i }}>
                <span className="hero__claim-word-inner">{palabra}</span>
              </span>
            ))}
          </p>
        </div>

        <div className="hero__footer">
          <PhraseRotator className="hero__frases" frases={frasesHero} intervalo={5000} />

          <WhatsappButton
            className="hero__cta"
            variant="primario"
            mensaje="¡Hola Unodosmil! Vi la web y quiero consultar por una cobertura."
          >
            Contactame
          </WhatsappButton>
        </div>
      </div>
    </ImageStreamHero>
  )
}

export default Hero
