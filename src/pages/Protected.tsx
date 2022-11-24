import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {VendorContext} from "../context/Vendor";

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
