import { useCallback, useEffect } from 'react'

export const useHotKey = (key: string, handler?: () => void) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === key && handler) handler()
  }, [handler, key])

  useEffect(() => {
    if (handler) document.addEventListener('keyup', handleKeyDown)
    return () => {
      if (handler) document.removeEventListener('keyup', handleKeyDown)
    }
  }, [handler])
}
