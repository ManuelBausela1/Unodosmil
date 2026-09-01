import { AmbientBackground } from './components/AmbientBackground'
import Home from './pages/Home/Home'

/**
 * Raíz de la aplicación.
 *
 * El sitio es una sola página. No hay router: había uno para las páginas de
 * proyecto, que quedaron fuera del alcance. Si más adelante aparece una segunda
 * página, se vuelve a instalar `react-router-dom` y este archivo pasa a montar
 * las rutas.
 *
 * `AmbientBackground` va acá y no dentro de una sección: es el fondo de todo el
 * documento, y las secciones scrollean por encima con fondo transparente.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <AmbientBackground />
      <main id="contenido">
        <Home />
      </main>
    </>
  )
}
