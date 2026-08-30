import { useCallback, useSyncExternalStore } from 'react'

/**
 * Suscribe un componente a una media query.
 *
 * Usa `useSyncExternalStore` en vez de `useEffect` + `useState` porque la
 * consulta ya vive fuera de React: así no hay un primer render con el valor
 * equivocado que después parpadea, y en SSR devuelve `false` sin romper.
 *
 * @param {string} query Por ejemplo `'(max-width: 640px)'`.
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  // Memoizado: una `subscribe` nueva en cada render haría que React se
  // desuscriba y vuelva a suscribirse en cada uno.
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export default useMediaQuery
