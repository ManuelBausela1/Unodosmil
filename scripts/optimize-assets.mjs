/**
 * Pipeline de optimización de assets.
 *
 * Toma el material original de `../contenido` (fotos de 5-9 MB cada una) y
 * genera las versiones web que consume el bundle:
 *
 *   src/assets/images/hero/  cards verticales 4:5 del corredor del hero
 *   src/assets/logos/        logotipos
 *   public/                  favicons
 *
 * Es un paso manual (`npm run assets`), no parte del build: el material fuente
 * cambia muy de vez en cuando y no queremos 800 MB atravesando cada deploy.
 */
import { mkdir, readdir, copyFile } from 'node:fs/promises'
import { dirname, join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, '..', 'contenido')

const OUT = {
  hero: join(root, 'src/assets/images/hero'),
  logos: join(root, 'src/assets/logos'),
}

/**
 * Cards del hero: 4:5. Cerca de la salida una card ocupa ~750 CSS px de alto,
 * así que 800×1000 la deja nítida sin que el compositor tenga que cargar una
 * textura enorme por cada una de las ~22 cards en pantalla.
 */
const HERO = { width: 800, height: 1000, quality: 82 }

async function main() {
  await Promise.all(Object.values(OUT).map((dir) => mkdir(dir, { recursive: true })))

  const fotos = (await readdir(join(source, 'FOTOS'))).filter((f) => /\.(jpe?g|png)$/i.test(f))

  for (const file of fotos) {
    const input = join(source, 'FOTOS', file)
    const slug = parse(file).name.toLowerCase()

    await sharp(input)
      .rotate()
      .resize(HERO.width, HERO.height, { fit: 'cover', position: 'attention' })
      .webp({ quality: HERO.quality })
      .toFile(join(OUT.hero, `${slug}.webp`))

    console.log(`✓ ${file}`)
  }

  // Sólo el blanco: es el único que se usa, siempre sobre el azul noche.
  await copyFile(join(source, 'LOGO', 'UNO-DOS-MIL-PNG.png'), join(OUT.logos, 'unodosmil-blanco.png'))
  console.log('✓ logo')

  await buildIcons()
}

/**
 * Íconos: el logotipo blanco centrado sobre el azul noche, en cuadrado.
 *
 * El wordmark es apaisado (750×138), así que se escala al ancho y se compone
 * sobre un lienzo cuadrado en vez de deformarlo. En la pestaña, a 32 px, la
 * palabra queda muy chica para leerse — funciona como mancha reconocible, no
 * como texto. Por eso se generan varios tamaños: el navegador elige el más
 * grande que le sirva (favoritos, PWA, pantalla de inicio) y ahí sí se lee.
 */
const ICONOS = [
  { size: 32, file: 'favicon-32.png', pad: 0.06 },
  { size: 192, file: 'favicon-192.png', pad: 0.08 },
  { size: 512, file: 'favicon-512.png', pad: 0.08 },
  { size: 180, file: 'apple-touch-icon.png', pad: 0.12 },
]

async function buildIcons() {
  for (const { size, file, pad } of ICONOS) {
    const margen = Math.round(size * pad)
    const wordmark = await sharp(join(source, 'LOGO', 'UNO-DOS-MIL-PNG.png'))
      .resize({ width: size - margen * 2 })
      .png()
      .toBuffer()

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 1, g: 25, b: 49, alpha: 1 },
      },
    })
      .composite([{ input: wordmark, gravity: 'center' }])
      .png()
      .toFile(join(root, 'public', file))
  }

  console.log('✓ íconos')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
