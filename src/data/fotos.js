/**
 * Catálogo de fotos del hero.
 *
 * Cada entrada es un recorte 4:5 liviano generado por `npm run assets` desde el
 * material original de `../contenido`.
 *
 * El `alt` describe la escena real — es lo que lee un lector de pantalla y lo
 * que Google usa para indexar la foto, así que nombra deporte, acción y
 * contexto en vez de repetir la marca.
 */

import rugbyBandera from '../assets/images/hero/a7401728.webp'
import rugbyPelota from '../assets/images/hero/a7404637.webp'
import rugbyRetrato from '../assets/images/hero/a7404690.webp'
import rugbyMaul from '../assets/images/hero/a7404717.webp'
import aikido from '../assets/images/hero/a7407132.webp'
import futbolLluvia from '../assets/images/hero/a7408725.webp'
import futbolVerde from '../assets/images/hero/a7409217.webp'
import futbolCarrera from '../assets/images/hero/a7409218.webp'
import futbolCabezazo from '../assets/images/hero/a7409224.webp'
import futbolContraluz from '../assets/images/hero/a7409247.webp'
import patin from '../assets/images/hero/a7409813.webp'

export const fotosHero = [
  {
    src: rugbyBandera,
    alt: 'Hincha con la cara pintada de azul agita la bandera del club desde la tribuna durante un partido de rugby',
  },
  {
    src: futbolCabezazo,
    alt: 'Delantero de camiseta amarilla corre a buscar la pelota en el aire antes de cabecearla',
  },
  {
    src: rugbyMaul,
    alt: 'Choque cuerpo a cuerpo en un maul de rugby con los jugadores embarrados y trabados en el contacto',
  },
  {
    src: patin,
    alt: 'Patinadora artística sostiene una figura de equilibrio agachada sobre un patín en el estadio cubierto',
  },
  {
    src: futbolContraluz,
    alt: 'Jugador de fútbol encara a contraluz y domina la pelota con el sol filtrándose entre los árboles',
  },
  {
    src: rugbyRetrato,
    alt: 'Retrato en blanco y negro de un jugador de rugby transpirado en el huddle al final del partido',
  },
  {
    src: aikido,
    alt: 'Practicantes de aikido saludan de rodillas sobre el tatami al comenzar la práctica',
  },
  {
    src: futbolCarrera,
    alt: 'Mediocampista en plena carrera hacia el área con el arquero rival esperando al fondo',
  },
  {
    src: rugbyPelota,
    alt: 'Jugador de rugby hace girar la pelota Gilbert sobre la punta del dedo antes de entrenar',
  },
  {
    src: futbolLluvia,
    alt: 'Futbolista conduce la pelota bajo la lluvia con las gotas suspendidas alrededor del cuerpo',
  },
  {
    src: futbolVerde,
    alt: 'Jugador de camiseta a rayas verdes se perfila para pegarle a la pelota en una cancha de parque',
  },
]

export default fotosHero
