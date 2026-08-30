/**
 * Datos de la agencia. Todo lo que un no-desarrollador podría querer cambiar
 * vive acá y no incrustado en los componentes.
 */

export const site = {
  nombre: 'Unodosmil',
  claim: 'Entendemos el juego',
  descripcion:
    'Agencia de fotografía y video deportivo. Cubrimos rugby, fútbol, artes marciales y patín en Rosario y toda la región.',
  ciudad: 'Rosario, Argentina',
  url: 'https://unodosmil.com',
}

/**
 * Frases que rotan bajo la cinta de fotos del hero.
 *
 * Cada frase son dos líneas, y cada línea una lista de fragmentos. Guardarlas
 * partidas —en vez de como un string— es lo que permite destacar una palabra
 * sin adivinarla desde el CSS: `destacado` marca cuál va en mayúscula e
 * itálica, y el corte de línea queda decidido acá y no a merced del ancho.
 */
export const frasesHero = [
  {
    id: 'marca',
    lineas: [
      [{ texto: 'Llevamos tu ' }, { texto: 'MARCA', destacado: true }],
      [{ texto: 'a donde está la ' }, { texto: 'PASIÓN', destacado: true }],
    ],
  },
  {
    id: 'pasion',
    lineas: [
      [{ texto: 'Tu ' }, { texto: 'PASIÓN', destacado: true }, { texto: ' merece' }],
      [{ texto: 'ser vista por todos' }],
    ],
  },
]

/** Número de WhatsApp en formato E.164 sin signos, como lo exige wa.me. */
const WHATSAPP_NUMERO = '5493412555212'

export const contacto = {
  whatsappNumero: WHATSAPP_NUMERO,
  whatsappVisible: '+54 9 341 255 5212',
}

/**
 * Arma un link de WhatsApp con mensaje prellenado.
 *
 * El texto se codifica siempre: llega desde el llamador y termina en una URL
 * que abrimos en otra pestaña, así que nunca lo concatenamos crudo.
 */
export function whatsappUrl(mensaje = '¡Hola Unodosmil! Quiero cotizar una cobertura.') {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`
}
