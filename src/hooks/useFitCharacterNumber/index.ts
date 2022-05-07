import { useMemo } from 'react';
import { Target, getTargetElement } from '../../utils/getTargetElement';
/**
 * Calculates the maximum number of characters that can be fit into give maxwidth.
 * Calculates the width of text with given font family via ref object, in terms of px
 *
 * @return number of chars of ref's text, including number of chars of given/default
 * returned value is an odd number, first part has +1 characters
 */
export interface Options {
  target: Target;
  maxWidth: number;
  middleChars?: string;
}
// create canvas element, and get its content
const getContext = () => {
  const fragment = document.createDocumentFragment();
  const canvas = document.createElement('canvas');
  fragment.appendChild(canvas);
  return canvas.getContext('2d');
};

const useFitCharacterNumber = ({ target, maxWidth, middleChars }: Options) => {
  return useMemo(() => {
    const el = getTargetElement(target);
    if (!el) return { charNumber: undefined };
    if (el.textContent && maxWidth) {
      const context = getContext();
      const computedStyles = window.getComputedStyle(el);
      if (context) {
        context.font = computedStyles.font
          ? computedStyles.font
          : `${computedStyles.fontSize}" "${computedStyles.fontFamily}`;
        let fitLength: number = el.textContent.length;
        let prefix = ''; // char from start
        let suffix = ''; // char from end
        let i = 0;
        let j = fitLength - 1;
        let current = middleChars || '...'; // i.e. '...'
        let prev = current;
        while (i < j) {
          prefix = prefix + el.textContent.charAt(i);
          current = prefix + middleChars + suffix;
          if (context.measureText(current).width > maxWidth) {
            fitLength = prev.length;
            break;
          }
          prev = current;
          suffix = el.textContent.charAt(j) + suffix;
          current = prefix + middleChars + suffix;
          if (context.measureText(current).width > maxWidth) {
            fitLength = prev.length;
            break;
          }
          prev = current;
          i++;
          j--;
        }
        return { charNumber: fitLength };
      }
    }
    return { charNumber: undefined };
  }, [maxWidth, middleChars]);
};

export default useFitCharacterNumber;
