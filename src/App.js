import logo from './logo.svg';
import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
}
function reducer(state, {type, payload}) {
  switch(type){
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentNumber: `${currentNumber || ''}${payload.digit}`
      }
  }
}

function App() {
  const [{currentNumber, lastNumber, operation}, dispatch] = useReducer(reducer, {})

  //dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit: 1}})
  return (
    <div className='calculator-grid'>
      <div className='output-field'>
        <div className='last-number'>{lastNumber} {operation}</div>
        <div className='current-number'>{currentNumber}</div>
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
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className='two-wide'>=</button>
    </div>
  )
}

export default App;
