import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton'

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
      if (payload.digit === '0' && state.currentNumber === '0') return state
      if (payload.digit === '.' && state.currentNumber.includes('.')) return state
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
      <OperationButton operation="÷" dispatch={dispatch}></OperationButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button className='two-wide'>=</button>
    </div>
  )
}

export default App;
