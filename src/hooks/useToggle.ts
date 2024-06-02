import { useCallback, useState } from 'react';
// atan
export const useToggle = (initialState = false) : [value:boolean, toggle:()=>void] => {
   const [value, setState] = useState(initialState);
// n
   const toggle = useCallback(() => {
      setState((state) => !state);
   }, []);
// jo
   return [value, toggle];
};
