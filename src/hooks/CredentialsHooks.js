import {useEffect} from 'react';

/*
 * Name: Timeout hook
 * Description: This file contains the timeout hook
 * Author: Adam Naoui
 */

export const useTimeout = ({time, callback, callbackVars, dependencies}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(callbackVars);
    }, time);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
