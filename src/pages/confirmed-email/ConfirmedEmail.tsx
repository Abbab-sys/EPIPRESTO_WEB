import {VERIFY_EMAIL} from "../../graphql/mutations";
import {useMutation} from "@apollo/client";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const ConfirmedEmail = () => {
  const params=useParams()
  const [verifyEmail, {loading, error, data}] = useMutation(VERIFY_EMAIL);
  useEffect(() => {
    console.log(params.token)
    verifyEmail({variables: {token: params.token}}).then(r => {
      console.log(r)
    })
  }, [params.token])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    return <p>{data.verifyVendorAccount.message}</p>
  }
  return <p>Something went wrong</p>
}
export default ConfirmedEmail
