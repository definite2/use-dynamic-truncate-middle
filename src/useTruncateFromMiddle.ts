import { useLayoutEffect, useState } from 'react';
import { Target } from './utils/getTargetElement';
import useElementWidth from './utils/useElementWidth';
import useFitCharacterNumber from './utils/useFitCharacterNumber';
import { truncateFromMiddle } from './utils/truncateFromMiddle';
import useTextWidth from './utils/useTextWidth';

const useTruncateFromMiddle = (target: Target, initialTextContent: string) => {
  const [result, setResult] = useState(initialTextContent || '');
  const elWidth = useElementWidth(target);
  const textWidth = useTextWidth(target);
  const { charNumber } = useFitCharacterNumber({
    target,
    maxWidth: elWidth,
    middleChars: '...',
  });
  useLayoutEffect(() => {
    console.log({ textWidth });
    if (elWidth && charNumber && textWidth) {
      console.log({ textWidth });
      if (textWidth > elWidth)
        setResult(truncateFromMiddle(initialTextContent, charNumber));
      else setResult(initialTextContent);
    }
  }, [elWidth, charNumber, textWidth, initialTextContent]);
  return { truncatedText: result, contentWidth: elWidth, textWidth };
};

export default useTruncateFromMiddle;
