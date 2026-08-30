import { useId, useMemo } from 'react'
import './ImageStreamHero.css'

/* ── el corredor ─────────────────────────────────────────────────
 * Dos rieles de cards viajan desde el fondo de la escena hacia el
 * espectador. La perspectiva sola hace el trabajo que parece de dos
 * animaciones: a medida que crece la z de una card, se agranda *y*
 * su x en pantalla se abre desde el punto de fuga, porque la
 * proyección escala posición y tamaño por el mismo factor.
 *
 * Tres decisiones le dan forma, y cada una corrige un artefacto
 * concreto:
 *
 * 1. La profundidad se define como *tamaño aparente*, en progresión
 *    geométrica: cada card es una proporción constante más grande que
 *    la de atrás, todo el recorrido. Repartir un rango de z de forma
 *    pareja hace que las cards cercanas se despeguen entre sí cuando
 *    la proyección las agranda.
 * 2. Los rieles abren fuerte en el primer tramo y después sostienen
 *    (`fan` > 1). Esa apertura cancela el crecimiento —todavía lento—
 *    del fondo, así la cinta sale del centro como una banda plana,
 *    dobla una vez, y recién ahí se va en diagonal. Rieles paralelos
 *    proyectan un cono recto, sin quiebre.
 * 3. Ninguna punta del ciclo se ve en pantalla. Una card muere con su
 *    borde interno pasado los 50cqw, fuera del contenedor. Y nace
 *    *cruzada*: `railBirth` es negativo, así que la card más nueva
 *    arranca del lado opuesto y barre de vuelta por el centro. Eso
 *    tapa la garganta: el eje queda cubierto en todo momento y una
 *    card recién nacida aparece detrás de otras que ya la ocultan,
 *    por lo que no necesita fundido de entrada. Naciendo de su propio
 *    lado, en cambio, queda un agujero en el centro exacto que se
 *    abre una vez por ciclo.
 *
 * Todas las longitudes van en `cqw` —porcentaje del ancho del
 * contenedor— así el corredor mantiene sus proporciones en cualquier
 * tamaño de pantalla.
 * ─────────────────────────────────────────────────────────────── */

/**
 * @typedef {object} CorridorPath Geometría del corredor, toda en `cqw`.
 * @property {number} [perspective] Fuerza de la proyección. Más bajo = gran angular, más dramático.
 * @property {number} [cardWidth] Ancho de card en unidades de mundo.
 * @property {number} [cardHeight] Alto de card en unidades de mundo.
 * @property {number} [cardRadius] Radio de esquina de cada card.
 * @property {number} [birthHeight] Alto en pantalla en la cintura, donde nace la card.
 * @property {number} [exitHeight] Alto en pantalla cuando la card sale de cuadro.
 * @property {number} [railBirth] Desplazamiento lateral al nacer. Negativo cruza el eje (ver nota 3).
 * @property {number} [railExit] Desplazamiento lateral una vez abiertos los rieles.
 * @property {number} [fan] Cuán adelantada está la apertura. >1 abre temprano y sostiene.
 * @property {number} [turnBirth] Rotación en Y al nacer, en grados.
 * @property {number} [turnExit] Rotación en Y a la salida, en grados.
 * @property {number} [stops] Keyframes usados para trazar la curva.
 */

/** @type {Required<CorridorPath>} */
const PATH = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
}

/** Muestrea el recorrido una vez para que los keyframes tracen la curva real. */
function keyframes(dir, name, p) {
  const steps = []
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops
    // Geométrico en tamaño aparente: cards consecutivas mantienen una razón
    // de tamaño constante y la cinta queda sólida en las dos puntas.
    const scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u)
    const z = p.perspective * (1 - 1 / scale)
    const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan)
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(
        2,
      )}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    )
  }
  return `@keyframes ${name}{${steps.join('')}}`
}

/**
 * Corredor de imágenes en perspectiva con contenido superpuesto.
 *
 * @param {object} props
 * @param {{src: string, alt?: string}[]} props.images Imágenes que recorren los rieles. Ambos
 *   rieles siguen la misma secuencia, así el corredor se lee como un flujo espejado.
 * @param {number} [props.cards=9] Cards simultáneas por riel. Más cards densifican el corredor,
 *   no lo aceleran. Bajarlo mucho hace que cards consecutivas crezcan demasiado rápido para
 *   seguir superpuestas cerca de la salida, y se abre un tajo en la cinta.
 * @param {number} [props.speed=18] Segundos que tarda una card en recorrer todo el corredor.
 * @param {number} [props.axis=55] Altura del eje del corredor, en porcentaje del alto.
 * @param {CorridorPath} [props.path] Overrides de geometría, mezclados sobre los valores por defecto.
 * @param {React.ReactNode} [props.children] Contenido renderizado por encima del corredor.
 * @param {string} [props.className]
 */
export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className = '',
  style,
  ...props
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const right = `ish-r-${id}`
  const left = `ish-l-${id}`

  const p = useMemo(() => ({ ...PATH, ...path }), [path])

  const css = useMemo(() => `${keyframes(1, right, p)}${keyframes(-1, left, p)}`, [right, left, p])

  return (
    <div
      className={`image-stream-hero ${className}`.trim()}
      {...props}
      style={{ containerType: 'inline-size', ...style }}
    >
      {/* Sólo geometría generada: nombres de keyframe derivados de useId y
          números formateados con toFixed. Nada acá viene de input de usuario. */}
      <style>{css}</style>

      <div
        aria-hidden="true"
        className="image-stream-hero__stage"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div className="image-stream-hero__world">
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              // Los dos rieles recorren la misma secuencia, así el lado
              // izquierdo espeja al derecho a cada profundidad.
              const img = images[i % Math.max(images.length, 1)]
              return (
                <div
                  key={`${name}-${i}`}
                  className="image-stream-hero__card"
                  data-motion="keep"
                  style={{
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animationName: name,
                    animationDuration: `${speed}s`,
                    // El delay negativo suelta cada card a mitad de vuelo, así
                    // el corredor ya está lleno en el primer frame.
                    animationDelay: `${-(i * speed) / cards}s`,
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt=""
                      // Todas las cards están dentro del viewport desde el
                      // primer frame, así que `lazy` no ahorra nada: sólo hace
                      // que el corredor aparezca vacío y se vaya llenando.
                      // Las primeras van con prioridad alta porque son las
                      // grandes, las que se ven de entrada.
                      loading="eager"
                      fetchPriority={i < 4 ? 'high' : 'auto'}
                      decoding="async"
                      draggable={false}
                    />
                  ) : null}
                </div>
              )
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  )
}

export default ImageStreamHero
