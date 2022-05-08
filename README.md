# Truncate From Middle Hook

This react hook dynamically truncates text from the middle

## Demo

🚀 See [Demo:](https://6277739a70c89c1ec4e0ce1c--phenomenal-brigadeiros-2b0d14.netlify.app)

## Installation

```bash
yarn add use-truncate-from-middle
```

or

```bash
npm install use-truncate-from-middle
```

## Usage

```javascript
import { useTruncateFromMiddle } from 'use-truncate-from-middle';
```

```javascript
const Button = ({
  originalLongText = 'very long longer text button',
  width = '128px', // width (total)= content width + border width + padding
  font = '18px/18px Arial, sans-serif',
}) => {
  const btnRef = React.useRef(null);

  const { truncatedText } = useTruncateFromMiddle({
    ref: btnRef,
    originalText: originalLongText || '',
    middleChars: '...',
  });

  return (
    <>
      <button ref={btnRef} style={{ width: width, font: font }}>
        {truncatedText}
      </button>
    </>
  );
};
```

<figure>
<img src="./assets/capt.png" alt="truncate middle ss"/>
<figcaption>Example : Button Text Truncated From Middle</figcaption>
</figure>

### Props

| Prop           | Type     | Description                                                                                                       | Default |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| `originalText` | `String` | Initial text value of the component. It is going to be truncated from middle if necessary.                        | `''`    |
| `middleChars`  | `String` | The ellipsis to use when the text is truncated from middle.                                                       | `'...'` |
| `ref`          | `Object` | The `ref` of the text container component.It is required to calculate component's width and to get its font style | `null`  |
