import Button from './components/Button';
import { buttons } from './mock';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Truncating Button Text From Middle</h2>
      <div className="detail">
        With different font styles and different button width values
      </div>
      {buttons.map((button, index) => (
        <Button
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
