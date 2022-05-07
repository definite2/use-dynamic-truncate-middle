import { useState } from 'react';
import { Target } from '../utils/getTargetElement';
import useElementWidth from './useElementWidth';
import useFitCharacterNumber from './useFitCharacterNumber';
import { truncateFromMiddle } from '../utils/truncateFromMiddle';
import useTextWidth from '../utils/useTextWidth';
import useIsomorphicLayoutEffect from '../utils/useIsomorphicLayoutEffect';
interface Options {
  ref: Target;
  originalText: string;
  middleChars?: string;
}
const useTruncateFromMiddle = ({ ref, originalText, middleChars }: Options) => {
  const [result, setResult] = useState(originalText || '');
  const elWidth = useElementWidth(ref);
  const textWidth = useTextWidth(ref);
  const { charNumber } = useFitCharacterNumber({
    target: ref,
    maxWidth: elWidth,
    middleChars,
  });
  useIsomorphicLayoutEffect(() => {
    if (elWidth && charNumber && textWidth) {
      if (textWidth > elWidth)
        setResult(truncateFromMiddle(originalText, charNumber));
      else setResult(originalText);
    }
  }, [elWidth, charNumber, textWidth, originalText]);
  return { truncatedText: result, contentWidth: elWidth, textWidth };
};

export default useTruncateFromMiddle;
