import { useLayoutEffect, useState } from 'react';
import { Target, getTargetElement } from '../getTargetElement';
/**
 * Returns current width of specified element.
 *
 * @param {Ref} ref element to use in width calculation
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

  useLayoutEffect(() => {
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
