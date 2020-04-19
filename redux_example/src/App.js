import React from 'react';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from './actions';

function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.islogged);
  const dispatch = useDispatch(); 

  return (
    <div className="App">
	   <h1> Counter {counter} </h1>
	  <button onClick={()=>dispatch(increment(5))}>+</button>
	  <button onClick={()=>dispatch(decrement())}>-</button>
	  {isLogged ? <h3>This is personal info </h3> : <h3>info for all</h3>}
    </div>
  );
}

export default App;
