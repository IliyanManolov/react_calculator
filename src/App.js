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
      if (payload.digit === '0' && state.currentNumber === '0') 
        return state

      if (payload.digit === '.' && state.currentNumber == null)
        return {
          ...state,
          currentNumber: `0.`
        }
      
      if (payload.digit === '.' && state.currentNumber.includes('.'))
        return state
        
      return {
        ...state,
        currentNumber: `${state.currentNumber || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentNumber == null && state.lastNumber == null){
        return state
      }

      if (state.currentNumber == null){
        return{
          ...state,
          operation: payload.operation
        }
      }

      if (state.lastNumber == null) {
        return {
          ...state,
          operation: payload.operation,
          lastNumber: state.currentNumber,
          currentNumber: null
        }
      }

      return{
        ...state,
        lastNumber: evaluate(state),
        operation: payload.operation,
        currentNumber: null
      }
    
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentNumber == null || state.lastNumber == null)
        return state
      return {
        ...state,
        lastNumber: null,
        operation: null,
        currentNumber: evaluate(state)
      }
    
    case ACTIONS.DELETE_DIGIT:
      if (state.currentNumber == null)
        return state
      if (state.currentNumber.length === 1)
        return{
          ...state,
          currentNumber: null
        }
      
        return{
          ...state,
          currentNumber: state.currentNumber.slice(0, state.currentNumber.length - 1)
        }

    case ACTIONS.CLEAR:
      return {}
  }
}

function evaluate({ currentNumber, lastNumber, operation}){
  const last = parseFloat(lastNumber)
  const current = parseFloat(currentNumber)
  if (isNaN(last) || isNaN(current))
    return ""
  
  let result = ""

  switch (operation){
    case "+":
      result = last + current
      break
    case "-":
      result = last - current
      break
    case "*":
      result = last * current
      break
    case "÷":
      result = last / current
      break
  }

  return result.toString()
}

const FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})

function formatNumber(number){
  if (number == null)
    return
  
  const [integer, decimal] = number.split(".")

  if (decimal == null)
    return FORMATTER.format(integer)
  return `${FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentNumber, lastNumber, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className='calculator-grid'>
      <div className='output-field'>
        <div className='last-number'>{formatNumber(lastNumber)} {operation}</div>
        <div className='current-number'>{formatNumber(currentNumber)}</div>
      </div>
      <button className='two-wide' onClick ={() => dispatch({ type:ACTIONS.CLEAR})}>AC</button>
      <button onClick ={() => dispatch({ type:ACTIONS.DELETE_DIGIT})}>DEL</button>
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
      <button className='two-wide' onClick = {() => dispatch({ type:ACTIONS.EVALUATE})}>=</button>
    </div>
  )
}

export default App;
