import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='calculator-grid'>
      <div className='output-field'>
        <div className='last-number'>TEST</div>
        <div className='current-number'>TEST2</div>
      </div>
      <button className='two-wide'>AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>9</button>
      <button>8</button>
      <button>7</button>
      <button>*</button>
      <button>6</button>
      <button>5</button>
      <button>4</button>
      <button>+</button>
      <button>3</button>
      <button>2</button>
      <button>1</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className='two-wide'>=</button>
    </div>
  )
}

export default App;
