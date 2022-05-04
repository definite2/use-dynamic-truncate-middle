import Textarea from './components/Textarea';
import { buttons } from './mock';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Truncating Button Text From Middle</h2>
      {buttons.slice(0, 1).map((button, index) => (
        <Textarea
          key={`${button.text}_${index}`}
          width={button.width}
          originalLongText={button.text}
          font={button.font}
        />
      ))}
    </div>
  );
}

export default App;
