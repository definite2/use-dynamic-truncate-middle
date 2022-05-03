import React from 'react';
import { useTruncateFromMiddle } from 'use-truncate-from-middle';

export interface TextareaProps {
  originalLongText?: string;
  width: string;
  font: string;
}
const Textarea = ({ originalLongText, width, font }: TextareaProps) => {
  const btnRef = React.useRef<HTMLTextAreaElement | null>(null);
  const { truncatedText, contentWidth } = useTruncateFromMiddle(
    btnRef,
    originalLongText || '',
  );

  return (
    <div className="area-container">
      <textarea
        ref={btnRef}
        rows={1}
        style={{ width: width, font: font }}
        value={truncatedText}
        readOnly
      />

      <div className="text-details">
        <pre
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {' '}
          {`original: "${originalLongText}"`}
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
          {`font style is: ${font}`}
        </pre>
      </div>
    </div>
  );
};

export default Textarea;
