import { useLayoutEffect, useState } from 'react';
import { Target } from './utils/getTargetElement';
import useElementWidth from './utils/useElementWidth';
import useFitCharacterNumber from './utils/useFitCharacterNumber';
import { truncateFromMiddle } from './utils/truncateFromMiddle';

const useTruncateFromMiddle = (target: Target, initialTextContent: string) => {
  const [result, setResult] = useState(initialTextContent || '');
  const elWidth = useElementWidth(target);
  const { textWidth, charNumber } = useFitCharacterNumber({
    target,
    maxWidth: elWidth,
    middleChars: '...',
  });
  useLayoutEffect(() => {
    if (elWidth && charNumber && textWidth) {
      if (textWidth > elWidth)
        setResult(truncateFromMiddle(initialTextContent, charNumber));
      else setResult(initialTextContent);
    }
  }, [elWidth, charNumber, textWidth, initialTextContent]);
  return { truncatedText: result, contentWidth: elWidth, textWidth };
};

export default useTruncateFromMiddle;
