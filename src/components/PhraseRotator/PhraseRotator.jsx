import { useEffect, useState } from 'react'
import './PhraseRotator.css'

/**
 * Rota un conjunto de frases con un fundido cruzado.
 *
 * Las frases están todas en el DOM siempre; sólo cambia cuál se ve. Eso
 * resuelve dos cosas de una: el bloque no cambia de alto al rotar (todas
 * ocupan la misma celda del grid, que se dimensiona por la más alta), y un
 * buscador ve las dos frases en el HTML en vez de una sola.
 *
 * No lleva `aria-live`: es contenido decorativo que se repite en bucle, y
 * anunciarlo cada cinco segundos interrumpiría la lectura sin aportar nada.
 * Las inactivas van con `aria-hidden` para que un lector de pantalla recorra
 * la que está a la vista.
 *
 * @param {object} props
 * @param {import('../../data/site').frasesHero} props.frases
 * @param {number} [props.intervalo=5000] Milisegundos que dura cada frase.
 * @param {string} [props.className]
 */
export function PhraseRotator({ frases, intervalo = 5000, className = '' }) {
  const [activa, setActiva] = useState(0)

  useEffect(() => {
    if (frases.length < 2) return undefined

    const id = setInterval(() => {
      setActiva((i) => (i + 1) % frases.length)
    }, intervalo)

    return () => clearInterval(id)
  }, [frases.length, intervalo])

  return (
    <div className={`phrase-rotator ${className}`.trim()}>
      {frases.map((frase, i) => (
        <p
          key={frase.id}
          className="phrase-rotator__frase"
          data-activa={i === activa}
          aria-hidden={i !== activa}
        >
          {frase.lineas.map((linea, l) => (
            // Las líneas de una frase no se reordenan ni se filtran: el índice
            // es una clave estable acá.
            // eslint-disable-next-line react/no-array-index-key
            <span key={l} className="phrase-rotator__linea">
              {linea.map((fragmento, f) =>
                fragmento.destacado ? (
                  // eslint-disable-next-line react/no-array-index-key
                  <em key={f} className="phrase-rotator__destacado">
                    {fragmento.texto}
                  </em>
                ) : (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={f}>{fragmento.texto}</span>
                ),
              )}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}

export default PhraseRotator
