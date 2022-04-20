import React from 'react';
import { useTruncateFromMiddle } from 'use-truncate-from-middle';

export interface ButtonProps {
  originalLongText?: string;
  width: string;
  font: string;
}
const Button = ({ originalLongText, width, font }: ButtonProps) => {
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const { result } = useTruncateFromMiddle(btnRef, originalLongText || '');

  return (
    <div className="button-container">
      <button ref={btnRef} style={{ width: width, font: font }}>
        {result}
      </button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
          {`width = ${width}`}
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
