import { MutableRefObject } from 'react';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type Target<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(
  target: Target<T>,
  defaultElement?: T,
) {
  if (typeof window === 'undefined') return undefined;
  if (!('ResizeObserver' in window)) {
    console.error(
      "Your browser doesn't support Resize Observer, please use polyfill",
    );
    return undefined;
  }
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
