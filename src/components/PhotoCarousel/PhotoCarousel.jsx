import './PhotoCarousel.css'

/**
 * Carrusel infinito de fotos.
 *
 * El bucle sin corte se logra con la lista **duplicada** y una animación que
 * desplaza la pista exactamente un 50%. Cuando la primera copia terminó de
 * pasar, la pista vuelve al origen — y como la segunda copia es idéntica, ese
 * salto cae sobre un cuadro visualmente igual y no se percibe. Es lo que evita
 * el hueco que aparecería al reiniciar una lista sola.
 *
 * La duración se calcula a partir de la cantidad de fotos y no es un número
 * fijo: así la velocidad de desplazamiento es la misma haya diez fotos o
 * treinta, en vez de acelerarse cada vez que se agrega una.
 *
 * Las fotos no son interactivas: se muestran lo bastante grandes como para
 * apreciarlas sin abrirlas. Por eso son `<img>` sueltas y no botones — un
 * control que no lleva a ninguna parte sólo ensucia el recorrido del teclado y
 * el de los lectores de pantalla.
 *
 * @param {object} props
 * @param {{src: string, alt: string}[]} props.fotos
 * @param {number} [props.segundosPorFoto=4.5] Cuánto tarda una foto en cruzar. Sube este número para ir más lento.
 * @param {string} [props.className]
 */
export function PhotoCarousel({ fotos, segundosPorFoto = 4.5, className = '' }) {
  const duracion = fotos.length * segundosPorFoto

  return (
    <div className={`carrusel ${className}`.trim()}>
      <ul className="carrusel__pista" data-motion="keep" style={{ '--duracion': `${duracion}s` }}>
        {/* Dos pasadas por la misma lista: la primera es la real, la segunda el
            relevo que tapa el reinicio. La copia va oculta para asistencia
            técnica, así nadie escucha las fotos dos veces. */}
        {[0, 1].map((copia) =>
          fotos.map((foto, i) => (
            <li
              key={`${copia}-${i}`}
              className="carrusel__item"
              aria-hidden={copia === 1 ? 'true' : undefined}
            >
              <img
                className="carrusel__imagen"
                src={foto.src}
                alt={copia === 0 ? foto.alt : ''}
                /**
                 * `eager`, no `lazy`: la pista mide varias pantallas de ancho y
                 * avanza sola, así que con carga diferida las fotos entran en
                 * cuadro antes de estar descargadas y se ven huecos.
                 * `fetchPriority` bajo evita que compitan con el video del
                 * hero, que es lo que sí se ve de entrada.
                 */
                loading="eager"
                fetchPriority="low"
                decoding="async"
                draggable={false}
              />
            </li>
          )),
        )}
      </ul>
    </div>
  )
}

export default PhotoCarousel
