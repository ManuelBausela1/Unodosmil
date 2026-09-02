import { WhatsappButton } from '../../../../components/WhatsappButton'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { site } from '../../../../data/site'
import logoUnodosmil from '../../../../assets/logos/unodosmil-blanco.png'
import './Hero.css'

/**
 * Sección de apertura: el video a pantalla completa y, a los tres segundos, la
 * marca por encima.
 *
 * El video es decorativo —no aporta información que el texto no dé— así que va
 * `aria-hidden`. Es mudo, en bucle y sin controles: no hay nada que un lector
 * de pantalla o el teclado necesiten alcanzar ahí.
 *
 * Quien pidió reducir el movimiento no recibe el video: se queda con el póster
 * estático, que es un fotograma del mismo material.
 */
export function Hero() {
  const sinMovimiento = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <section className="hero">
      <div className="hero__media" aria-hidden="true">
        {sinMovimiento ? (
          <img className="hero__video" src="/media/hero-poster.webp" alt="" />
        ) : (
          <video
            className="hero__video"
            src="/media/hero.mp4"
            poster="/media/hero-poster.webp"
            autoPlay
            /* `muted` no es opcional: ningún navegador deja arrancar solo un
               video con sonido. Sin esto el autoplay se bloquea y queda el
               póster congelado. */
            muted
            loop
            /* Sin `playsInline`, iOS abre el video a pantalla completa en vez
               de reproducirlo dentro de la página. */
            playsInline
            preload="auto"
            tabIndex={-1}
          />
        )}
      </div>

      {/* Capa de contraste: lo mínimo para que el logotipo blanco y la frase se
          lean sobre cualquier fotograma, sin apagar el video. */}
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content">
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
         * Cada palabra va envuelta en su propia máscara: el contenedor recorta
         * y el span de adentro sube desde abajo. El claim no aparece, se asoma
         * por debajo del logotipo.
         */}
        <p className="hero__claim">
          {site.claim.split(' ').map((palabra, i) => (
            <span key={palabra} className="hero__claim-word" style={{ '--i': i }}>
              <span className="hero__claim-word-inner">{palabra}</span>
            </span>
          ))}
        </p>

        <WhatsappButton
          className="hero__cta"
          variant="primario"
          mensaje="¡Hola Unodosmil! Vi la web y quiero consultar por una cobertura."
        >
          Contactame
        </WhatsappButton>
      </div>
    </section>
  )
}

export default Hero
