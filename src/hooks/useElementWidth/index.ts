import { useState } from 'react';
import useIsomorphicLayoutEffect from '../../utils/useIsomorphicLayoutEffect';
import { Target, getTargetElement } from '../../utils/getTargetElement';
/**
 * Returns current width of specified element.
 *
 */

const useElementWidth = (target: Target) => {
  const [width, setWidth] = useState(0);

  const elObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        setWidth(entry.contentRect.width);
      }
    }
  });

  useIsomorphicLayoutEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }
    elObserver.observe(el);
    return () => {
      elObserver.disconnect();
    };
  }, []);
  return width;
};

export default useElementWidth;
