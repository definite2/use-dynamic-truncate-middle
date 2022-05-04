import { useMemo } from 'react';
import { Target, getTargetElement } from '../getTargetElement';

// create canvas element, and get its content
const getContext = () => {
  const fragment = document.createDocumentFragment();
  const canvas = document.createElement('canvas');
  fragment.appendChild(canvas);
  return canvas.getContext('2d');
};

const useTextWidth = (target: Target) => {
  const context = getContext();
  return useMemo(() => {
    const el = getTargetElement(target);
    if (el?.textContent) {
      const computedStyles = window.getComputedStyle(el);
      if (context) {
        context.font = computedStyles.font
          ? computedStyles.font
          : `${computedStyles.fontSize}" "${computedStyles.fontFamily}`;
        return context.measureText(el.textContent).width; // width of text
      }
    }
    return undefined;
  }, [context]);
};

export default useTextWidth;
