import {useEffect, useState} from 'react';

export function useCheckingUnicity({loading,data,error},{setUsedAction,setUnusedAction},dispatch){
//useEffect is a hook that allows to execute a function when a variable changes
//in this case, when the data variable changes, the function will be executed
//the function will be executed only once, when the component is mounted

//if the data is not null, it means that the request has been executed
  
  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
  }