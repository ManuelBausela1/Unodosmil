import { PhotoCarousel } from '../../../../components/PhotoCarousel'
import { PhraseRotator } from '../../../../components/PhraseRotator'
import { fotos } from '../../../../data/fotos'
import { frasesHero } from '../../../../data/site'
import './Galeria.css'

/**
 * Sección posterior al hero: la promesa de la agencia y su trabajo pasando.
 *
 * No pinta fondo propio — lo pone `AmbientBackground` a nivel de la aplicación,
 * y por eso se lee como continuación del hero y no como un bloque aparte.
 */
export function Galeria() {
  return (
    <section id="galeria" className="galeria" aria-labelledby="galeria-titulo">
      <h2 id="galeria-titulo" className="sr-only">
        Nuestro trabajo
      </h2>

      <PhraseRotator className="galeria__frases" frases={frasesHero} intervalo={4000} />

      <PhotoCarousel fotos={fotos} segundosPorFoto={4.5} />
    </section>
  )
}

export default Galeria
