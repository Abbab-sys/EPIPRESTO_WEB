import {useEffect} from 'react';

export const useTimeout = ({time, callback, callbackVars, dependencies}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            callback(callbackVars);
        }, time);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}
