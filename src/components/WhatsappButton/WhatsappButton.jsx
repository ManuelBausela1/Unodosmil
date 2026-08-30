import { whatsappUrl } from '../../data/site'
import './WhatsappButton.css'

/**
 * Call to action principal del sitio: abre WhatsApp con un mensaje ya escrito.
 *
 * `rel="noopener noreferrer"` no es decorativo: sin `noopener`, la pestaña que
 * abrimos recibe un `window.opener` con el que puede redirigir la nuestra a
 * cualquier lado (tabnabbing).
 *
 * @param {object} props
 * @param {string} [props.mensaje] Texto prellenado del chat.
 * @param {'primario'|'solid'|'ghost'} [props.variant] `primario` es el CTA
 *   grande en petróleo que vira al verde de WhatsApp al pasar el mouse.
 * @param {React.ReactNode} props.children
 */
export function WhatsappButton({
  mensaje,
  variant = 'solid',
  className = '',
  children,
  ...props
}) {
  return (
    <a
      className={`wa-button wa-button--${variant} ${className}`.trim()}
      href={whatsappUrl(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <span className="wa-button__glifo">
        <svg className="wa-button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.31-8.24Zm-3.4 4.4c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.19 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41h-.46Z"
          />
        </svg>
      </span>

      <span className="wa-button__label">{children}</span>
    </a>
  )
}

export default WhatsappButton
