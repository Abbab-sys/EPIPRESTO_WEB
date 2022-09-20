import { createContext, useState } from 'react';

export const VendorContext = createContext({
  storeId: "",
  setStoreId: (storeId: string) => {}
})

// export const VendorContextProvider = (props: any) => {

//   const setStoreId = (storeId: string) => {
//     setState({...state, storeId: storeId})
//   }
  
//   const initState = {
//     storeId: "",
//     setStoreId: setStoreId
//   } 

//   const [state, setState] = useState(initState)

//   return (
//     <VendorContext.Provider value={state}>
//       {props.children}
//     </VendorContext.Provider>
//   )
// }