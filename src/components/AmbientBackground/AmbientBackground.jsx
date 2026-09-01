import './AmbientBackground.css'

/**
 * Fondo de la página entera: la malla de ondas en el petróleo de marca.
 *
 * Va una sola vez, al nivel de la aplicación, y queda fija al viewport. Las
 * secciones scrollean por encima con fondo transparente, así la atmósfera no se
 * corta nunca en el límite entre una y otra: no hay costura posible porque no
 * hay dos fondos que empalmar.
 *
 * Es decorativo puro, así que va `aria-hidden` y sin eventos de puntero.
 */
export function AmbientBackground() {
  return <div className="ambient" aria-hidden="true" />
}

export default AmbientBackground
