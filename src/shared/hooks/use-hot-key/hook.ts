import { useEffect } from 'react';

export const useHotKey = (handler: () => void, key: string) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key && handler instanceof Function) handler()
    };

    document.addEventListener('keyup', handleKeyDown);

    return () => document.removeEventListener('keyup', handleKeyDown);
  }, [handler, key]);
}
