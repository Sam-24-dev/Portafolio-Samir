import { useEffect, useState } from 'react';

const COMPACT_WIDTH_QUERY = '(max-width: 767px)';
const COARSE_POINTER_QUERY = '(pointer: coarse)';

const readCompactViewport = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(COMPACT_WIDTH_QUERY).matches || window.matchMedia(COARSE_POINTER_QUERY).matches;
};

const bindMediaListener = (query: MediaQueryList, listener: () => void) => {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
};

const useCompactViewport = () => {
  const [isCompactViewport, setIsCompactViewport] = useState(readCompactViewport);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const widthQuery = window.matchMedia(COMPACT_WIDTH_QUERY);
    const pointerQuery = window.matchMedia(COARSE_POINTER_QUERY);
    const updateViewport = () => {
      setIsCompactViewport(widthQuery.matches || pointerQuery.matches);
    };

    updateViewport();

    const unbindWidth = bindMediaListener(widthQuery, updateViewport);
    const unbindPointer = bindMediaListener(pointerQuery, updateViewport);

    return () => {
      unbindWidth();
      unbindPointer();
    };
  }, []);

  return isCompactViewport;
};

export default useCompactViewport;
