import Home from './pages/Home/Home'

/**
 * Raíz de la aplicación.
 *
 * El sitio es una sola página. No hay router: había uno para las páginas de
 * proyecto, que quedaron fuera del alcance. Si más adelante aparece una segunda
 * página, se vuelve a instalar `react-router-dom` y este archivo pasa a montar
 * las rutas.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <main id="contenido">
        <Home />
      </main>
    </>
  )
}
