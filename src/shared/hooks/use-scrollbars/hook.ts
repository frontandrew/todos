import { useEffect, useRef } from 'react';
import style from './style.module.css'

export const useScrollbars = () => {
  const scrollClassRef = useRef('')

  useEffect(() => {
    scrollClassRef.current = style.scrollable
  }, []);

  return { scrollable: scrollClassRef.current }
}
