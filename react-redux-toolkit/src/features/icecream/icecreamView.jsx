import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {ordered, restocked} from './icecreamSlice'

export const IcecreamView = () => {
  const numOfIcecream = useSelector((state) => state.icecream.numOfIcecream);
  const dispatchIcecream = useDispatch();
  return (
    <div>
        <h2>Number of icecreams - {numOfIcecream}</h2>
        <button onClick={()=> dispatchIcecream(ordered())}>Order icecream</button>
        <button onClick={()=> dispatchIcecream(restocked(3))}>Restock icecream</button>
    </div>
  )
}
