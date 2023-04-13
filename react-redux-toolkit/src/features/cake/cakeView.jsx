import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {ordered, restocked} from './cakeSlice';

export const CakeView = () => {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  const dispatchCakes = useDispatch();
  return (
    <div>
        <h2>Number of cakes - {numOfCakes} </h2>
        <button onClick={() => dispatchCakes(ordered())}>Order cake</button>
        <button onClick={() => dispatchCakes(restocked(5))}>Restock cakes</button>
    </div>
  )
}
