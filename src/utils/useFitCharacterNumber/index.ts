import { useMemo } from 'react';
import { Target, getTargetElement } from '../getTargetElement';
/**
 * Calculates the maximum number of characters that can be fit into give maxwidth.
 * Calculates the width of text with given font family via ref object, in terms of px
 *
 * @param {Ref} target
 * @param {number} maxWidth
 * @param {string} middleChars i.e. '...' ellipsis
 * @return number of chars of ref's text, including number of chars of given/default
 * returned value is an odd number, first part has +1 characters
 */
interface Options {
  target: Target;
  middleChars?: string;
  maxWidth: number;
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
    if (!el) return { textWidth: undefined, charNumber: undefined };
    if (el.textContent && maxWidth) {
      const context = getContext();
      const computedStyles = window.getComputedStyle(el);
      context.font = computedStyles.font
        ? computedStyles.font
        : `${computedStyles.fontSize}" "${computedStyles.fontFamily}`;
      const textWidth = context?.measureText(el.textContent).width; // width of text
      let fitLength: number = el.textContent.length;
      let prefix = ''; // char from start
      let suffix = ''; // char from end
      let i = 0;
      let j = fitLength - 1;
      let current = middleChars || ''; // i.e. '...'
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
      return { textWidth, charNumber: fitLength };
    }
    return { textWidth: undefined, charNumber: undefined };
  }, [maxWidth, middleChars]);
};

export default useFitCharacterNumber;
