import { useCallback, useEffect } from 'react'
import { UseHotKey } from './type.ts'

export const useHotKey: UseHotKey = ({ key, handler, canUse }) => {

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === key && handler) handler()
  }, [handler, key])

  useEffect(() => {
    if (canUse) document.addEventListener('keyup', handleKeyDown)
    return () => {
      if (canUse) document.removeEventListener('keyup', handleKeyDown)
    }
  }, [canUse])
}
