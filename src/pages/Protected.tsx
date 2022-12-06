import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {VendorContext} from "../context/Vendor";

/*
 * Name: Protected Page
 * Description: This file contains the wrapper for the protected pages that should not be accessed if the user is note logged in
 * Author: Adam Naoui and Zouhair Derouich
 */

interface ProtectedProps {
  children: any
}

const Protected = (props: ProtectedProps) => {
  const {storeId} = useContext(VendorContext);
  if (storeId === "") {
    return <Navigate to="/login"/>
  }
  return props.children
}
export default Protected;
