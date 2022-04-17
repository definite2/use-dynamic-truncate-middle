import { useLayoutEffect, useState } from 'react';
import { Target, getTargetElement } from './utils/getTargetElement';
import useElementWidth from './utils/useElementWidth';
import useFitCharacterNumber from './utils/useFitCharacterNumber';
import { truncateFromMiddle } from './utils/truncateFromMiddle';

const useTruncateFromMiddle = (target: Target) => {
  const el = getTargetElement(target);
  const [buttonText, setButtonText] = useState(el?.textContent);
  const buttonWidth = useElementWidth(target);
  const { textWidth, charNumber } = useFitCharacterNumber({
    target,
    maxWidth: buttonWidth,
    middleChars: '...',
  });
  useLayoutEffect(() => {
    if (buttonWidth && charNumber && textWidth) {
      if (textWidth > buttonWidth)
        setButtonText(truncateFromMiddle(el.textContent, charNumber));
    }
  }, [buttonWidth, charNumber, textWidth]);
  return buttonText;
};

export default useTruncateFromMiddle;
