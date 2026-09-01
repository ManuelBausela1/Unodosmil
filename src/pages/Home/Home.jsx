import { Hero } from './sections/Hero/Hero'

/**
 * Landing. Cada sección vive en `sections/` con su propia hoja de estilos.
 *
 * Ninguna sección pinta su propio fondo: el de toda la página lo pone
 * `AmbientBackground`, montado en `App.jsx`. Es lo que hace que el sitio se lea
 * como una pieza continua en vez de bloques apilados.
 *
 * Próximas: Quiénes somos y el CTA final.
 */
export function Home() {
  return (
    <>
      <Hero />
    </>
  )
}

export default Home
