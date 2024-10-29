import { useLayoutEffect, useRef } from 'react';
import style from './style.module.css'

export const useScrollbars = () => {
  const scrollClassRef = useRef('')

  useLayoutEffect(() => {
    scrollClassRef.current = style.scrollable
  }, []);

  return { scrollable: scrollClassRef.current }
}
