import React from 'react';
import { useTruncateFromMiddle } from 'use-truncate-from-middle';

export interface ButtonProps {
  originalLongText?: string;
  width: string;
  font: string;
}
const Button = ({ originalLongText, width, font }: ButtonProps) => {
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const { truncatedText, contentWidth } = useTruncateFromMiddle(
    btnRef,
    originalLongText || '',
  );

  return (
    <div className="button-container">
      <button ref={btnRef} style={{ width: width, font: font }}>
        {truncatedText}
      </button>
      <div className="button-details">
        <pre
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {' '}
          {`original text: "${originalLongText}"`}
        </pre>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {' '}
          {`content width = ${contentWidth}`}
        </pre>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {' '}
          {`button font style is: ${font}`}
        </pre>
      </div>
    </div>
  );
};

export default Button;
