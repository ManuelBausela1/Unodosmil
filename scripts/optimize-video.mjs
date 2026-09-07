/**
 * Compresión del video de fondo del hero.
 *
 * Va aparte de `optimize-assets.mjs` y se corre a mano (`npm run assets:video`)
 * porque tarda minutos: no tiene sentido pagarlo cada vez que se retoca una foto.
 *
 * El original son 150 MB a 20 Mbps con audio. Como fondo de hero eso es
 * inviable, y además tres de esas propiedades no se usan:
 *
 * - El audio se descarta entero (`-an`). El video va silenciado sí o sí: los
 *   navegadores sólo permiten autoplay sin sonido.
 * - Se baja a 1600×900. El video vive detrás de una capa que lo oscurece y de
 *   texto encima; la resolución completa no se percibe y multiplica el peso.
 * - CRF 28 con techo de bitrate: el techo evita que los planos con mucho
 *   movimiento disparen el peso, que es donde x264 se desboca.
 *
 * `+faststart` mueve el índice al principio del archivo, así el navegador
 * empieza a reproducir mientras descarga en vez de esperar el archivo completo.
 */
import { execFileSync } from 'node:child_process'
import { mkdir, rm, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, '..', 'contenido')

const ENTRADA = join(source, 'VIDEOS', 'HORIZONTAL', 'web mix.mp4')
const SALIDA = join(root, 'public', 'media')

/**
 * Segundo del que se saca el póster. Se elige del arranque a propósito: el
 * póster es lo que se ve mientras el video carga, así que si coincide con su
 * primer cuadro el paso a la reproducción no se nota. También es lo único que
 * reciben quienes pidieron reducir el movimiento, y este cuadro —un corredor
 * en plena zancada— dice de qué se trata la agencia mejor que un plano fijo.
 */
const SEGUNDO_POSTER = 0.4

const mb = (bytes) => (bytes / 1048576).toFixed(1) + ' MB'

async function main() {
  await mkdir(SALIDA, { recursive: true })

  const original = await stat(ENTRADA)
  console.log(`origen: ${mb(original.size)}`)

  console.log('comprimiendo… (tarda unos minutos)')
  execFileSync(
    ffmpeg,
    [
      '-y',
      '-i', ENTRADA,
      '-an',
      '-vf', 'scale=1600:-2',
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', '28',
      '-maxrate', '2M',
      '-bufsize', '4M',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      join(SALIDA, 'hero.mp4'),
    ],
    { stdio: ['ignore', 'ignore', 'ignore'] },
  )

  const comprimido = await stat(join(SALIDA, 'hero.mp4'))
  const ahorro = (100 - (comprimido.size / original.size) * 100).toFixed(1)
  console.log(`✓ hero.mp4  ${mb(comprimido.size)}  (${ahorro}% menos)`)

  // Póster: lo que se ve mientras el video carga, y lo único que ven quienes
  // pidieron reducir el movimiento.
  execFileSync(
    ffmpeg,
    ['-y', '-ss', String(SEGUNDO_POSTER), '-i', ENTRADA, '-frames:v', '1', join(SALIDA, 'hero-poster.png')],
    { stdio: ['ignore', 'ignore', 'ignore'] },
  )

  const poster = await sharp(join(SALIDA, 'hero-poster.png'))
    .resize(1600)
    .webp({ quality: 76 })
    .toFile(join(SALIDA, 'hero-poster.webp'))
  // El PNG es sólo el intermedio que escupe ffmpeg; pesa 3 MB y no se publica.
  await rm(join(SALIDA, 'hero-poster.png'))
  console.log(`✓ hero-poster.webp  ${mb(poster.size)}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
