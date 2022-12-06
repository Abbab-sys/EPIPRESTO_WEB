import {createContext} from 'react';

/*
 * Name: Vendor Context
 * Description: Creation of the vendor's context
 * Author: Adam Naoui and Zouhair Derouich
 */

export const VendorContext = createContext({
  storeId: "",
  setStoreId: (storeId: string) => {
  }
})

